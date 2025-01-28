import React, { useState, useRef } from 'react';
import { ReceiptFormProvider } from '../components/receipt/ReceiptFormProvider';
import ReceiptForm from '../components/receipt/ReceiptForm';
import ReceiptPreview from '../components/receipt/ReceiptPreview';
import ReceiptHeaderActions from '../components/receipt/ReceiptHeaderActions';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReceiptPage = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const receiptRef = useRef(null);
  const navigate = useNavigate();

  return (
    <ReceiptFormProvider>
      <div className="container mx-auto px-4 py-8 relative">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        
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