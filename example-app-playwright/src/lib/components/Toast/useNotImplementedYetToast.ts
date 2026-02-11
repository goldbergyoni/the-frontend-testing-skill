import { useTranslations } from "@/lib/i18n/useTransations";

import { useToast } from "./useToast";

export const useNotImplementedYetToast = () => {
  const toast = useToast();
  const t = useTranslations("shared.toast.not-implemented");

  return () =>
    toast({
      status: "info",
      title: t("title"),
      description: t("description"),
    });
};
