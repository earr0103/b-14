import React from 'react';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';

const Template2 = ({ data }) => {
  const { billTo, shipTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 max-w-4xl mx-auto">
        <div className="flex justify-between mb-4 border-b-2 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-cyan-700">
              {yourCompany.name}
            </h1>
            <p>{yourCompany.address}</p>
            <p>{yourCompany.phone}</p>
            <p>RUC: {yourCompany.ruc}</p>
            <p>Timbrado: {yourCompany.timbrado}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold text-cyan-700">Factura Tributaria</h2>
            <p>NÚMERO DE FACTURA: {invoice.number}</p>
            <p>FECHA: {invoice.date}</p>
            <p>FECHA DE VENCIMIENTO: {invoice.paymentDate}</p>
          </div>
        </div>

        <div className="flex justify-between mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-2 text-cyan-700">Facturar A</h3>
            <p>{billTo.name}</p>
            <p>{billTo.address}</p>
            <p>{billTo.phone}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-cyan-700">Enviar A</h3>
            <p>{shipTo.name}</p>
            <p>{shipTo.address}</p>
            <p>{shipTo.phone}</p>
          </div>
        </div>

        <div className="mb-8">
          <table className="w-full border border-gray-300">
            <thead>
              <tr>
                <th className="p-2 text-left border border-gray-300">ID</th>
                <th className="p-2 text-left border border-gray-300">
                  Descripción
                </th>
                <th className="p-2 text-right border border-gray-300">
                  Cantidad
                </th>
                <th className="p-2 text-right border border-gray-300">Precio</th>
                <th className="p-2 text-right border border-gray-300">
                  Monto
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="p-2 border border-gray-300">{index + 1}</td>
                  <td className="p-2 border border-gray-300">
                    {item.name}
                    <div className="text-sm text-gray-500">
                      {item.description}
                    </div>
                  </td>
                  <td className="p-2 text-right border border-gray-300">
                    {item.quantity}
                  </td>
                  <td className="p-2 text-right border border-gray-300">
                    {formatCurrency(item.amount)}
                  </td>
                  <td className="p-2 text-right border border-gray-300">
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
        </div>

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

        {notes && (
          <div className="mt-8 text-sm">
            <h3 className="font-semibold mb-2">Notas:</h3>
            <p>{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template2;
