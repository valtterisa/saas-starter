import { updateSession } from "@/utils/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";

// List of supported locales
const locales = ["en", "es", "fr", "de"];
const defaultLocale = "en";

// Get the preferred locale from request headers
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language") || "";

  // Check if any of our supported locales match the browser's preferred languages
  for (const locale of locales) {
    if (acceptLanguage.includes(locale)) {
      return locale;
    }
  }

  // Check for stored locale in cookies
  const storedLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (storedLocale && locales.includes(storedLocale)) {
    return storedLocale;
  }

  return defaultLocale;
}

export async function middleware(request: NextRequest) {
  // Skip for static assets and API routes
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.includes(".")
  ) {
    return updateSession(request), NextResponse.next();
  }

  const locale = getLocale(request);
  const pathname = request.nextUrl.pathname;

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // Redirect to the same URL but with locale prefix
    return (
      updateSession(request),
      NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
    );
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
