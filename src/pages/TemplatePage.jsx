import React, { useState } from "react";
import { generatePDF } from '../utils/pdfGenerator';
import TemplateGallery from '../components/TemplateGallery';
import { InvoiceFormProvider } from '../components/invoice/InvoiceFormProvider';
import InvoiceForm from '../components/invoice/InvoiceForm';
import TemplatePreview from '../components/invoice/TemplatePreview';
import HeaderActions from '../components/invoice/HeaderActions';

const TemplatePage = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(1);

  const handleDownloadPDF = async () => {
    if (!isDownloading) {
      setIsDownloading(true);
      try {
        await generatePDF(formData, currentTemplate);
      } catch (error) {
        console.error('Error generating PDF:', error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handleTemplateClick = (templateNumber) => {
    setCurrentTemplate(templateNumber);
  };

  return (
    <InvoiceFormProvider>
      <div className="container mx-auto px-4 py-8">
        <HeaderActions
          isDownloading={isDownloading}
          handleDownloadPDF={handleDownloadPDF}
        />

        <div className="flex flex-col md:flex-row gap-8">
          <InvoiceForm />
          <TemplateGallery handleTemplateClick={handleTemplateClick} />
        </div>

        <TemplatePreview currentTemplate={currentTemplate} />
      </div>
    </InvoiceFormProvider>
  );
};

export default TemplatePage;