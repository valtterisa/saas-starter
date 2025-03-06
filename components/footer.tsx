"use client";

import { motion } from "framer-motion";
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import NavigationLink from "./ui/link";

export function Footer() {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Testimonials", href: "#" },
        { name: "Integrations", href: "#" },
        { name: "Updates", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Partners", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Guides", href: "#" },
        { name: "Help Center", href: "#" },
        { name: "Community", href: "#" },
        { name: "Webinars", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" },
        { name: "Security", href: "#" },
        { name: "Accessibility", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Twitter className="size-4" />, href: "#" },
    { icon: <Facebook className="size-4" />, href: "#" },
    { icon: <Instagram className="size-4" />, href: "#" },
    { icon: <Github className="size-4" />, href: "#" },
    { icon: <Linkedin className="size-4" />, href: "#" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-full lg:col-span-1"
          >
            <NavigationLink href="/" className="flex items-center gap-2 mb-4">
              <div className="size-8 rounded-full bg-primary" />
              <span className="text-xl font-bold">Quantum</span>
            </NavigationLink>
            <p className="text-muted-foreground max-w-xs">
              Streamline your workflow and boost productivity with our
              all-in-one platform.
            </p>

            <div className="flex gap-3 mt-6">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="size-8 flex items-center justify-center rounded-full bg-background border shadow-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="col-span-full grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-4"
          >
            {footerLinks.map((group, i) => (
              <motion.div key={i} variants={itemVariants}>
                <h3 className="font-semibold mb-3">{group.title}</h3>
                <ul className="space-y-2">
                  {group.links.map((link, j) => (
                    <motion.li
                      key={j}
                      whileHover={{ x: 3 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <NavigationLink
                        // href={link.href}
                        href="/"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </NavigationLink>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 mt-8 border-t"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Quantum. All rights reserved.
          </p>
          <div className="flex gap-4">
            <NavigationLink
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </NavigationLink>
            <NavigationLink
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </NavigationLink>
            <NavigationLink
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookies
            </NavigationLink>
          </div>
          <ThemeSwitcher />
        </motion.div>
      </div>
    </footer>
  );
}
