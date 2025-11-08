import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { lehlehkaApi } from "@/app/api/api";

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const formData = await request.formData();

    // Якщо потрібно передати далі як multipart/form-data
    const res = await lehlehkaApi.patch(`/users/current/avatars`, formData, {
      headers: {
        Cookie: cookieStore.toString(),
        // Axios сам поставить boundary, якщо не вказувати Content-Type
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }

    console.error("Unexpected error:", (error as Error).message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
