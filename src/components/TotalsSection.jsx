import React from 'react';

const TotalsSection = ({ subTotal, taxPercentage, handleTaxPercentageChange, taxAmount, grandTotal }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Totales</h3>
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>₲ {subTotal}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Tasa de impuesto (%):</span>
        <input
          type="number"
          value={taxPercentage}
          onChange={handleTaxPercentageChange}
          className="w-24 p-2 border rounded"
          min="0"
          max="28"
          step="1"
        />
      </div>
      <div className="flex justify-between mb-2">
        <span>Monto de impuesto:</span>
        <span>₲ {taxAmount}</span>
      </div>
      <div className="flex justify-between font-bold">
        <span>Total:</span>
        <span>₲ {grandTotal}</span>
      </div>
    </div>
  );
};

export default TotalsSection;