"use client";

import { Check, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale, locales } from "@/contexts/locale-context";
import { useEffect, useState } from "react";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();
  const [mounted, setMounted] = useState(false);

  // Only show the correct selected language after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale);
    // Force a re-render of components that depend on translations
    window.dispatchEvent(new Event("localeChanged"));
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
        <Globe className="h-4 w-4" />
        <span className="sr-only">Language</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <Globe className="h-4 w-4" />
          <span className="sr-only">{t("common.language")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc.value}
            onClick={() => handleLanguageChange(loc.value)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span>{loc.label}</span>
            {locale === loc.value && <Check className="ml-2 h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
