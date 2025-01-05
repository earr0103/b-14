import React from 'react';
import { format } from 'date-fns';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';

const Template5 = ({ data = {} }) => {
  const { billTo = {}, shipTo = {}, invoice = {}, yourCompany = {}, items = [], taxPercentage = 0, taxAmount = 0, subTotal = 0, grandTotal = 0, notes = '' } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-white max-w-4xl mx-auto flex flex-col h-full overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-green-600">Factura</h1>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold">
                {yourCompany.name || "Nombre de la Empresa"}
              </h2>
              <p>{yourCompany.address || "Dirección de la Empresa"}</p>
              <p>{yourCompany.phone || "Teléfono de la Empresa"}</p>
            <p>RUC: {yourCompany.ruc || "RUC de la Empresa"}</p>
            <p>Timbrado: {yourCompany.timbrado || "Timbrado de la Empresa"}</p>
            </div>
          </div>

          <div className="flex justify-between mb-8 mt-4">
            <div className="text-left w-1/2">
              <h3 className="text-lg font-semibold text-green-600 mb-2">
                Facturado a
              </h3>
              <p className="font-bold">{billTo.name || "Nombre del Cliente"}</p>
              <p>{billTo.address || "Dirección del Cliente"}</p>
              <p>{billTo.phone || "Teléfono del Cliente"}</p>
            </div>
            <div className="text-right w-1/3">
              <h3 className="text-lg font-semibold text-green-600 mb-2 text-left">
                Detalles de la Factura
              </h3>
              <p className="flex justify-between">
                <span className="font-semibold">Factura #:</span>
                <span>{invoice.number || "N/A"}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Fecha de Emisión:</span>
                <span>
                  {invoice.date
                    ? format(new Date(invoice.date), "MMM dd, yyyy")
                    : "N/A"}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Fecha de Vencimiento:</span>
                <span>
                  {invoice.paymentDate
                    ? format(new Date(invoice.paymentDate), "MMM dd, yyyy")
                    : "N/A"}
                </span>
              </p>
            </div>
          </div>

          <table className="w-full mb-8 border border-green-600">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-2 text-left">Artículo #/Descripción</th>
                <th className="p-2 text-right">Cant.</th>
                <th className="p-2 text-right">Precio</th>
                <th className="p-2 text-right">Monto</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-green-50" : ""}
                >
                  <td className="p-2">{item.name || "Nombre del Artículo"}</td>
                  <td className="p-2 text-right">{item.quantity || 0}</td>
                  <td className="p-2 text-right">
                    {formatCurrency(item.amount || 0)}
                  </td>
                  <td className="p-2 text-right">
                    {formatCurrency(item.hasDiscount && item.discountPercentage ? 
                      ((item.quantity || 0) * (item.amount || 0) * (1 - item.discountPercentage / 100)) : 
                      ((item.quantity || 0) * (item.amount || 0)))}
                    {item.hasDiscount && item.discountPercentage > 0 && (
                      <span className="text-sm text-green-600 ml-1">
                        (-{item.discountPercentage}%)
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mb-8">
            <div className="w-1/3">
              <p className="flex justify-between">
                <span>Subtotal:</span> <span>{formatCurrency(subTotal)}</span>
              </p>
              {taxPercentage > 0 && (
                <p className="flex justify-between">
                  <span>IVA ({taxPercentage}%):</span>{" "}
                  <span>{formatCurrency(taxAmount)}</span>
                </p>
              )}
              <p className="flex justify-between font-bold text-lg mt-2">
                <span>Total a Pagar:</span>{" "}
                <span className="text-green-600">
                  {formatCurrency(grandTotal)}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex-grow bg-green-50 overflow-auto">
          {notes && (
            <div className="p-4">
              <h3 className="text-lg font-semibold text-green-600 mb-2">
                Notas Adicionales
              </h3>
              <p>{notes}</p>
            </div>
          )}
        </div>
        <div className="p-4 text-center text-sm text-gray-600 bg-green-50">
          Esta es una factura generada por computadora y no requiere firma.
        </div>
      </div>
    </BaseTemplate>
  );
};

export default Template5;
