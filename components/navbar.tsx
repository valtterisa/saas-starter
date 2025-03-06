"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  BarChart,
  Users,
  Layers,
  Settings,
  HelpCircle,
  FileText,
  BookOpen,
  Headphones,
  Building,
  Award,
  Briefcase,
  Heart,
  Newspaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./locale-switcher";
import { L } from "framer-motion/dist/types.d-6pKw1mTI";

export function Navbar() {
  const t = useTranslations("Navigation");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(
    null
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Main navigation items with submenus
  // const navItems = [];

  const toggleMobileSubmenu = (key: string) => {
    if (openMobileSubmenu === key) {
      setOpenMobileSubmenu(null);
    } else {
      setOpenMobileSubmenu(key);
    }
  };

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
        <Link href="/" className="flex items-center gap-2 z-10">
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {/* <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-6 items-center"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="relative"
              >
                {item.submenu ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-purple-500">
                        {item.label}
                        <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      <DropdownMenuGroup>
                        {item.submenu.map((subItem, j) => (
                          <DropdownMenuItem key={j} asChild>
                            <Link
                              href={subItem.href}
                              className="flex items-center cursor-pointer"
                            >
                              {subItem.icon}
                              <span>{subItem.label}</span>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={item.href || `#${item.key}`}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-purple-500"
                  >
                    {item.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.nav> */}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2"
          >
            {/* Comment this out for not having translations */}
            {/* <LocaleSwitcher /> */}
            <Button
              variant="ghost"
              size="sm"
              className="hover:text-purple-500 hover:bg-purple-100 dark:hover:bg-purple-900/20"
            >
              {t("login")}
            </Button>
            <Button
              size="sm"
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              {t("signup")}
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Comment this out for not having translations */}
          {/* <LocaleSwitcher /> */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-purple-500 z-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-md border-b fixed top-16 left-0 right-0 z-40 overflow-auto max-h-[calc(100vh-4rem)]"
        >
          <div className="container py-6 px-4">
            {/* <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.key} className="border-b border-muted">
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => toggleMobileSubmenu(item.key)}
                        className="flex items-center justify-between w-full py-3 text-base font-medium text-foreground hover:text-purple-500"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            openMobileSubmenu === item.key ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {openMobileSubmenu === item.key && (
                        <div className="pl-4 pb-3 space-y-2">
                          {item.submenu.map((subItem, j) => (
                            <Link
                              key={j}
                              href={subItem.href}
                              className="flex items-center py-2 text-sm text-muted-foreground hover:text-purple-500"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.icon}
                              <span>{subItem.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href || `#${item.key}`}
                      className="block py-3 text-base font-medium text-foreground hover:text-purple-500"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="flex flex-col gap-3 pt-4 mt-2">
                <Button
                  variant="outline"
                  className="w-full justify-center border-purple-200 hover:border-purple-500 hover:text-purple-500 py-6 dark:border-purple-800 dark:hover:border-purple-600"
                >
                  {t("common.login")}
                </Button>
                <Button className="w-full justify-center bg-purple-500 hover:bg-purple-600 text-white py-6">
                  {t("common.getStarted")}
                </Button>
              </div>
            </nav> */}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
