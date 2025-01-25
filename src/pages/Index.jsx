import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingLabelInput from '../components/FloatingLabelInput';
import BillToSection from '../components/BillToSection';
import ItemDetails from "../components/ItemDetails";
import FormHeader from '../components/FormHeader';
import InvoiceInformation from '../components/InvoiceInformation';
import CompanySection from '../components/CompanySection';
import TotalsSection from '../components/TotalsSection';
import NotesSection from '../components/NotesSection';
import TemplateGallery from '../components/TemplateGallery';
import { noteOptions } from '../utils/constants';

const generateRandomInvoiceNumber = () => {
  const length = Math.floor(Math.random() * 6) + 3;
  const alphabetCount = Math.min(Math.floor(Math.random() * 4), length);
  let result = "";
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  for (let i = 0; i < alphabetCount; i++) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  for (let i = alphabetCount; i < length; i++) {
    result += numbers[Math.floor(Math.random() * numbers.length)];
  }

  return result;
};

const Index = () => {
  const navigate = useNavigate();
  const [billTo, setBillTo] = useState({ name: "", address: "", phone: "", email: "", ruc: "" });
  const [invoice, setInvoice] = useState({
    date: "",
    paymentDate: "",
    number: "",
  });
  const [yourCompany, setYourCompany] = useState({
    name: "",
    address: "",
    phone: "",
    ruc: "",
    timbrado: "",
    email: "",
  });
  const [items, setItems] = useState([]);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [notes, setNotes] = useState("");

  const refreshNotes = () => {
    const randomIndex = Math.floor(Math.random() * noteOptions.length);
    setNotes(noteOptions[randomIndex]);
  };

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setBillTo(parsedData.billTo || { name: "", address: "", phone: "", email: "", ruc: "" });
      setInvoice(parsedData.invoice || { date: "", paymentDate: "", number: "" });
      setYourCompany(parsedData.yourCompany || { 
        name: "", 
        address: "", 
        phone: "", 
        ruc: "", 
        timbrado: "",
        email: "" 
      });
      setItems(parsedData.items || []);
      setTaxPercentage(parsedData.taxPercentage || 0);
      setNotes(parsedData.notes || "");
    } else {
      setInvoice((prev) => ({
        ...prev,
        number: generateRandomInvoiceNumber(),
      }));
    }
  }, []);

  useEffect(() => {
    const formData = {
      billTo,
      invoice,
      yourCompany,
      items,
      taxPercentage,
      taxAmount,
      subTotal,
      grandTotal,
      notes,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [
    billTo,
    invoice,
    yourCompany,
    items,
    taxPercentage,
    notes,
    taxAmount,
    subTotal,
    grandTotal,
  ]);

  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    if (field === "quantity" || field === "amount") {
      newItems[index].total = newItems[index].quantity * newItems[index].amount;
    }
    setItems(newItems);
    updateTotals();
  };

  const addItem = () => {
    setItems([
      ...items,
      { name: "", description: "", quantity: 0, amount: 0, total: 0 },
    ]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const calculateSubTotal = () => {
    const calculatedSubTotal = items.reduce((sum, item) => {
      const baseTotal = item.quantity * item.amount;
      if (item.hasDiscount && item.discountPercentage) {
        const discount = (baseTotal * item.discountPercentage) / 100;
        return sum + (baseTotal - discount);
      }
      return sum + baseTotal;
    }, 0);
    setSubTotal(calculatedSubTotal.toFixed(2));
    return calculatedSubTotal;
  };

  const calculateTaxAmount = (subTotal) => {
    return ((subTotal * taxPercentage) / 100).toFixed(2);
  };

  const calculateGrandTotal = (subTotal, taxAmount) => {
    return (parseFloat(subTotal) + parseFloat(taxAmount)).toFixed(2);
  };

  const updateTotals = () => {
    const subTotal = calculateSubTotal();
    const taxAmount = calculateTaxAmount(subTotal);
    const grandTotal = calculateGrandTotal(subTotal, taxAmount);

    setTaxAmount(taxAmount);
    setGrandTotal(grandTotal);
  };

  const handleTaxPercentageChange = (e) => {
    const taxRate = parseFloat(e.target.value) || 0;
    setTaxPercentage(taxRate);
    updateTotals();
  };

  useEffect(() => {
    updateTotals();
  }, [items, taxPercentage]);

  const handleTemplateClick = (templateNumber) => {
    const formData = {
      billTo,
      invoice,
      yourCompany,
      items,
      taxPercentage,
      taxAmount,
      subTotal,
      grandTotal,
      notes,
    };
    navigate("/template", {
      state: { formData, selectedTemplate: templateNumber },
    });
  };

  const fillDummyData = () => {
    setBillTo({
      name: "Juan Pérez",
      address: "Calle 123, Ciudad, País",
      phone: "(555) 123-4567",
      email: "juan@example.com",
      ruc: "80012345-6"
    });
    setInvoice({
      date: new Date().toISOString().split("T")[0],
      paymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      number: generateRandomInvoiceNumber(),
    });
    setYourCompany({
      name: "Su Compañía",
      address: "Calle 789, Ciudad, País",
      phone: "(555) 555-5555",
      ruc: "80012345-6",
      timbrado: "12345678",
      email: "company@example.com"
    });
    setItems([
      {
        name: "Producto A",
        description: "Artículo de alta calidad",
        quantity: 2,
        amount: 50,
        total: 100,
      },
      {
        name: "Servicio B",
        description: "Servicio profesional",
        quantity: 1,
        amount: 200,
        total: 200,
      },
    ]);
    setTaxPercentage(10);
    calculateSubTotal();
    setNotes("¡Gracias por su compra!");
  };

  const clearForm = () => {
    setBillTo({ name: "", address: "", phone: "", email: "", ruc: "" });
    setInvoice({
      date: "",
      paymentDate: "",
      number: generateRandomInvoiceNumber(),
    });
    setYourCompany({ 
      name: "", 
      address: "", 
      phone: "", 
      ruc: "", 
      timbrado: "",
      email: "" 
    });
    setItems([{ name: "", description: "", quantity: 0, amount: 0, total: 0 }]);
    setTaxPercentage(0);
    setNotes("");
    localStorage.removeItem("formData");
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <FormHeader 
        onClear={clearForm}
        onFillDummy={fillDummyData}
        onNavigateToReceipt={() => navigate("/receipt", {
          state: {
            formData: {
              billTo,
              invoice,
              yourCompany,
              items,
              taxPercentage,
              notes,
            },
          },
        })}
      />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <form>
            <BillToSection
              billTo={billTo}
              handleInputChange={handleInputChange(setBillTo)}
            />
            <InvoiceInformation 
              invoice={invoice}
              handleInputChange={handleInputChange(setInvoice)}
            />
            <CompanySection
              yourCompany={yourCompany}
              handleInputChange={handleInputChange(setYourCompany)}
            />
            <ItemDetails
              items={items}
              handleItemChange={handleItemChange}
              addItem={addItem}
              removeItem={removeItem}
            />
            <TotalsSection
              subTotal={subTotal}
              taxPercentage={taxPercentage}
              handleTaxPercentageChange={handleTaxPercentageChange}
              taxAmount={taxAmount}
              grandTotal={grandTotal}
            />
            <NotesSection
              notes={notes}
              setNotes={setNotes}
              refreshNotes={refreshNotes}
            />
          </form>
        </div>
        <TemplateGallery handleTemplateClick={handleTemplateClick} />
      </div>
    </div>
  );
};

export default Index;