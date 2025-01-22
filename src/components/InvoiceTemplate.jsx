import React from 'react';
import { Button } from "./ui/button";
import { Download, Send } from "lucide-react";
import { sendInvoiceEmail } from '../utils/emailUtils';

const InvoiceTemplate = ({ formData, onDownload }) => {
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
    <div className="flex gap-2 justify-end mb-4">
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
        onClick={onDownload}
      >
        <Download className="w-4 h-4" />
        Download
      </Button>
    </div>
  );
};

export default InvoiceTemplate;