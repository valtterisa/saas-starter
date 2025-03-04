"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { Tables } from "@/types_db";
import { getStripe } from "@/utils/stripe/client";
import { checkoutWithStripe } from "@/utils/stripe/server";
import { getErrorRedirect } from "@/utils/helpers";
import { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";

type Subscription = Tables<"subscriptions">;
type Product = Tables<"products">;
type Price = Tables<"prices">;

interface ProductWithPrices extends Product {
  prices: Price[];
}

interface PriceWithProduct extends Price {
  products: Product | null;
}

interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

export default function Pricing({ user, products, subscription }: Props) {
  console.log(products);
  // "annual" state: true means billing yearly, false means monthly.
  const [annual, setAnnual] = useState(true);
  // Derive the billing interval based on the toggle.
  const billingInterval = annual ? "year" : "month";

  const router = useRouter();
  const currentPath = usePathname();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  // Framer Motion animation variants.
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleStripeCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return router.push("/signin");
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPath
    );

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      return router.push(
        getErrorRedirect(
          currentPath,
          "An unknown error occurred.",
          "Please try again later or contact a system administrator."
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
  };

  return (
    <section id="pricing" className="py-16 w-full">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 md:text-xl max-w-[700px] mx-auto text-muted-foreground">
            Start building for free, then add a site plan to go live. Account
            plans unlock additional features.
          </p>
          <div className="flex items-center justify-center mt-8">
            <Label
              htmlFor="billing-toggle"
              className={`mr-2 ${!annual ? "text-muted-foreground" : "text-white"}`}
            >
              Bill Yearly{" "}
              <span className="text-sm text-primary">(Save 20%)</span>
            </Label>
            <Switch
              id="billing-toggle"
              checked={!annual}
              onCheckedChange={() => setAnnual(!annual)}
            />
            <Label
              htmlFor="billing-toggle"
              className={`ml-2 ${annual ? "text-muted-foreground" : "text-white"}`}
            >
              Bill Monthly
            </Label>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-1 gap-6 flex-col md:flex-row"
        >
          {products.map((product) => {
            const price = product?.prices?.find(
              (price) => price.interval === billingInterval
            );
            if (!price) return null;
            const priceString = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: price.currency!,
              minimumFractionDigits: 0,
            }).format((price?.unit_amount || 0) / 100);
            return (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className={cn(
                  "w-full flex flex-col rounded-xl border bg-background p-6 shadow-sm transition-all hover:shadow-md",
                  {
                    "border-primary md:scale-105": subscription
                      ? product.name === subscription?.prices?.products?.name
                      : product.name === "Freelancer",
                  }
                )}
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {product.description}
                  </p>
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{priceString}</span>
                    <span className="text-muted-foreground ml-1">
                      /{billingInterval}
                    </span>
                  </div>
                  {!annual ? (
                    <p className="h-4 text-xs text-muted-foreground mt-1">
                      Billed annually (
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: price.currency!,
                        minimumFractionDigits: 0,
                      }).format(((price?.unit_amount || 0) * 12) / 100)}
                      /year)
                    </p>
                  ) : (
                    <p className="h-4 mt-1"></p>
                  )}
                </div>
                <Button
                  variant={subscription ? "default" : "outline"}
                  type="button"
                  onClick={() => handleStripeCheckout(price)}
                  className="w-full"
                  disabled={priceIdLoading === price.id}
                >
                  {subscription ? "Manage" : "Get Started"}
                </Button>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            Need a custom plan?{" "}
            <a href="#" className="text-primary font-medium hover:underline">
              Contact us
            </a>{" "}
            for enterprise pricing.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
