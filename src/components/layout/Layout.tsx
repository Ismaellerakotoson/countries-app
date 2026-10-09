import { Outlet } from "react-router";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-lm-bg font-sans text-lm-text dark:bg-dm-bg dark:text-white  transition-colors duration-300">
      <Header />
      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-10 sm:py-12">
        <Outlet />
      </main>
    </div>
  );
}