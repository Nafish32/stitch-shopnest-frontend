import { Outlet, useLocation } from "react-router-dom";
import { ToastViewport } from "../ui/Toast";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

const checkoutPaths = ["/checkout", "/order-confirmation"];

export function AppShell() {
  const { pathname } = useLocation();
  const isCheckout = checkoutPaths.some((path) => pathname.startsWith(path));

  return (
    <div className="min-h-screen">
      {!isCheckout && <Navbar />}
      <Outlet />
      {!isCheckout && <Footer />}
      <ToastViewport />
    </div>
  );
}
