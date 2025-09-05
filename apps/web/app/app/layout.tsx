"use client";

import { AuthGuardModal } from "@/components/auth-guard";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuardModal>{children}</AuthGuardModal>;
}
