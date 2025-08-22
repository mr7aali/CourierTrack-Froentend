"use server";

import { cookies } from "next/headers";

export const getLocalLang = async () => {
  const store = await cookies();
  return store.get("locale")?.value || "en";
};

export const setLocalLang = async ({ locale }: { locale: string }) => {
  const store = await cookies();
  store.set("locale", locale);
};
