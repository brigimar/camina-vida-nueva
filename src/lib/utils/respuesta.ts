import { NextResponse } from "next/server";
import { ZodError } from "zod";

// Tipos reutilizables y seguros
export type ApiResponseData = unknown; // o un tipo más específico si lo deseas
export type ApiMeta = Record<string, unknown>;

export interface ApiSuccess {
  data: ApiResponseData;
  meta?: ApiMeta;
}

export interface ApiError {
  data: null;
  error: {
    message: string;
    code?: string;
    details?: unknown;
  };
}

export type ApiResponse = ApiSuccess | ApiError;

// ✅ ok: sin tipo explícito inseguro
export function ok(data: ApiResponseData, status = 200, meta?: ApiMeta) {
  const body: ApiSuccess = meta ? { data, meta } : { data };
  return NextResponse.json(body, { status });
}

// ✅ unauthorized
export function unauthorized(message = "Unauthorized") {
  const body: ApiError = {
    data: null,
    error: { message, code: "UNAUTHORIZED" },
  };
  return NextResponse.json(body, { status: 401 });
}

// ✅ forbidden
export function forbidden(message = "Forbidden") {
  const body: ApiError = { data: null, error: { message, code: "FORBIDDEN" } };
  return NextResponse.json(body, { status: 403 });
}

// ✅ notFound
export function notFound(message = "Not found") {
  const body: ApiError = { data: null, error: { message, code: "NOT_FOUND" } };
  return NextResponse.json(body, { status: 404 });
}

// ✅ errorResponse: sin supresiones TS
export function errorResponse(e: unknown) {
  if (e instanceof ZodError) {
    const body: ApiError = {
      data: null,
      error: {
        message: "Validation error",
        code: "VALIDATION_ERROR",
        details: e.flatten(),
      },
    };
    return NextResponse.json(body, { status: 400 });
  }

  // Manejo seguro de errores genéricos
  if (e && typeof e === "object") {
    const errorObj = e as Record<string, unknown>;
    const message =
      typeof errorObj.message === "string" ? errorObj.message : "Error";
    const maybeCode =
      (typeof errorObj.code === "string" ? errorObj.code : undefined) ||
      (typeof errorObj.status === "string" ||
      typeof errorObj.status === "number"
        ? errorObj.status
        : undefined);

    const body: ApiError = {
      data: null,
      error: { message, code: maybeCode ? String(maybeCode) : undefined },
    };

    let status = 500;
    if (typeof maybeCode === "string" && maybeCode === "PGRST") {
      status = 400;
    } else if (typeof maybeCode === "number") {
      status = maybeCode;
    } else if (typeof maybeCode === "string" && !isNaN(Number(maybeCode))) {
      status = Number(maybeCode);
    }

    return NextResponse.json(body, { status });
  }

  console.error(e);

  const body: ApiError = {
    data: null,
    error: { message: "Internal server error", code: "INTERNAL_SERVER_ERROR" },
  };
  return NextResponse.json(body, { status: 500 });
}
