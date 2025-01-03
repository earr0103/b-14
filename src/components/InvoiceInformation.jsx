import React from 'react';
import FloatingLabelInput from './FloatingLabelInput';

const InvoiceInformation = ({ invoice, handleInputChange }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Información de Factura</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <FloatingLabelInput
            id="invoiceNumber"
            label="Número de Factura"
            value={invoice.number}
            onChange={handleInputChange}
            name="number"
            className="pt-6"
          />
          <label 
            htmlFor="invoiceNumber"
            className="absolute text-sm text-gray-500 transform -translate-y-3 top-2 left-3"
          >
            Número de Factura
          </label>
        </div>
        <FloatingLabelInput
          id="invoiceDate"
          label="Fecha de Factura"
          type="date"
          value={invoice.date}
          onChange={handleInputChange}
          name="date"
        />
        <FloatingLabelInput
          id="invoicePaymentDate"
          label="Fecha de Pago"
          type="date"
          value={invoice.paymentDate}
          onChange={handleInputChange}
          name="paymentDate"
        />
      </div>
    </div>
  );
};

export default InvoiceInformation;