"use client";
import Link from "next/link";

export default function LoginButton() {
  return (
    <Link
      href="/login"
      className="inline-block px-5 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
    >
      Login
    </Link>
  );
}
