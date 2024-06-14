import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <div className="flex flex-col gap-9 bg-lightblack">
      <Header />
      <main className="max-w-screen  min-h-screen px-2  px-4 py-4 text-gray-100">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
