import { PackageIcon, Receipt, TrendingUp, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Sistema de Gestión
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <Card 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate("/inventory")}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-purple-100">
                <PackageIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-semibold">Inventario</h2>
              <p className="text-muted-foreground text-center">
                Gestione su inventario y productos
              </p>
              <Button 
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
                onClick={() => navigate("/inventory")}
              >
                Acceder al Inventario
              </Button>
            </div>
          </Card>

          <Card 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate("/receipt")}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-blue-100">
                <Receipt className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold">Recibos</h2>
              <p className="text-muted-foreground text-center">
                Genere y gestione recibos
              </p>
              <Button 
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate("/receipt")}
              >
                Generar Recibos
              </Button>
            </div>
          </Card>

          <Card 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate("/template")}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-green-100">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold">Facturas</h2>
              <p className="text-muted-foreground text-center">
                Genere y gestione facturas
              </p>
              <Button 
                className="w-full mt-4 bg-green-600 hover:bg-green-700"
                onClick={() => navigate("/template")}
              >
                Generar Facturas
              </Button>
            </div>
          </Card>

          <Card 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate("/sales")}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-orange-100">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <h2 className="text-2xl font-semibold">Ventas</h2>
              <p className="text-muted-foreground text-center">
                Analice y controle sus ventas
              </p>
              <Button 
                className="w-full mt-4 bg-orange-600 hover:bg-orange-700"
                onClick={() => navigate("/sales")}
              >
                Acceder a Ventas
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;