import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, FileText, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { generateReceiptPDF } from '../../utils/receiptPDFGenerator';

const ReceiptHeaderActions = ({ receiptRef, isDownloading, setIsDownloading }) => {
  const navigate = useNavigate();

  const handleDownloadPDF = async () => {
    if (!isDownloading && receiptRef.current) {
      setIsDownloading(true);
      try {
        await generateReceiptPDF(receiptRef.current);
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  return (
    <div className="flex items-center gap-4 mb-8">
      <Button variant="ghost" onClick={() => navigate('/')}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>
      <h1 className="text-3xl font-bold">Generador de Recibos</h1>
      <div className="flex items-center ml-auto">
        <Button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="mr-4"
        >
          {isDownloading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Descargando...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Descargar PDF
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ReceiptHeaderActions;