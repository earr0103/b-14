import { HomeIcon, PackageIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import InventoryPage from "./pages/InventoryPage.jsx";

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
];