import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import InvoiceTemplate from '../components/InvoiceTemplate';
import { generatePDF } from '../utils/pdfGenerator';
import { templates } from '../utils/templateRegistry';
import CompanySection from '../components/CompanySection';
import BillToSection from '../components/BillToSection';
import InvoiceInformation from '../components/InvoiceInformation';
import ItemDetails from '../components/ItemDetails';
import NotesSection from '../components/NotesSection';
import TemplateGallery from '../components/TemplateGallery';

const TemplatePage = () => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(1);
  const [formData, setFormData] = useState({
    yourCompany: {
      name: '',
      address: '',
      phone: '',
      email: '',
      ruc: '',
      timbrado: ''
    },
    billTo: {
      name: '',
      address: '',
      phone: '',
      email: '',
      ruc: ''
    },
    invoice: {
      number: '',
      date: '',
      paymentDate: ''
    },
    items: [
      { name: '', description: '', quantity: 1, amount: 0, hasDiscount: false, discountPercentage: 0 }
    ],
    taxPercentage: 10,
    notes: ''
  });

  useEffect(() => {
    const savedFormData = localStorage.getItem('invoiceFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('invoiceFormData', JSON.stringify(formData));
  }, [formData]);

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      yourCompany: {
        ...prev.yourCompany,
        [name]: value
      }
    }));
  };

  const handleBillToChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      billTo: {
        ...prev.billTo,
        [name]: value
      }
    }));
  };

  const handleInvoiceChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      invoice: {
        ...prev.invoice,
        [name]: value
      }
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { name: '', description: '', quantity: 1, amount: 0, hasDiscount: false, discountPercentage: 0 }]
    }));
  };

  const removeItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleTemplateClick = (templateNumber) => {
    setCurrentTemplate(templateNumber);
  };

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

  const refreshNotes = () => {
    setFormData(prev => ({
      ...prev,
      notes: ''
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
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

      <div className="flex flex-col md:flex-row gap-8">
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
            refreshNotes={refreshNotes}
          />
        </div>

        <TemplateGallery handleTemplateClick={handleTemplateClick} />
      </div>

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
    </div>
  );
};

export default TemplatePage;