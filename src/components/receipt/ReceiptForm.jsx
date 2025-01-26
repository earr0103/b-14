import React from 'react';
import { useReceiptForm } from './ReceiptFormProvider';
import CompanySection from '../CompanySection';
import BillToSection from '../BillToSection';
import ItemDetails from '../ItemDetails';
import TotalsSection from '../TotalsSection';
import NotesSection from '../NotesSection';

const ReceiptForm = () => {
  const {
    billTo,
    setBillTo,
    yourCompany,
    setYourCompany,
    items,
    setItems,
    taxPercentage,
    setTaxPercentage,
    notes,
    setNotes,
  } = useReceiptForm();

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setYourCompany(prev => ({ ...prev, [name]: value }));
  };

  const handleBillToChange = (e) => {
    const { name, value } = e.target;
    setBillTo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
      <CompanySection
        yourCompany={yourCompany}
        handleInputChange={handleCompanyChange}
      />

      <BillToSection
        billTo={billTo}
        handleInputChange={handleBillToChange}
      />

      <ItemDetails
        items={items}
        setItems={setItems}
      />

      <TotalsSection
        items={items}
        taxPercentage={taxPercentage}
        setTaxPercentage={setTaxPercentage}
      />

      <NotesSection
        notes={notes}
        setNotes={setNotes}
      />
    </form>
  );
};

export default ReceiptForm;