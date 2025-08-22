import { getLocalLang } from "@/app/actions";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = await getLocalLang();

  return {
    locale,
    messages: (await import(`./../messages/${locale}.json`)).default,
  };
});
