"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  BarChart3,
  Clock,
  Fingerprint,
  Layers,
  Lightbulb,
  Repeat,
  Shield,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: <Zap className="size-10 text-purple-500" />,
    title: "Lightning Fast",
    description: "Experience unparalleled speed with our optimized platform.",
  },
  {
    icon: <Shield className="size-10 text-purple-500" />,
    title: "Enterprise Security",
    description: "Bank-level security ensures your data is always protected.",
  },
  {
    icon: <Repeat className="size-10 text-purple-500" />,
    title: "Seamless Integration",
    description: "Connect with your favorite tools without any friction.",
  },
  {
    icon: <BarChart3 className="size-10 text-purple-500" />,
    title: "Advanced Analytics",
    description: "Gain valuable insights with comprehensive reporting.",
  },
  {
    icon: <Fingerprint className="size-10 text-purple-500" />,
    title: "Personalized Experience",
    description: "Tailored solutions that adapt to your unique workflow.",
  },
  {
    icon: <Clock className="size-10 text-purple-500" />,
    title: "Time-Saving Automation",
    description: "Automate repetitive tasks and focus on what matters.",
  },
];

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="features"
      className="py-16 md:py-24 bg-purple-50/50 dark:bg-purple-900 rounder-md"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          >
            Powerful <span className="text-purple-500">Features</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-muted-foreground md:text-xl max-w-[700px] mx-auto"
          >
            Everything you need to streamline your workflow and boost
            productivity
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl border bg-background p-6 shadow-sm transition-all hover:shadow-md hover:border-purple-200"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">
                {feature.description}
              </p>

              {/* Decorative gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-300/0 via-purple-500 to-purple-300/0 opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 md:mt-24">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative mx-auto max-w-[500px] aspect-square">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-300/5 backdrop-blur-sm border border-purple-200 shadow-xl" />
                <Image
                  src="https://picsum.photos/2000/3000"
                  alt="Feature Highlight"
                  fill
                  className="relative rounded-2xl shadow-2xl"
                />

                {/* Decorative elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute -top-6 -right-6 size-12 rounded-full bg-purple-500 flex items-center justify-center shadow-lg purple-glow"
                >
                  <Lightbulb className="size-6 text-white" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute -bottom-6 -left-6 size-12 rounded-full bg-purple-500 flex items-center justify-center shadow-lg purple-glow"
                >
                  <Layers className="size-6 text-white" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-4"
            >
              <div className="inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-purple-100 text-purple-700 border-purple-200">
                <span>Featured</span>
              </div>

              <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Intelligent{" "}
                <span className="text-purple-500">Workflow Automation</span>
              </h3>

              <p className="text-muted-foreground">
                Our AI-powered automation engine learns from your team's
                behavior to suggest and implement optimizations that save hours
                of manual work every week.
              </p>

              <ul className="mt-4 space-y-3">
                {[
                  "Smart task prioritization based on deadlines and importance",
                  "Automated document processing and data extraction",
                  "Custom workflow templates for repeatable processes",
                  "Intelligent resource allocation for team projects",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-2"
                  >
                    <div className="size-5 rounded-full bg-purple-100 flex items-center justify-center">
                      <div className="size-2 rounded-full bg-purple-500" />
                    </div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
