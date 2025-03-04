"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote:
      "Quantum has completely transformed how our team collaborates. The automation features alone have saved us countless hours every week.",
    author: "Sarah Johnson",
    title: "Product Manager at TechCorp",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "I've tried many productivity tools, but nothing comes close to Quantum. The intuitive interface and powerful features make it a game-changer.",
    author: "Michael Chen",
    title: "CTO at StartupX",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "The ROI we've seen since implementing Quantum has been incredible. Our team's productivity has increased by 37% in just three months.",
    author: "Emily Rodriguez",
    title: "Operations Director at GrowthCo",
    avatar: "/placeholder.svg?height=100&width=100",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const constraintsRef = useRef(null);

  const next = () => {
    setDirection(1);
    setCurrent((current + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="pt-16 overflow-hidden">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Loved by Teams Everywhere
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl max-w-[700px] mx-auto">
            See what our customers have to say about their experience with
            Quantum
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl" ref={constraintsRef}>
          <div className="relative h-[300px] sm:h-[250px] overflow-hidden">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0"
              >
                <div className="flex flex-col items-center text-center p-6">
                  <div className="mb-6">
                    <Quote className="size-12 text-primary/30" />
                  </div>
                  <p className="text-xl md:text-2xl font-medium italic mb-8">
                    "{testimonials[current].quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full overflow-hidden border-2 border-primary/20">
                      <Image
                        src={testimonials[current].avatar || "/placeholder.svg"}
                        alt={testimonials[current].author}
                        width={100}
                        height={100}
                        className="object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">
                        {testimonials[current].author}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonials[current].title}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full"
            >
              <ChevronLeft className="size-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`size-2 rounded-full transition-colors ${
                    i === current ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full"
            >
              <ChevronRight className="size-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 md:mt-24 bg-muted/50 rounded-2xl p-8 md:p-12"
        >
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h3 className="text-2xl font-bold tracking-tighter">
                Join thousands of satisfied customers
              </h3>
              <p className="mt-2 text-muted-foreground">
                See why leading companies across industries trust Quantum to
                power their workflows and drive results.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-4">
                {[85, 92, 99].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-primary">
                      {stat}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {i === 0
                        ? "Customer Retention"
                        : i === 1
                          ? "Satisfaction Rate"
                          : "Would Recommend"}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-background rounded-xl p-4 shadow-sm border"
                >
                  <Image
                    src={`/placeholder-logo.svg`}
                    alt={`Company logo ${i}`}
                    width={120}
                    height={40}
                    className="h-8 w-auto object-contain mx-auto"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
