"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
            className="size-8 rounded-full bg-purple-500 purple-glow"
          />
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold purple-gradient-text"
          >
            Quantum
          </motion.span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-6"
          >
            {["Features", "Testimonials", "Pricing", "Blog"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-purple-500"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2"
          >
            <Button
              variant="ghost"
              size="sm"
              className="hover:text-purple-500 hover:bg-purple-100"
            >
              Log in
            </Button>
            <Button
              size="sm"
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              Get Started
            </Button>
          </motion.div>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="md:hidden text-purple-500"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="size-6" />
          ) : (
            <Menu className="size-6" />
          )}
        </motion.button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-md border-b"
        >
          <div className="container py-4 px-4">
            <nav className="flex flex-col gap-4">
              {["Features", "Testimonials", "Pricing", "Blog"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium py-2 text-muted-foreground transition-colors hover:text-purple-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  className="w-full justify-start border-purple-200 hover:border-purple-500 hover:text-purple-500"
                >
                  Log in
                </Button>
                <Button className="w-full justify-start bg-purple-500 hover:bg-purple-600 text-white">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
