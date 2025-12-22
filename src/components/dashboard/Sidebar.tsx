"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiMap, FiUsers, FiCalendar, FiSettings } from "react-icons/fi";

const links = [
  { href: "/dashboard", label: "Inicio", icon: FiHome },
  { href: "/dashboard/circuitos", label: "Circuitos", icon: FiMap },
  { href: "/dashboard/inscripciones", label: "Inscripciones", icon: FiUsers },
  { href: "/dashboard/sesiones", label: "Sesiones", icon: FiCalendar },
  {
    href: "/dashboard/configuracion",
    label: "Configuración",
    icon: FiSettings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0F172A] text-white h-screen fixed left-0 top-0 flex flex-col shadow-xl">
      <div className="px-6 py-6 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition 
                ${active ? "bg-white text-[#0F172A] font-semibold" : "hover:bg-white/10"}
              `}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
