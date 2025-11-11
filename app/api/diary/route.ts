import { NextRequest, NextResponse } from "next/server";
import { lehlehkaApi } from "../api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../_utils/utils";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const body = await request.json();
    const res = await lehlehkaApi.post("/diary", body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const url = new URL(req.url);
    const searchParams = Object.fromEntries(url.searchParams.entries());
    // Якщо потрібно числа
    const page = searchParams.page ? Number(searchParams.page) : undefined;
    const limit = searchParams.limit ? Number(searchParams.limit) : undefined;

    // Побудова params для передачі далі
    const paramsToBackend: Record<string, unknown> = {};
    if (page !== undefined) paramsToBackend.page = page;
    if (limit !== undefined) paramsToBackend.limit = limit;

    const res = await lehlehkaApi(`/diary`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      params: paramsToBackend,
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
