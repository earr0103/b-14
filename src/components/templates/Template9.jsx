import React from 'react';
import { format } from 'date-fns';
import BaseTemplate from './BaseTemplate';
import { calculateSubTotal, calculateGrandTotal } from '../../utils/invoiceCalculations';

const Template9 = ({ data }) => {
  const { billTo = {}, invoice = {}, yourCompany = {}, items = [], tax = 0, notes = '' } = data || {};

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(amount);
  };

  const subTotal = calculateSubTotal(items);
  const total = calculateGrandTotal(items, tax);

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">Invoice</h1>
            <h2 className="text-xl font-bold">{yourCompany.name || 'Your Company Name'}</h2>
            <p>{yourCompany.address || 'Company Address'}</p>
            <p>{yourCompany.phone || 'Company Phone'}</p>
          </div>
          <div className="text-right">
            <p><span className="font-semibold">Invoice#:</span> {invoice.number || 'N/A'}</p>
            <p><span className="font-semibold">Invoice Date:</span> {invoice.date ? format(new Date(invoice.date), 'MMM dd, yyyy') : 'N/A'}</p>
            <p><span className="font-semibold">Due Date:</span> {invoice.paymentDate ? format(new Date(invoice.paymentDate), 'MMM dd, yyyy') : 'N/A'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-green-50 p-4 rounded">
            <h3 className="text-lg font-semibold text-green-600 mb-2">Billed by</h3>
            <p>{yourCompany.name || 'Your Company Name'}</p>
            <p>{yourCompany.address || 'Your Company Address'}</p>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <h3 className="text-lg font-semibold text-green-600 mb-2">Billed to</h3>
            <p>{billTo.name || 'Client Name'}</p>
            <p>{billTo.address || 'Client Address'}</p>
          </div>
        </div>

        <table className="w-full mb-8">
          <thead className="bg-green-100 text-green-600">
            <tr>
              <th className="p-2 text-left">Item #/Item description</th>
              <th className="p-2 text-right">Qty.</th>
              <th className="p-2 text-right">Rate</th>
              <th className="p-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="p-2">{item.name || 'Item Name'}</td>
                <td className="p-2 text-right">{item.quantity || 0}</td>
                <td className="p-2 text-right">{formatCurrency(item.amount || 0)}</td>
                <td className="p-2 text-right">{formatCurrency((item.quantity || 0) * (item.amount || 0))}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-8">
          <div className="w-1/2">
            <div className="flex justify-between mb-2">
              <span>Sub Total:</span>
              <span>{formatCurrency(subTotal)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax:</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total:</span>
              <span className="text-green-600">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {notes && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-green-600 mb-2">Additional Notes</h3>
            <p>{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template9;