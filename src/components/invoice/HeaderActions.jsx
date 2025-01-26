import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

const HeaderActions = ({ isDownloading, handleDownloadPDF }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4 mb-8">
      <Button variant="ghost" onClick={() => navigate('/')}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>
      <h1 className="text-3xl font-bold">Generador de Facturas</h1>
      <Button onClick={handleDownloadPDF} disabled={isDownloading}>
        {isDownloading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Descargando...
          </>
        ) : (
          "Descargar PDF"
        )}
      </Button>
    </div>
  );
};

export default HeaderActions;