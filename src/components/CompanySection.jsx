import React from 'react';
import FloatingLabelInput from './FloatingLabelInput';

const CompanySection = ({ yourCompany, handleInputChange }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Su Compañía</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FloatingLabelInput
          id="yourCompanyName"
          label="Nombre"
          value={yourCompany.name}
          onChange={handleInputChange}
          name="name"
        />
        <FloatingLabelInput
          id="yourCompanyPhone"
          label="Teléfono"
          value={yourCompany.phone}
          onChange={handleInputChange}
          name="phone"
        />
        <FloatingLabelInput
          id="yourCompanyRuc"
          label="RUC"
          value={yourCompany.ruc}
          onChange={handleInputChange}
          name="ruc"
        />
        <FloatingLabelInput
          id="yourCompanyTimbrado"
          label="Timbrado"
          value={yourCompany.timbrado}
          onChange={handleInputChange}
          name="timbrado"
        />
        <FloatingLabelInput
          id="yourCompanyEmail"
          label="Email"
          value={yourCompany.email}
          onChange={handleInputChange}
          name="email"
          type="email"
        />
      </div>
      <FloatingLabelInput
        id="yourCompanyAddress"
        label="Dirección"
        value={yourCompany.address}
        onChange={handleInputChange}
        name="address"
        className="mt-4"
      />
    </div>
  );
};

export default CompanySection;