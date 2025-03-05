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
  const [annual, setAnnual] = useState(true);
  const billingInterval = annual ? "year" : "month";
  const router = useRouter();
  const currentPath = usePathname();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

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
          {products.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="w-fit mx-auto text-center flex flex-col rounded-xl border bg-background p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold">No Products Found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  It looks like you haven’t created any products yet. Click the
                  button below to create one on Stripe.
                </p>
              </div>
              <Button
                variant="outline"
                type="button"
                className="w-fit mx-auto"
                onClick={() =>
                  window.open(
                    "https://dashboard.stripe.com/products/new",
                    "_blank"
                  )
                }
              >
                Create products on Stripe
              </Button>
            </motion.div>
          ) : (
            products.map((product, index) => {
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
                    "relative w-full flex flex-col rounded-xl border bg-background p-6 shadow-sm transition-all hover:shadow-md",
                    {
                      "border-primary md:scale-105":
                        product.name === subscription?.prices?.products?.name,
                      "border-2 border-primary": index === 1, // extra styling for the second product
                    }
                  )}
                >
                  {/* Most Popular Badge */}
                  {index === 1 && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Most popular
                      </span>
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {product.description}
                    </p>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">
                        {annual
                          ? new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: price.currency!,
                              minimumFractionDigits: 0,
                            }).format((price?.unit_amount || 0) / 12 / 100)
                          : priceString}
                      </span>
                      <span className="text-muted-foreground ml-1">/month</span>
                    </div>
                    {annual ? (
                      <p className="h-4 text-xs text-muted-foreground mt-1">
                        Billed annually (
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: price.currency!,
                          minimumFractionDigits: 0,
                        }).format((price?.unit_amount || 0) / 100)}
                        /year)
                      </p>
                    ) : (
                      <p className="h-4 mt-1"></p>
                    )}
                  </div>
                  <ul className="mb-6 space-y-2 flex-1">
                    {product?.marketing_features &&
                      product.marketing_features.map((feature, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + j * 0.05 }}
                          className="flex items-center gap-2"
                        >
                          <Check className="size-4 text-purple-500 flex-shrink-0" />
                          <span className="text-sm">{feature.name}</span>
                        </motion.li>
                      ))}
                  </ul>

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
            })
          )}
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
