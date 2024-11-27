import React from 'react';
import FloatingLabelInput from './FloatingLabelInput';

const BillToSection = ({ billTo, handleInputChange }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Facturar A</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FloatingLabelInput
          id="billToName"
          label="Nombre"
          value={billTo.name}
          onChange={handleInputChange}
          name="name"
        />
        <FloatingLabelInput
          id="billToPhone"
          label="Teléfono"
          value={billTo.phone}
          onChange={handleInputChange}
          name="phone"
        />
        <FloatingLabelInput
          id="billToRuc"
          label="RUC"
          value={billTo.ruc}
          onChange={handleInputChange}
          name="ruc"
        />
      </div>
      <FloatingLabelInput
        id="billToAddress"
        label="Dirección"
        value={billTo.address}
        onChange={handleInputChange}
        name="address"
        className="mt-4"
      />
    </div>
  );
};

export default BillToSection;