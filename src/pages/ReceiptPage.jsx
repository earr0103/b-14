import React, { useState, useRef } from 'react';
import { ReceiptFormProvider } from '../components/receipt/ReceiptFormProvider';
import ReceiptForm from '../components/receipt/ReceiptForm';
import ReceiptPreview from '../components/receipt/ReceiptPreview';
import ReceiptHeaderActions from '../components/receipt/ReceiptHeaderActions';

const ReceiptPage = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const receiptRef = useRef(null);

  return (
    <ReceiptFormProvider>
      <div className="container mx-auto px-4 py-8 relative">
        <ReceiptHeaderActions
          receiptRef={receiptRef}
          isDownloading={isDownloading}
          setIsDownloading={setIsDownloading}
        />
        <div className="flex flex-col md:flex-row gap-8">
          <ReceiptForm />
          <ReceiptPreview ref={receiptRef} />
        </div>
      </div>
    </ReceiptFormProvider>
  );
};

export default ReceiptPage;