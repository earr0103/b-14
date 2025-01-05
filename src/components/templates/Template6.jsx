import React from 'react';
import { format } from 'date-fns';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';

const Template6 = ({ data }) => {
  const { billTo = {}, shipTo = {}, invoice = {}, yourCompany = {}, items = [], taxPercentage = 0, taxAmount = 0, subTotal = 0, grandTotal = 0, notes = '' } = data || {};

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: "#14A8DE" }}>
              {yourCompany.name || "Nombre de la Empresa"}
            </h2>
            <p>{yourCompany.address || "Dirección de la Empresa"}</p>
            <p>{yourCompany.phone || "Teléfono de la Empresa"}</p>
            <p>RUC: {yourCompany.ruc || "RUC de la Empresa"}</p>
            <p>Timbrado: {yourCompany.timbrado || "Timbrado de la Empresa"}</p>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-thin mb-4">Factura Tributaria</h1>
            <p>
              <span className="font-semibold">N° de Factura:</span>{" "}
              {invoice.number || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Fecha de Emisión:</span>{" "}
              {invoice.date
                ? format(new Date(invoice.date), "MMM dd, yyyy")
                : "N/A"}
            </p>
            <p>
              <span className="font-semibold">Fecha de Vencimiento:</span>{" "}
              {invoice.paymentDate
                ? format(new Date(invoice.paymentDate), "MMM dd, yyyy")
                : "N/A"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Facturado a</h3>
            <p>{billTo.name || "Nombre del Cliente"}</p>
            <p>{billTo.address || "Dirección del Cliente"}</p>
          </div>
        </div>

        <table className="w-full mb-8 border border-gray-300">
          <thead style={{ backgroundColor: "#14A8DE" }}>
            <tr>
              <th className="p-2 text-left border-b border-gray-300 text-white">
                Artículo #/Descripción
              </th>
              <th className="p-2 text-right border-b border-gray-300 text-white">
                Cantidad
              </th>
              <th className="p-2 text-right border-b border-gray-300 text-white">
                Precio
              </th>
              <th className="p-2 text-right border-b border-gray-300 text-white">
                Monto
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="p-2 border border-gray-300">
                  <p className="font-semibold">{item.name || "Nombre del Artículo"}</p>
                  <p className="text-sm text-gray-600">
                    {item.description || "Descripción del Artículo"}
                  </p>
                </td>
                <td className="p-2 text-right border border-gray-300">
                  {item.quantity || 0}
                </td>
                <td className="p-2 text-right border border-gray-300">
                  {formatCurrency(item.amount || 0)}
                </td>
                <td className="p-2 text-right border border-gray-300">
                  {formatCurrency(item.hasDiscount && item.discountPercentage ? 
                    ((item.amount || 0) * (item.quantity || 0) * (1 - item.discountPercentage / 100)) : 
                    ((item.amount || 0) * (item.quantity || 0)))}
                  {item.hasDiscount && item.discountPercentage > 0 && (
                    <span className="text-sm" style={{ color: "#14A8DE" }}>
                      (-{item.discountPercentage}%)
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <table className="w-1/2 mb-8 border border-gray-300">
            <tbody>
              <tr>
                <td className="p-2 text-right font-semibold border border-gray-300">
                  Subtotal
                </td>
                <td className="p-2 text-right border border-gray-300">
                  {formatCurrency(subTotal)}
                </td>
              </tr>
              {taxPercentage > 0 && (
                <tr>
                  <td className="p-2 text-right font-semibold border border-gray-300">
                    IVA ({taxPercentage}%)
                  </td>
                  <td className="p-2 text-right border border-gray-300">
                    {formatCurrency(taxAmount)}
                  </td>
                </tr>
              )}
              <tr className="text-white" style={{ backgroundColor: "#14A8DE" }}>
                <td className="p-2 text-right font-semibold border border-gray-300">
                  Total a Pagar
                </td>
                <td className="p-2 text-right border border-gray-300">
                  {formatCurrency(grandTotal)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-center text-sm border-t pt-4">
          <p>{notes}</p>
        </div>
      </div>
    </BaseTemplate>
  );
};

export default Template6;
