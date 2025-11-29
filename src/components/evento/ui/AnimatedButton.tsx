"use client";
import React from "react";

export default function AnimatedButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="transition transform hover:scale-105 bg-green-600 text-white px-4 py-2 rounded">
      {children}
    </button>
  );
}
