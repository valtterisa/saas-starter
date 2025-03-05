"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-purple-500/20 blur-[100px] opacity-50" />
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-purple-100 text-purple-700 border-purple-200 mx-auto lg:mx-0 w-fit"
            >
              <span>New Features Available</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
            >
              Transform your workflow with{" "}
              <span className="text-purple-500">Quantum</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-muted-foreground text-lg md:text-xl max-w-[600px] mx-auto lg:mx-0"
            >
              The all-in-one platform that streamlines your operations, boosts
              productivity, and drives growth for your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 pt-4 mx-auto lg:mx-0 w-full sm:w-auto justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="group bg-purple-500 hover:bg-purple-600 text-white purple-glow w-full sm:w-auto"
              >
                Start for free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-200 hover:bg-purple-50 hover:text-purple-800 hover:border-purple-300 w-full sm:w-auto"
              >
                Book a demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start"
            >
              {[
                "No credit card required",
                "14-day free trial",
                "Cancel anytime",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-2 justify-center lg:justify-start"
                >
                  <CheckCircle2 className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y, opacity }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative order-first lg:order-last"
          >
            <div className="relative mx-auto w-full max-w-[500px] aspect-[4/3]">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-300/10 backdrop-blur-sm border border-purple-200 shadow-xl" />
              <Image
                src="https://picsum.photos/2000/3000"
                alt="Dashboard Preview"
                fill
                className="relative rounded-xl shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500"
              />

              {/* Floating elements - hidden on very small screens */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 rounded-lg bg-background p-3 shadow-lg border border-purple-200 hidden sm:flex"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <CheckCircle2 className="size-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Task completed</p>
                    <p className="text-xs text-muted-foreground">Just now</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -top-6 -right-6 rounded-lg bg-background p-3 shadow-lg border border-purple-200 hidden sm:flex"
              >
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="size-3 rounded-full bg-green-500" />
                  </div>
                  <p className="text-sm font-medium">+28% growth</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Brands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 md:mt-24"
        >
          <p className="text-center text-sm text-muted-foreground mb-6">
            TRUSTED BY INNOVATIVE COMPANIES
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 grayscale opacity-70">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-6 md:h-8 w-auto">
                <Image
                  src="https://picsum.photos/120/40"
                  alt={`Company logo ${i}`}
                  width={120}
                  height={40}
                  className="h-full w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
