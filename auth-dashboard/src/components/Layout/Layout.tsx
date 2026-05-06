import { type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
