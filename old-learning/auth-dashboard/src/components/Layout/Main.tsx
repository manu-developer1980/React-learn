import { type ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
export default function Main({ children }: LayoutProps) {
  return <main className="container mx-auto p-4">{children}</main>;
}
