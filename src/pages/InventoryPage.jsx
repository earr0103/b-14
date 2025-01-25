import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Plus, AlertTriangle } from "lucide-react";
import InventoryTable from '../components/inventory/InventoryTable';
import AddProductDialog from '../components/inventory/AddProductDialog';
import { useToast } from "@/components/ui/use-toast";

const InventoryPage = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const { toast } = useToast();

  // This is a placeholder query - you'll need to implement the actual data fetching
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      // Placeholder data
      return [
        { id: 1, name: 'Producto 1', description: 'Descripción 1', stock: 10, minStock: 5, price: 100000 },
        { id: 2, name: 'Producto 2', description: 'Descripción 2', stock: 3, minStock: 5, price: 200000 },
      ];
    },
  });

  const lowStockProducts = products?.filter(product => product.stock <= product.minStock) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Inventario</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Agregar Producto
        </Button>
      </div>

      {lowStockProducts.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
            <p className="text-sm text-yellow-700">
              {lowStockProducts.length} producto(s) con stock bajo
            </p>
          </div>
        </div>
      )}

      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <InventoryTable products={products} />
      )}

      <AddProductDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
        onProductAdded={() => {
          toast({
            title: "Producto agregado",
            description: "El producto ha sido agregado exitosamente.",
          });
        }}
      />
    </div>
  );
};

export default InventoryPage;