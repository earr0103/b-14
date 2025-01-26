import React, { useState } from 'react';
import { ReceiptFormProvider } from '../components/receipt/ReceiptFormProvider';
import ReceiptForm from '../components/receipt/ReceiptForm';
import ReceiptPreview from '../components/receipt/ReceiptPreview';
import ReceiptHeaderActions from '../components/receipt/ReceiptHeaderActions';

const ReceiptPage = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  return (
    <ReceiptFormProvider>
      <div className="container mx-auto px-4 py-8 relative">
        <ReceiptHeaderActions
          isDownloading={isDownloading}
          setIsDownloading={setIsDownloading}
        />
        <div className="flex flex-col md:flex-row gap-8">
          <ReceiptForm />
          <ReceiptPreview />
        </div>
      </div>
    </ReceiptFormProvider>
  );
};

export default ReceiptPage;