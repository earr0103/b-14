import React from 'react';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';
import { sendInvoiceEmail } from '../../utils/emailUtils';
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const Template1 = ({ data }) => {
  const { billTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  const handleSendEmail = () => {
    if (!yourCompany.email || !billTo.email) {
      alert('Both company and customer email addresses are required to send email.');
      return;
    }
    sendInvoiceEmail(yourCompany.email, billTo.email, data);
  };

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="text-right">
            <h2 className="text-3xl font-semibold">FACTURA</h2>
          </div>
          <Button 
            onClick={handleSendEmail}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </Button>
        </div>

        <div className="flex justify-between mb-12">
          <div>
            <h1 className="text-2xl font-bold">{yourCompany.name}</h1>
            <p>{yourCompany.address}</p>
            <p>{yourCompany.phone}</p>
            <p>Email: {yourCompany.email}</p>
            <p>RUC: {yourCompany.ruc}</p>
            <p>Timbrado: {yourCompany.timbrado}</p>
          </div>
          <div>
            <p>Número de Factura: {invoice.number}</p>
            <p>Fecha de Emisión: {invoice.date}</p>
            <p>Fecha de Vencimiento: {invoice.paymentDate}</p>
          </div>
        </div>

        <div className="flex justify-between mb-8">
          <div>
            <h3 className="font-semibold">Facturar a:</h3>
            <p>{billTo.name}</p>
            <p>{billTo.address}</p>
            <p>{billTo.phone}</p>
            <p>Email: {billTo.email}</p>
            <p>RUC: {billTo.ruc}</p>
          </div>
        </div>

        <table className="w-full mb-8">
          <thead>
            <tr className="border-t border-b bg-gray-100">
              <th className="p-2 text-left">Artículo</th>
              <th className="p-2 text-center">Cantidad</th>
              <th className="p-2 text-right">Precio Unitario</th>
              <th className="p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-t-2 border-b-2 border-gray-800">
                <td className="p-2">
                  {item.name}
                  <div className="text-sm text-gray-500">
                    {item.description}
                  </div>
                </td>
                <td className="p-2 text-right">{item.quantity}</td>
                <td className="p-2 text-right">
                  {formatCurrency(item.amount)}
                </td>
                <td className="p-2 text-right">
                  {formatCurrency(item.hasDiscount && item.discountPercentage ? 
                    (item.quantity * item.amount * (1 - item.discountPercentage / 100)) : 
                    (item.quantity * item.amount))}
                  {item.hasDiscount && item.discountPercentage > 0 && (
                    <span className="text-sm text-gray-500 ml-1">
                      (-{item.discountPercentage}%)
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-1/3">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>{formatCurrency(subTotal)}</span>
            </div>
            {taxPercentage > 0 && (
              <div className="flex justify-between mb-2">
                <span>IVA ({taxPercentage}%):</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold mb-2">Notas:</h3>
          <p>{notes}</p>
        </div>
      </div>
    </BaseTemplate>
  );
};

export default Template1;
