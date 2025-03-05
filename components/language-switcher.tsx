"use client";

import React, { useState, useRef, useContext, createContext } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useClickOutside } from "@/lib/utils";

const languages = [
  { key: "fi", name: "Suomi", flag: "" },
  { key: "en", name: "English", flag: "" },
];

function LanguageChanger({ translations, currentLang = "fi" }: any) {
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const [language, setLanguage] = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

  const handleClickOutside = () => {
    setDropdownOpen(false);
  };

  useClickOutside(ref, handleClickOutside);

  const handleChangeLanguage = (locale: string) => {
    let newLanguage = locale;
    let queryParams = "";
    if (searchParams && searchParams.toString() !== "") {
      queryParams = `?${searchParams.toString()}`;
    }

    if (newLanguage) {
      let path = "/";
      if (currentPath.length > 3) path = currentPath.slice(4);
      else return `/${newLanguage}`;
      const found = translations.find((items: any) => items.slug === path);
      if (found) {
        const newPage = found._translations.find(
          (item: any) => item?.language === newLanguage
        )?.slug;

        if (newPage) return `/${newLanguage}/${newPage}${queryParams}`;
        else return `/${newLanguage}/${path}${queryParams}`;
      } else return `/${newLanguage}/${path}${queryParams}`;
    } else {
      return `/${currentLang}${currentPath}`;
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="relative inline-block text-left xl:mt-1" ref={ref}>
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          <span className="mr-2">
            {language === "fi" ? (
              <div className="flex justify-center items-center gap-2">
                Suomi
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2">
                English
              </div>
            )}
          </span>
        </button>
      </div>

      <div
        className={`${
          dropdownOpen ? "block" : "hidden"
        } origin-top-right absolute right-0 mt-2 w-fit md:w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10`}
        role="menu"
        aria-orientation="vertical"
      >
        <div className="flex flex-col" role="none">
          {languages.map((locale, index) => (
            <Link
              href={handleChangeLanguage(locale.key)}
              key={locale.key}
              onClick={() => {
                setLanguage(locale.key);
                handleClickOutside();
              }}
              className={`${
                language === locale.key
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700"
              } block px-4 py-2 text-sm text-left items-center inline-flex hover:bg-lighterGray first:rounded-t-md last:rounded-b-md`}
              role="menuitem"
              prefetch={false}
            >
              <span className="mr-2">{locale.flag}</span>
              <span className="truncate">{locale.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const LanguageContext = createContext<
  [string, React.Dispatch<React.SetStateAction<string>>] | undefined
>(undefined);

export function LanguageProvider({
  children,
  currentLanguage,
}: {
  children: React.ReactNode;
  currentLanguage: string;
}) {
  const [language, setLanguage] = useState(currentLanguage || "fi");
  return (
    <LanguageContext.Provider value={[language, setLanguage]}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export default LanguageChanger;
