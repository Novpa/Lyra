"use server";

import { API_BASE_URL } from "@/shared/config/dotenv-config";
import { ApiResponse } from "@/shared/types/api-type";
import { forwardExpressCookie } from "@/shared/utils/forward-express-cookie";
import axios from "axios";
import { cookies } from "next/headers";

export const getUserDetails = async () => {
  const allCookie = await cookies();
  const accessToken = allCookie.get("accessToken")?.value;
  const refreshToken = allCookie.get("refreshToken")?.value;
  let res;
  try {
    res = await axios.get(`${API_BASE_URL}/users/me`, {
      headers: {
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken};`,
      },
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
