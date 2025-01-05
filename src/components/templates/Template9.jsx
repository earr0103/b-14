import React from 'react';
import { format } from 'date-fns';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';

const Template9 = ({ data }) => {
  const { billTo = {}, shipTo = {}, invoice = {}, yourCompany = {}, items = [], taxPercentage = 0, taxAmount = 0, subTotal = 0, grandTotal = 0, notes = '' } = data || {};

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-orange-600 mb-2">Factura</h1>
            <h2 className="text-xl font-bold">
              {yourCompany.name || "Nombre de su Empresa"}
            </h2>
            <p>{yourCompany.address || "Dirección de la Empresa"}</p>
            <p>{yourCompany.phone || "Teléfono de la Empresa"}</p>
            <p>RUC: {yourCompany.ruc || "RUC de la Empresa"}</p>
            <p>Timbrado: {yourCompany.timbrado || "Timbrado de la Empresa"}</p>
          </div>
          <div className="text-right">
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
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-orange-50 p-4 rounded">
            <h3 className="text-lg font-semibold text-orange-600 mb-2">
              Facturado por
            </h3>
            <p>{yourCompany.name || "Nombre de su Empresa"}</p>
            <p>{yourCompany.address || "Dirección de su Empresa"}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded">
            <h3 className="text-lg font-semibold text-orange-600 mb-2">
              Facturado a
            </h3>
            <p>{billTo.name || "Nombre del Cliente"}</p>
            <p>{billTo.address || "Dirección del Cliente"}</p>
            <p><span className="font-semibold">RUC:</span> {billTo.ruc || "N/A"}</p>
          </div>
        </div>

        <div className="w-full mb-8 overflow-hidden rounded-lg border border-orange-50">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-orange-600 text-white">
                <tr>
                  <th className="p-2 text-left">Artículo #/Descripción</th>
                  <th className="p-2 text-right">Cant.</th>
                  <th className="p-2 text-right">Precio</th>
                  <th className="p-2 text-right">Monto</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="bg-orange-50">
                    <td className="p-2">{item.name || "Nombre del Artículo"}</td>
                    <td className="p-2 text-right">{item.quantity || 0}</td>
                    <td className="p-2 text-right">
                      {formatCurrency(item.amount || 0)}
                    </td>
                    <td className="p-2 text-right">
                      {formatCurrency(
                        item.hasDiscount && item.discountPercentage ? 
                        ((item.quantity || 0) * (item.amount || 0) * (1 - item.discountPercentage / 100)) : 
                        ((item.quantity || 0) * (item.amount || 0))
                      )}
                      {item.hasDiscount && item.discountPercentage > 0 && (
                        <span className="text-sm text-orange-600 ml-1">
                          (-{item.discountPercentage}%)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end mb-8">
          <div className="w-1/2 bg-orange-50 p-3 rounded-lg">
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
            <div className="flex justify-between font-bold text-lg mt-2 text-orange-600">
              <span>Total:</span>
              <span className="text-orange-600">
                {formatCurrency(grandTotal)}
              </span>
            </div>
          </div>
        </div>
        {notes && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-orange-600 mb-2">
              Observaciones
            </h3>
            <p>{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template9;
