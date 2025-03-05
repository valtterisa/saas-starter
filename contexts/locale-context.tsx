"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

// Import translation files as default imports
import enTranslations from "@/utils/translations/en.json";
import esTranslations from "@/utils/translations/es.json";
import frTranslations from "@/utils/translations/fr.json";
import deTranslations from "@/utils/translations/de.json";

// Define available locales and their labels
export const locales = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
];

// Map of translations by locale
const translations = {
  en: enTranslations,
  es: esTranslations,
  fr: frTranslations,
  de: deTranslations,
};

type LocaleContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextType>({
  locale: "en",
  setLocale: () => {},
  t: () => "",
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState("en");
  const [mounted, setMounted] = useState(false);

  // Only run on client side
  useEffect(() => {
    setMounted(true);
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale && Object.keys(translations).includes(savedLocale)) {
      setLocale(savedLocale);
    } else {
      // Try to detect browser language if no saved preference
      const browserLang = navigator.language.split("-")[0];
      const supportedLang =
        locales.find((l) => l.value === browserLang)?.value || "en";
      setLocale(supportedLang);
      localStorage.setItem("locale", supportedLang);
    }
  }, []);

  // Update HTML lang attribute when locale changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = locale;
      localStorage.setItem("locale", locale);
    }
  }, [locale, mounted]);

  // Translation function that handles nested keys and fallbacks to English if not found
  const t = (key: string): string => {
    // Split the key by dots to navigate nested objects
    const keys = key.split(".");
    let result: any = translations[locale as keyof typeof translations];

    // Navigate through the nested objects
    for (const k of keys) {
      if (result && typeof result === "object" && k in result) {
        result = result[k];
      } else {
        // Fallback to English if key not found
        let fallback = translations.en;
        for (const k of keys) {
          if (fallback && typeof fallback === "object" && k in fallback) {
            fallback = (fallback as Record<string, any>)[k];
          } else {
            return key; // Return the key itself if not found in fallback
          }
        }
        return typeof fallback === "string" ? fallback : key;
      }
    }

    return typeof result === "string" ? result : key;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
