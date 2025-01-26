import React from 'react';
import CompanySection from '../CompanySection';
import BillToSection from '../BillToSection';
import InvoiceInformation from '../InvoiceInformation';
import ItemDetails from '../ItemDetails';
import NotesSection from '../NotesSection';
import { useInvoiceForm } from './InvoiceFormProvider';

const InvoiceForm = () => {
  const {
    formData,
    handleCompanyChange,
    handleBillToChange,
    handleInvoiceChange,
    handleItemChange,
    addItem,
    removeItem,
    setFormData
  } = useInvoiceForm();

  return (
    <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
      <CompanySection
        yourCompany={formData.yourCompany}
        handleInputChange={handleCompanyChange}
      />
      <BillToSection
        billTo={formData.billTo}
        handleInputChange={handleBillToChange}
      />
      <InvoiceInformation
        invoice={formData.invoice}
        handleInputChange={handleInvoiceChange}
      />
      <ItemDetails
        items={formData.items}
        handleItemChange={handleItemChange}
        addItem={addItem}
        removeItem={removeItem}
      />
      <NotesSection
        notes={formData.notes}
        setNotes={(notes) => setFormData(prev => ({ ...prev, notes }))}
        refreshNotes={() => setFormData(prev => ({ ...prev, notes: '' }))}
      />
    </div>
  );
};

export default InvoiceForm;