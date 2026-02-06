import { omit } from "ramda";

import { httpService } from "@/lib/http";

import type { UserDto } from "./user-dto";

export type IUser = Omit<UserDto, "password">;

export const getUser = () => {
  // mocking current user and its cartId by passing id=1
  // AIDEV-NOTE: role is mocked since backend doesn't return it
  return httpService.get<UserDto>("users/1").then((res) => ({
    ...(omit(["password"], res) as IUser),
    cartId: 1,
    role: res.role ?? "director",
  }));
};
