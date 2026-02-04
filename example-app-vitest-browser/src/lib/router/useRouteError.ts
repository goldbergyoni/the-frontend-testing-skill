// eslint-disable-next-line no-restricted-imports
import { useRouteError as useReactRouterError } from "react-router";

import type { AjaxError } from "@/lib/http/AjaxError";

export const useRouteError = () => {
  return useReactRouterError() as AjaxError;
};
