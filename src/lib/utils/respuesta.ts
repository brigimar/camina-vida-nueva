import { NextResponse } from "next/server";
import { ZodError } from "zod";

type ApiSuccess = { data: any; meta?: any };
type ApiError = { data: null; error: { message: string; code?: string; details?: any } };

export function ok(data: any, status = 200, meta?: any) {
  const body: ApiSuccess = meta ? { data, meta } : { data };
  return NextResponse.json(body, { status });
}

export function unauthorized(message = "Unauthorized") {
  const body: ApiError = { data: null, error: { message, code: "UNAUTHORIZED" } };
  return NextResponse.json(body, { status: 401 });
}

export function forbidden(message = "Forbidden") {
  const body: ApiError = { data: null, error: { message, code: "FORBIDDEN" } };
  return NextResponse.json(body, { status: 403 });
}

export function notFound(message = "Not found") {
  const body: ApiError = { data: null, error: { message, code: "NOT_FOUND" } };
  return NextResponse.json(body, { status: 404 });
}

export function errorResponse(e: unknown) {
  if (e instanceof ZodError) {
    const body: ApiError = {
      data: null,
      error: { message: "Validation error", code: "VALIDATION_ERROR", details: e.flatten() },
    };
    return NextResponse.json(body, { status: 400 });
  }

  // Postgrest-like error shape handling
  // @ts-ignore
  if (e && typeof e === "object" && (e as any).message) {
    // don't leak internal stack
    const maybeCode = (e as any).code || (e as any).status || undefined;
    const body: ApiError = { data: null, error: { message: (e as any).message || "Error", code: maybeCode } };
    const status = maybeCode === "PGRST" ? 400 : (maybeCode && Number(maybeCode)) || 500;
    return NextResponse.json(body, { status });
  }

  console.error(e);

  const body: ApiError = { data: null, error: { message: "Internal server error", code: "INTERNAL_SERVER_ERROR" } };
  return NextResponse.json(body, { status: 500 });
}
