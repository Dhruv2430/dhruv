"use client";

import { LoadingScreen } from "@/components/LoadingScreen";

export function ClientShell({ children }: { children: React.ReactNode }) {
  return <LoadingScreen>{children}</LoadingScreen>;
}
