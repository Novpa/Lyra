"use server";

import axios from "axios";
import { LoginInput } from "@/app/(auth)/login/_schemas/login-schema";
import { ApiResponse } from "@/shared/types/api-type";
import { forwardExpressCookie } from "@/shared/utils/forward-express-cookie";
import { API_BASE_URL } from "@/shared/config/dotenv-config";

export const loginUser = async ({ email, password }: LoginInput) => {
  let res;
  try {
    res = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });

    //fixme (response type)
    const data: ApiResponse<any> = res.data;

    await forwardExpressCookie(res.headers["set-cookie"]);

    return { data, success: true };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "There's something wrong with the server!";

    return { success: false, error: errorMessage };
  }
};
