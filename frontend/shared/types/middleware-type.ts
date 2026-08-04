import { NextRequest, NextResponse } from "next/server";

export type MiddlewareFactory = (
  request: NextRequest,
  response: NextResponse,
) => Promise<NextResponse | null> | NextResponse | null;
