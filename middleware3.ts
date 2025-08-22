import createMiddleware from "next-intl/middleware";
// import { routing } from './i18n/routing';

export default createMiddleware({
  locales: ["en", "bn"],
  defaultLocale: "en",
  localeDetection: false, // Disable automatic locale detection
});

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
