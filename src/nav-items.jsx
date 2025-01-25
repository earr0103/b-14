import { HomeIcon, PackageIcon, TrendingUpIcon, Receipt, FileText } from "lucide-react";
import Index from "./pages/Index.jsx";
import InventoryPage from "./pages/InventoryPage.jsx";
import SalesPage from "./pages/SalesPage.jsx";
import ReceiptPage from "./pages/ReceiptPage.jsx";
import TemplatePage from "./pages/TemplatePage.jsx";

export const navItems = [
  {
    title: "Inicio",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Inventario",
    to: "/inventory",
    icon: <PackageIcon className="h-4 w-4" />,
    page: <InventoryPage />,
  },
  {
    title: "Ventas",
    to: "/sales",
    icon: <TrendingUpIcon className="h-4 w-4" />,
    page: <SalesPage />,
  },
  {
    title: "Recibos",
    to: "/receipt",
    icon: <Receipt className="h-4 w-4" />,
    page: <ReceiptPage />,
  },
  {
    title: "Facturas",
    to: "/template",
    icon: <FileText className="h-4 w-4" />,
    page: <TemplatePage />,
  },
];