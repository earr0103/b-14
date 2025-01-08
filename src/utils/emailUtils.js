export const sendInvoiceEmail = (companyEmail, customerEmail, invoiceData) => {
  // Since we don't have a backend, we'll open the default email client
  const subject = encodeURIComponent(`Invoice ${invoiceData.invoice.number || 'N/A'}`);
  const body = encodeURIComponent(`
    Invoice Details:
    Date: ${invoiceData.invoice.date || 'N/A'}
    Amount: ${invoiceData.grandTotal || 0}
    
    Thank you for your business!
  `);
  
  // Open default email client with both emails in "to" field
  window.location.href = `mailto:${companyEmail},${customerEmail}?subject=${subject}&body=${body}`;
};