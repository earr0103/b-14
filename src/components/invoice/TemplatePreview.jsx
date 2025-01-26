import React from 'react';
import InvoiceTemplate from '../InvoiceTemplate';
import { useInvoiceForm } from './InvoiceFormProvider';

const TemplatePreview = ({ currentTemplate }) => {
  const { formData } = useInvoiceForm();

  const calculateSubTotal = () => {
    return formData.items.reduce((sum, item) => {
      const itemTotal = item.hasDiscount && item.discountPercentage
        ? item.quantity * item.amount * (1 - item.discountPercentage / 100)
        : item.quantity * item.amount;
      return sum + itemTotal;
    }, 0);
  };

  const calculateTaxAmount = () => {
    const subTotal = calculateSubTotal();
    return (subTotal * (formData.taxPercentage / 100));
  };

  const calculateGrandTotal = () => {
    const subTotal = calculateSubTotal();
    const taxAmount = calculateTaxAmount();
    return subTotal + taxAmount;
  };

  return (
    <div className="mt-8 w-[210mm] mx-auto border shadow-lg">
      <InvoiceTemplate
        data={{
          ...formData,
          subTotal: calculateSubTotal(),
          taxAmount: calculateTaxAmount(),
          grandTotal: calculateGrandTotal()
        }}
        templateNumber={currentTemplate}
      />
    </div>
  );
};

export default TemplatePreview;