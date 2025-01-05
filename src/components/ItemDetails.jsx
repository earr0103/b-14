import React from 'react';
import FloatingLabelInput from './FloatingLabelInput';
import { Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const ItemDetails = ({ items, handleItemChange, addItem, removeItem }) => {
  const calculateItemTotal = (item) => {
    const baseTotal = item.quantity * item.amount;
    if (item.hasDiscount && item.discountPercentage) {
      const discount = (baseTotal * item.discountPercentage) / 100;
      return (baseTotal - discount).toFixed(2);
    }
    return baseTotal.toFixed(2);
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Detalles del Artículo</h2>
      {items.map((item, index) => (
        <div key={index} className="mb-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
            <FloatingLabelInput
              id={`itemName${index}`}
              label="Nombre"
              value={item.name}
              onChange={(e) => handleItemChange(index, 'name', e.target.value)}
            />
            <FloatingLabelInput
              id={`itemQuantity${index}`}
              label="Cantidad"
              type="number"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))}
            />
            <FloatingLabelInput
              id={`itemAmount${index}`}
              label="Monto (₲)"
              type="number"
              value={item.amount}
              onChange={(e) => handleItemChange(index, 'amount', parseFloat(e.target.value))}
            />
            <FloatingLabelInput
              id={`itemTotal${index}`}
              label="Total (₲)"
              type="number"
              value={calculateItemTotal(item)}
              disabled
            />
          </div>
          <FloatingLabelInput
            id={`itemDescription${index}`}
            label="Descripción"
            value={item.description}
            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
          />
          <div className="flex items-center gap-2 mt-2">
            <Checkbox
              id={`discountCheckbox${index}`}
              checked={item.hasDiscount}
              onCheckedChange={(checked) => handleItemChange(index, 'hasDiscount', checked)}
            />
            <label htmlFor={`discountCheckbox${index}`} className="text-sm">
              Descuento
            </label>
            {item.hasDiscount && (
              <div className="flex items-center gap-2">
                <FloatingLabelInput
                  id={`discountPercentage${index}`}
                  label="Porcentaje de descuento"
                  type="number"
                  value={item.discountPercentage || ''}
                  onChange={(e) => handleItemChange(index, 'discountPercentage', parseFloat(e.target.value))}
                  min="0"
                  max="100"
                  className="w-24"
                />
                <span className="text-sm">%</span>
              </div>
            )}
          </div>
          {index > 0 && (
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-0 right-0 mt-2"
              onClick={() => removeItem(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <Button 
        type="button" 
        onClick={addItem} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Agregar Artículo
      </Button>
    </div>
  );
};

export default ItemDetails;