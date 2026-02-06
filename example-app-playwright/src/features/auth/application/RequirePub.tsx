import type { ReactNode } from "react";

import { Navigate } from "@/lib/router";

import { useAuthStore } from "./authStore";

export interface IRequirePubProps {
  children: ReactNode;
  to?: string;
}

const RequirePub = ({ children, to }: IRequirePubProps) => {
  const isAuthenticated = useAuthStore((store) => store.isAuthenticated);

  return isAuthenticated ? <Navigate to={to ?? "/"} /> : <>{children}</>;
};

export { RequirePub };
