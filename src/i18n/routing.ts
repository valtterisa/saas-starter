import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "fi"],

  // Used when no locale matches
  defaultLocale: "en",

  // @TODO these need to be dynamically created here for all pages
  pathnames: {
    "/": "/",
    "/pathnames": {
      en: "/pathnames",
      fi: "/polkunimet",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
