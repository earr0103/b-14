import React from 'react';
import { Button } from "./ui/button";
import { Download, Send, Trash2, Magic } from "lucide-react";
import { sendInvoiceEmail } from '../utils/emailUtils';

const FormHeader = ({ onClear, onFillDummy, onNavigateToReceipt, formData }) => {
  const handleSendEmail = () => {
    const companyEmail = formData?.from?.email;
    const customerEmail = formData?.billTo?.email;
    
    if (!companyEmail || !customerEmail) {
      alert('Please fill in both company and customer email addresses');
      return;
    }
    
    sendInvoiceEmail(companyEmail, customerEmail, formData);
  };

  return (
    <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 p-4 shadow-sm">
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={onClear}
        >
          <Trash2 className="w-4 h-4" />
          Clear Form
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={onFillDummy}
        >
          <Magic className="w-4 h-4" />
          Fill Dummy Data
        </Button>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleSendEmail}
        >
          <Send className="w-4 h-4" />
          Send Email
        </Button>
        <Button
          variant="default"
          className="flex items-center gap-2"
          onClick={onNavigateToReceipt}
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default FormHeader;