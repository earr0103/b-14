import React from 'react';
import { format } from 'date-fns';
import BaseTemplate2 from './BaseTemplate2';
import { calculateSubTotal, calculateTaxAmount, calculateGrandTotal } from '../../utils/invoiceCalculations';
import { formatCurrency } from '../../utils/formatCurrency';

const Receipt1 = ({ data, isPrint = false }) => {
  const { billTo = {}, invoice = {}, yourCompany = {}, cashier = '', items = [], taxPercentage = 0, notes = '', footer = '' } = data || {};

  const subTotal = calculateSubTotal(items);
  const taxAmount = calculateTaxAmount(subTotal, taxPercentage);
  const total = calculateGrandTotal(subTotal, taxAmount);

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
          fontFamily: "'Courier New', Courier, monospace",
          whiteSpace: "pre-wrap",
          lineHeight: "1.2",
        }}
      >
        <div className="flex-grow">
          <div className="text-center font-bold mb-2">RECIBO</div>
          <div className="mb-2 text-center">
            <div>{yourCompany.name || "N/A"}</div>
            <div>{yourCompany.address || "N/A"}</div>
            <div>{yourCompany.phone}</div>
            <div>Email: {yourCompany.email}</div>
            <div>RUC: {yourCompany.ruc}</div>
            <div>Timbrado: {yourCompany.timbrado}</div>
          </div>
          <div>Factura: {invoice.number || "N/A"}</div>
          <div>
            Fecha:{" "}
            {invoice.date
              ? `${format(new Date(invoice.date), "MM/dd/yyyy")} ${format(new Date(), "HH:mm")}`
              : "N/A"}
          </div>
          <div className="mb-2">Cliente: {billTo.name || "N/A"}</div>
          <div className="mb-2">Email: {billTo.email || "N/A"}</div>
          <div className="mb-2">RUC: {billTo.ruc || "N/A"}</div>
          <div className="mb-2">Cajero: {cashier || "N/A"}</div>
          <div className="border-t border-b py-2 mb-2">
            <div className="flex justify-between font-bold mb-2">
              <span>Artículo</span>
              <span>Total</span>
            </div>
            {items.map((item, index) => (
              <div key={index} className="flex justify-between mb-2">
                <div>
                  <span>{item.name || "N/A"} X {item.quantity || 0} unid</span>
                </div>
                <span>
                  {formatCurrency((item.quantity || 0) * (item.amount || 0))}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{formatCurrency(subTotal)}</span>
          </div>
          {taxPercentage > 0 && (
            <div className="flex justify-between">
              <span>IVA ({taxPercentage}%):</span>
              <span>{formatCurrency(taxAmount)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold mt-2">
            <span>Total:</span>
            <span>{formatCurrency(total)}</span>
          </div>
          {notes && (
            <div className="mt-4">
              <div>{notes}</div>
            </div>
          )}
        </div>
        <div className="text-center mt-4">{footer || ""}</div>
      </div>
    </BaseTemplate2>
  );
};

export default Receipt1;
