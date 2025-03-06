import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "fi"],

  // Used when no locale matches
  defaultLocale: "en",

  // Add all the paths that should be localized here
  pathnames: {
    "/": "/",
    "/login": {
      en: "/login",
      fi: "/kirjaudu",
    },
    "/signup": {
      en: "/signup",
      fi: "/luo-tunnus",
    },
    "/forgot-password": {
      en: "/forgot-password",
      fi: "/unohdin-salasanani",
    },
    "/dashboard": {
      en: "/dashboard",
      fi: "/ohjauspaneeli",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
