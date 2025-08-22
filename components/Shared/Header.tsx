"use client";
import { Package } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { setLocalLang } from "@/app/actions";

const Header = () => {
  const t = useTranslations("auth");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [locale, setLocale] = useState(searchParams.get("locale") || "en");

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

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        <Link
          href={`/?locale=${locale}`}
          className="flex items-center space-x-2"
        >
          <Package className="w-6 h-6 text-blue-600 sm:w-8 sm:h-8" />
          <span className="text-[20px] font-bold text-gray-900 sm:text-2xl dark:text-white">
            CourierTrack
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={toggleLocale}>
            {locale === "en" ? "বাংলা" : "English"}
          </Button>
          <Link href={`/auth/login?locale=${locale}`}>
            <Button variant="ghost">{t("login.signIn")}</Button>
          </Link>
          <Link href={`/auth/register?locale=${locale}`}>
            <Button>{t("login.getStarted")}</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
