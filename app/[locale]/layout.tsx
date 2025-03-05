import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { headers } from "next/headers";
import { LocaleProvider } from "@/contexts/locale-context";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Quantum - SaaS Platform",
    description:
      "Streamline your workflow and boost productivity with our all-in-one platform.",
    alternates: {
      languages: {
        en: "/en",
        es: "/es",
        fr: "/fr",
        de: "/de",
        "x-default": "/",
      },
    },
  };
}

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This is server-side code
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";

  // Simple language detection from headers (for initial render only)
  let initialLang = "en";
  if (acceptLanguage.includes("es")) initialLang = "es";
  else if (acceptLanguage.includes("fr")) initialLang = "fr";
  else if (acceptLanguage.includes("de")) initialLang = "de";

  return (
    <html
      lang={initialLang}
      className={geistSans.className}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <LocaleProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="min-h-screen w-full flex flex-col items-center">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
