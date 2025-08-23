"use client";
import { Package, Menu, X, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { setLocalLang } from "@/app/actions";
import { useTheme } from "next-themes";

const Header = () => {
  const t = useTranslations("auth");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [locale, setLocale] = useState(searchParams.get("locale") || "en");
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const updateLocale = async () => {
      const newLocale = searchParams.get("locale") || "en";
      setLocale(newLocale);
      await setLocalLang({ locale: newLocale });
    };
    updateLocale();
  }, [searchParams]);

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "bn" : "en";
    setLocale(newLocale);
    router.replace(`/?locale=${newLocale}`);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        {/* Logo */}
        <Link
          href={`/?locale=${locale}`}
          className="flex items-center space-x-2"
        >
          <Package className="w-6 h-6 text-blue-600 sm:w-8 sm:h-8" />
          <span className="text-lg font-bold text-gray-900 sm:text-xl md:text-2xl dark:text-white">
            CourierTrack
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="items-center hidden space-x-4 md:flex">
          {/* Language Toggle */}
          <Button variant="ghost" onClick={toggleLocale}>
            {locale === "en" ? "বাংলা" : "English"}
          </Button>

          {/* Dark Mode Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          {/* Auth Links */}
          <Link href={`/auth/login?locale=${locale}`}>
            <Button variant="ghost">{t("login.signIn")}</Button>
          </Link>
          <Link href={`/auth/register?locale=${locale}`}>
            <Button>{t("login.getStarted")}</Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="px-4 pb-4 space-y-3 bg-white border-t md:hidden dark:bg-gray-900">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            onClick={toggleLocale}
            className="justify-start w-full"
          >
            {locale === "en" ? "বাংলা" : "English"}
          </Button>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            onClick={toggleTheme}
            className="justify-start w-full"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 mr-2" />
            ) : (
              <Moon className="w-5 h-5 mr-2" />
            )}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>

          {/* Auth Links */}
          <Link href={`/auth/login?locale=${locale}`} className="block">
            <Button variant="ghost" className="justify-start w-full">
              {t("login.signIn")}
            </Button>
          </Link>
          <Link href={`/auth/register?locale=${locale}`} className="block">
            <Button className="justify-start w-full">
              {t("login.getStarted")}
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
