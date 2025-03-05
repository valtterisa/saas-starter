import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import Pricing from "@/components/pricing";
import { Cta } from "@/components/cta";
import { Footer } from "@/components/footer";
import { createClient } from "@/utils/supabase/server";
import {
  getProducts,
  getSubscription,
  getUser,
} from "@/utils/supabase/queries";

export default async function Home() {
  const supabase = await createClient();
  const [user, productsResult, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase),
  ]);

  if ("message" in productsResult) {
    console.error(productsResult.message);
    return <div>Error loading products</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-background to-background/80">
      <main className="w-full">
        <Hero />
        <Features />
        <Testimonials />
        <Pricing
          user={user}
          products={productsResult}
          subscription={subscription}
        />
        <Cta />
      </main>
    </div>
  );
}
