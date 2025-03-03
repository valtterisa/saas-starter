import Pricing from "@/components/pricing";
import { createClient } from "@/utils/supabase/server";
import {
  getProducts,
  getSubscription,
  getUser,
} from "@/utils/supabase/queries";

async function PricingPage() {
  const supabase = await createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase),
  ]);

  const response = await getProducts(supabase);

  console.log(response);

  return (
    <div>
      {/* <Pricing user={user} products={products} subscription={subscription} /> */}
    </div>
  );
}

export default PricingPage;
