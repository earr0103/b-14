export const generateRandomInvoiceNumber = () => {
  const prefix = '001-001-';
  const randomNum = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
  return `${prefix}${randomNum}`;
};

export const calculateSubTotal = (items) => {
  return items.reduce((total, item) => {
    return total + (item.quantity * item.amount);
  }, 0);
};

export const calculateTaxAmount = (subTotal, taxPercentage) => {
  return (subTotal * taxPercentage) / 100;
};

export const calculateGrandTotal = (subTotal, taxAmount) => {
  return subTotal + taxAmount;
};
