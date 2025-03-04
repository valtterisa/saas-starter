import Pricing from "@/components/pricing";
import { createClient } from "@/utils/supabase/server";
import {
  getProducts,
  getSubscription,
  getUser,
} from "@/utils/supabase/queries";

async function PricingPage() {
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
    <div>
      <Pricing
        user={user}
        products={productsResult}
        subscription={subscription}
      />
    </div>
  );
}

export default PricingPage;
