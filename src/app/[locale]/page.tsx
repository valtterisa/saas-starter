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
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Header from "@/components/header";

type Params = Promise<{ locale: string }>;

export default async function Home({ params }: { params: Params }) {
  const { locale } = await params;

  // Static rendering of the page for SEO
  setRequestLocale(locale);

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
      <Header />
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
      <Footer />
    </div>
  );
}
