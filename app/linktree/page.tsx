import { Linktree } from "@/components/Linktree";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dhruv Panchal | Links",
  description:
    "Connect with Dhruv Panchal — LinkedIn, GitHub, Resume & more.",
};

export default function LinktreePage() {
  return <Linktree />;
}
