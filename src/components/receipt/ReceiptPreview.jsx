import React, { useRef } from 'react';
import { useReceiptForm } from './ReceiptFormProvider';
import Receipt1 from '../templates/Receipt1';
import Receipt2 from '../templates/Receipt2';
import Receipt3 from '../templates/Receipt3';
import Receipt4 from '../templates/Receipt4';

const ReceiptPreview = () => {
  const {
    billTo,
    invoice,
    yourCompany,
    cashier,
    items,
    taxPercentage,
    theme,
    setTheme,
    notes,
    footer,
  } = useReceiptForm();
  
  const receiptRef = useRef(null);

  const receiptData = {
    billTo,
    invoice,
    yourCompany,
    cashier,
    items,
    taxPercentage,
    notes,
    footer,
  };

  return (
    <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Vista previa del recibo</h2>
      <div className="mb-4 flex items-center">
        <h3 className="text-lg font-medium mr-4">Tipo de recibo</h3>
        <div className="flex gap-4">
          {["Receipt1", "Receipt2", "Receipt3", "Receipt4"].map((receiptType) => (
            <label key={receiptType} className="flex items-center">
              <input
                type="radio"
                name="theme"
                value={receiptType}
                checked={theme === receiptType}
                onChange={(e) => setTheme(e.target.value)}
                className="mr-2"
              />
              {receiptType.replace(/Receipt/, "Recibo ")}
            </label>
          ))}
        </div>
      </div>
      <div ref={receiptRef} className="w-[380px] mx-auto border shadow-lg">
        {theme === "Receipt1" && <Receipt1 data={receiptData} />}
        {theme === "Receipt2" && <Receipt2 data={receiptData} />}
        {theme === "Receipt3" && <Receipt3 data={receiptData} />}
        {theme === "Receipt4" && <Receipt4 data={receiptData} />}
      </div>
    </div>
  );
};

export default ReceiptPreview;