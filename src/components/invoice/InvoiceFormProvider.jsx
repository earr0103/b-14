import React, { createContext, useContext, useState, useEffect } from 'react';

const InvoiceFormContext = createContext();

export const useInvoiceForm = () => {
  const context = useContext(InvoiceFormContext);
  if (!context) {
    throw new Error('useInvoiceForm must be used within an InvoiceFormProvider');
  }
  return context;
};

export const InvoiceFormProvider = ({ children }) => {
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

  const value = {
    formData,
    setFormData,
    handleCompanyChange,
    handleBillToChange,
    handleInvoiceChange,
    handleItemChange,
    addItem,
    removeItem
  };

  return (
    <InvoiceFormContext.Provider value={value}>
      {children}
    </InvoiceFormContext.Provider>
  );
};