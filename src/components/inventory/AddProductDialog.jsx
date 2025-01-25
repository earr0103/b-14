import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FloatingLabelInput from '../FloatingLabelInput';

const AddProductDialog = ({ open, onOpenChange, onProductAdded }) => {
  const [product, setProduct] = React.useState({
    name: '',
    description: '',
    stock: '',
    minStock: '',
    price: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to add the product
    console.log('Adding product:', product);
    onProductAdded();
    onOpenChange(false);
    setProduct({ name: '', description: '', stock: '', minStock: '', price: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Producto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FloatingLabelInput
            id="productName"
            label="Nombre"
            name="name"
            value={product.name}
            onChange={handleInputChange}
          />
          <FloatingLabelInput
            id="productDescription"
            label="Descripción"
            name="description"
            value={product.description}
            onChange={handleInputChange}
          />
          <div className="grid grid-cols-2 gap-4">
            <FloatingLabelInput
              id="productStock"
              label="Stock Actual"
              name="stock"
              type="number"
              value={product.stock}
              onChange={handleInputChange}
            />
            <FloatingLabelInput
              id="productMinStock"
              label="Stock Mínimo"
              name="minStock"
              type="number"
              value={product.minStock}
              onChange={handleInputChange}
            />
          </div>
          <FloatingLabelInput
            id="productPrice"
            label="Precio (₲)"
            name="price"
            type="number"
            value={product.price}
            onChange={handleInputChange}
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Agregar Producto</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;