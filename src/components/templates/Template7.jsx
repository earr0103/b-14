import React from 'react';
import { format } from 'date-fns';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';

const Template7 = ({ data }) => {
  const { billTo = {}, shipTo = {}, invoice = {}, yourCompany = {}, items = [], taxPercentage = 0, taxAmount = 0, subTotal = 0, grandTotal = 0, notes = '' } = data || {};

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">Factura</h1>
            <p>
              <span className="font-semibold">Factura#:</span>{" "}
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
          <div className="text-right">
            <h2 className="text-2xl font-bold">
              {yourCompany.name || "Nombre de su Empresa"}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8 bg-gray-100 p-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Facturado por</h3>
            <p>{yourCompany.name || "Nombre de su Empresa"}</p>
            <p>{yourCompany.address || "Dirección de su Empresa"}</p>
            <p>{yourCompany.phone || "Teléfono de su Empresa"}</p>
            <p>RUC: {yourCompany.ruc || "RUC de su Empresa"}</p>
            <p>Timbrado: {yourCompany.timbrado || "Timbrado de su Empresa"}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Facturado a</h3>
            <p>{billTo.name || "Nombre del Cliente"}</p>
            <p>{billTo.address || "Dirección del Cliente"}</p>
            <p><span className="font-semibold">RUC:</span> {billTo.ruc || "N/A"}</p>
            <p>{billTo.phone || "Teléfono del Cliente"}</p>
          </div>
        </div>

        <table className="w-full mb-8">
          <thead style={{ backgroundColor: "#4B4B4B", color: "white" }}>
            <tr>
              <th className="p-2 text-left">Artículo #/Descripción</th>
              <th className="p-2 text-right">Cant.</th>
              <th className="p-2 text-right">Precio</th>
              <th className="p-2 text-right">Monto</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
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
                    <span className="text-sm text-gray-500 ml-1">
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
              <span>Total:</span> <span>{formatCurrency(grandTotal)}</span>
            </p>
          </div>
        </div>

        {notes && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Términos:</h3>
            <p>{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template7;
