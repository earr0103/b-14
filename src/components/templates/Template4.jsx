import React from 'react';
import { format } from 'date-fns';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';

const Template4 = ({ data }) => {
  const { billTo = {}, shipTo = {}, invoice = {}, yourCompany = {}, items = [], taxPercentage = 0, taxAmount = 0, subTotal = 0, grandTotal = 0, notes = '' } = data || {};

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-purple-600 mb-4">Factura</h1>
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
              {yourCompany.name || "Nombre de la Empresa"}
            </h2>
            <p>{yourCompany.address || "Dirección de la Empresa"}</p>
            <p>{yourCompany.phone || "Teléfono de la Empresa"}</p>
            <p>RUC: {yourCompany.ruc || "RUC de la Empresa"}</p>
            <p>Timbrado: {yourCompany.timbrado || "Timbrado de la Empresa"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-semibold text-purple-600 mb-2">
              Facturado por
            </h3>
            <p>
              <strong>{yourCompany.name || "Nombre de la Empresa"}</strong>
            </p>
            <p>{yourCompany.address || "Dirección de la Empresa"}</p>
            <p>{yourCompany.phone || "Teléfono de la Empresa"}</p>
            <p>RUC: {yourCompany.ruc || "RUC de la Empresa"}</p>
            <p>Timbrado: {yourCompany.timbrado || "Timbrado de la Empresa"}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-semibold text-purple-600 mb-2">
              Facturado a
            </h3>
            <p>
              <strong>{billTo.name || "Nombre del Cliente"}</strong>
            </p>
            <p>{billTo.address || "Dirección del Cliente"}</p>
            <p><span className="font-semibold">RUC:</span> {billTo.ruc || "N/A"}</p>
          </div>
        </div>

        <table className="w-full mb-8 border border-gray-300">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-2 text-left border border-gray-300">
                Artículo #/Descripción
              </th>
              <th className="p-2 text-right border border-gray-300">Cant.</th>
              <th className="p-2 text-right border border-gray-300">Precio</th>
              <th className="p-2 text-right border border-gray-300">Monto</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="bg-gray-100">
                <td className="p-2 border border-gray-300">
                  {`${index + 1}. ${item.name || "Nombre del Artículo"}`}
                  <br />
                  <span className="text-sm text-gray-600">
                    {item.description || "Descripción del Artículo"}
                  </span>
                </td>
                <td className="p-2 text-right border border-gray-300">
                  {item.quantity || 0}
                </td>
                <td className="p-2 text-right border border-gray-300">
                  {formatCurrency(item.amount || 0)}
                </td>
                <td className="p-2 text-right border border-gray-300">
                  {formatCurrency(item.hasDiscount && item.discountPercentage ? 
                    ((item.quantity || 0) * (item.amount || 0) * (1 - item.discountPercentage / 100)) : 
                    ((item.quantity || 0) * (item.amount || 0)))}
                  {item.hasDiscount && item.discountPercentage > 0 && (
                    <span className="text-sm text-purple-600 ml-1">
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
              <>
                <p className="flex justify-between">
                  <span>IVA ({taxPercentage}%):</span> <span>{taxAmount}</span>
                </p>
              </>
            )}
            <hr className="my-2" />
            <p className="flex justify-between font-bold text-lg mt-2">
              <span>Total:</span> <span>{formatCurrency(grandTotal)}</span>
            </p>
          </div>
        </div>

        {notes && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-purple-600 mb-2">Notas</h3>
            <p>{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template4;
