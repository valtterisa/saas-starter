// /app/api/stripe-webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

// Disable Next.js body parsing so we can read the raw body for webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature") as string;

  // Instead of using micro's buffer, use arrayBuffer() and Buffer.from
  const rawBody = Buffer.from(await request.arrayBuffer());

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Create a Supabase admin client
  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string
  );

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const supabaseUserId = session.metadata?.supabase_user_id;

    if (supabaseUserId && session.subscription) {
      // Upsert the subscription record in Supabase
      const { error } = await supabaseAdmin.from("user_subscriptions").upsert({
        user_id: supabaseUserId,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: session.subscription as string,
        subscription_status: "active", // Update based on your event details
      });

      if (error) {
        console.error("Error updating subscription in Supabase:", error);
        return new NextResponse("Database error", { status: 500 });
      }
    }
  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
