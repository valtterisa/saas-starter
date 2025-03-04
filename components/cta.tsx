"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Cta() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-purple-500"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-800 opacity-90" />

          {/* Decorative circles */}
          <div className="absolute top-0 left-0 size-[300px] rounded-full bg-white/10 blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 size-[300px] rounded-full bg-white/10 blur-3xl translate-x-1/2 translate-y-1/2" />

          <div className="relative grid gap-6 md:grid-cols-2 items-center p-8 md:p-12">
            <div className="text-white">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              >
                Ready to transform your workflow?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 text-white/90 md:text-xl max-w-[600px]"
              >
                Join thousands of teams that use Quantum to streamline their
                operations and boost productivity.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-6 flex flex-col sm:flex-row gap-3"
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="group bg-white text-purple-700 hover:bg-purple-50"
                >
                  Start your free trial
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white/20 text-white hover:bg-white/10"
                >
                  Schedule a demo
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Get started today
              </h3>
              <form className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Company Name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full bg-white text-purple-700 hover:bg-purple-50"
                >
                  Request Access
                </Button>
                <p className="text-xs text-white/70 text-center">
                  No credit card required. Start your 14-day free trial.
                </p>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
