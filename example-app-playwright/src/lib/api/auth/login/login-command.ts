import { httpService } from "@/lib/http";

import type { LoginDto } from "./login-dto";

export const loginUser = (body: LoginDto) => {
  return httpService.post<string>("auth/login", body);
};
