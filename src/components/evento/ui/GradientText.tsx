import React from "react";

export default function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-400">
      {children}
    </span>
  );
}
