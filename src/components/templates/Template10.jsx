import React from 'react';
import { format } from 'date-fns';
import BaseTemplate2 from './BaseTemplate2';
import { calculateSubTotal, calculateGrandTotal } from '../../utils/invoiceCalculations';
import { formatCurrency } from '../../utils/formatCurrency';

const Template10 = ({ data, isPrint = false }) => {
  const { billTo = {}, invoice = {}, yourCompany = {}, items = [], tax = 0 } = data || {};

  const subTotal = calculateSubTotal(items);
  const total = calculateGrandTotal(items, tax);

  return (
    <BaseTemplate2 width="38mm" height="570mm" className="p-2" data={data} isPrint={isPrint}>
      <div className="bg-white" style={{ fontSize: isPrint ? '6px' : '12px' }}>
        <div className="text-center font-bold mb-2">RECEIPT</div>
        <div className="mb-2">
          <div>Invoice: {invoice.number || 'N/A'}</div>
          <div>Date: {invoice.date ? format(new Date(invoice.date), "MM/dd/yyyy") : 'N/A'}</div>
        </div>
        <div className="mb-2">Customer: {billTo.name || 'N/A'}</div>
        <div className="border-t border-b py-2 mb-2">
          <div className="flex justify-between font-bold">
            <span>Item</span>
            <span>Total</span>
          </div>
          {items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>{item.name || 'N/A'}</span>
              <span>{formatCurrency((item.quantity || 0) * (item.amount || 0))}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <span>Tax:</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="flex justify-between font-bold mt-2">
          <span>Total:</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <div className="text-center mt-4">Thank You!</div>
      </div>
    </BaseTemplate2>
  );
};

export default Template10;