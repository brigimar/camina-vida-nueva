// app/dashboard/layout.tsx
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase";
import { RefineProvider } from "@/providers/refineProvider";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <RefineProvider>{children}</RefineProvider>;
}
