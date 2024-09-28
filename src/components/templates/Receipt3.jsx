import React from 'react';
import { format } from 'date-fns';
import BaseTemplate2 from './BaseTemplate2';
import { calculateSubTotal, calculateGrandTotal } from '../../utils/invoiceCalculations';
import { formatCurrency } from '../../utils/formatCurrency';

const Receipt3 = ({ data, isPrint = false }) => {
  const { billTo = {}, invoice = {}, yourCompany = {}, cashier = '', items = [], tax = 0, notes = '', footer = '' } = data || {};

  const subTotal = calculateSubTotal(items);
  const total = calculateGrandTotal(items, tax);

  return (
    <BaseTemplate2
      width="80mm"
      height="auto"
      className="p-2"
      data={data}
      isPrint={isPrint}
    >
      <div
        className="bg-white flex flex-col min-h-full"
        style={{
          fontSize: isPrint ? "8px" : "14px",
          fontFamily: "'Monaco', monospace",
          whiteSpace: "pre-wrap",
          lineHeight: "1.2",
        }}
      >
        <div className="flex-grow">
          <div className="text-center font-bold mb-2 pb-2 border-b-2 border-dashed">
            CASH RECEIPT
            {yourCompany.name && <div className="mt-2">{yourCompany.name}</div>}
            {yourCompany.address && <div>{yourCompany.address}</div>}
            {yourCompany.phone && <div>{yourCompany.phone}</div>}
          </div>
          <div className="mb-2 text-right">
            <div>Invoice#: {invoice.number || "N/A"}</div>
            <div>
              Date:{" "}
              {invoice.date
                ? format(new Date(invoice.date), "MM/dd/yyyy")
                : "N/A"}
            </div>
          </div>
          <div className="mb-2">Customer: {billTo || "N/A"}</div>
          <div className="mb-2 pb-2 border-b-2 border-dashed">
            Cashier: {cashier || "N/A"}
          </div>
          <div className="py-2 mb-2">
            <div className="flex justify-between font-bold mb-2">
              <span>Item</span>
              <span>Qty</span>
              <span>Amt</span>
              <span>Total</span>
            </div>
            {items.map((item, index) => (
              <div key={index} className="flex justify-between mb-2">
                <div>
                  <span>
                    {item.name || "N/A"} X {item.quantity || 0}
                  </span>
                  <div className="text-sm text-gray-600">
                    {item.description || ""}
                  </div>
                </div>
                <span>
                  {formatCurrency((item.quantity || 0) * (item.amount || 0))}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <span>Tax:</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between font-bold mt-2 pb-2 border-t-2 pt-2 border-b-2 border-dashed">
            <span>Total:</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <div className="mt-4">
            <div>{notes || "N/A"}</div>
          </div>
        </div>
        <div className="text-center mt-20">{footer || ""}</div>
      </div>
    </BaseTemplate2>
  );
};

export default Receipt3;
