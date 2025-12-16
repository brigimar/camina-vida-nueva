'use client';

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const title = pathname
    .replace("/dashboard", "")
    .replace("/", "")
    .replace(/-/g, " ")
    .trim() || "Inicio";

  const formatted = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <header className="w-full h-20 border-b bg-white flex items-center px-8 justify-between">
      <h2 className="text-2xl font-bold text-[#0F172A]">{formatted}</h2>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
      </div>
    </header>
  );
}
