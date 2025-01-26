import React, { createContext, useContext, useState } from 'react';
import { generateRandomInvoiceNumber } from '../../utils/invoiceCalculations';

const ReceiptFormContext = createContext();

export const useReceiptForm = () => {
  const context = useContext(ReceiptFormContext);
  if (!context) {
    throw new Error('useReceiptForm must be used within a ReceiptFormProvider');
  }
  return context;
};

export const ReceiptFormProvider = ({ children }) => {
  const [billTo, setBillTo] = useState({
    name: "",
    phone: "",
    email: "",
    ruc: "",
    address: "",
  });

  const [invoice, setInvoice] = useState({
    date: new Date().toISOString().split('T')[0],
    number: generateRandomInvoiceNumber(),
  });

  const [yourCompany, setYourCompany] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    ruc: "",
    timbrado: "",
  });

  const [cashier, setCashier] = useState("");
  const [items, setItems] = useState([
    { name: "", description: "", quantity: 1, amount: 0, hasDiscount: false, discountPercentage: 0 },
  ]);
  const [taxPercentage, setTaxPercentage] = useState(10);
  const [theme, setTheme] = useState("Receipt1");
  const [notes, setNotes] = useState("");
  const [footer, setFooter] = useState("¡Gracias por elegirnos!");

  const value = {
    billTo,
    setBillTo,
    invoice,
    setInvoice,
    yourCompany,
    setYourCompany,
    cashier,
    setCashier,
    items,
    setItems,
    taxPercentage,
    setTaxPercentage,
    theme,
    setTheme,
    notes,
    setNotes,
    footer,
    setFooter,
  };

  return (
    <ReceiptFormContext.Provider value={value}>
      {children}
    </ReceiptFormContext.Provider>
  );
};