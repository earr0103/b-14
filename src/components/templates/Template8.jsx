import React from 'react';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';

const Template8 = ({ data }) => {
  const { billTo, shipTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  return (
    <BaseTemplate data={data}>
      <div
        className="bg-gray-100 w-full h-full flex flex-col"
        style={{ margin: "0", padding: "16px" }}
      >
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Facturado a:</h3>
            <p>{billTo.name || "Nombre del Cliente"}</p>
            <p>{billTo.address || "Dirección del Cliente"}</p>
            <p><span className="font-semibold">RUC:</span> {billTo.ruc || "N/A"}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Detalles de la Factura</h3>
            <p>
              <span className="font-semibold">Factura #:</span> {invoice.number}
            </p>
            <p>
              <span className="font-semibold">Fecha de Emisión:</span>{" "}
              {invoice.date}
            </p>
            <p>
              <span className="font-semibold">Fecha de Vencimiento:</span>{" "}
              {invoice.paymentDate}
            </p>
          </div>
        </div>

        <table className="w-full mb-8">
          <thead style={{ backgroundColor: "#3C8BF6", color: "white" }}>
            <tr>
              <th className="p-2 text-left">Artículo</th>
              <th className="p-2 text-right">Cantidad</th>
              <th className="p-2 text-right">Precio</th>
              <th className="p-2 text-right">Monto</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-2">{item.name}</td>
                <td className="p-2 text-right">{item.quantity}</td>
                <td className="p-2 text-right">
                  {formatCurrency(item.amount)}
                </td>
                <td className="p-2 text-right">
                  {formatCurrency(item.quantity * item.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-8">
          <div className="w-1/2">
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
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total a Pagar:</span>
              <span style={{ color: "#3C8BF6" }}>
                {formatCurrency(grandTotal)}
              </span>
            </div>
          </div>
        </div>

        {notes && (
          <div className="mt-8 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Notas:</h3>
            <p>{notes}</p>
          </div>
        )}
        <footer className="mt-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold" style={{ color: "#3C8BF6" }}>
              Factura
            </h1>
            <div className="text-right">
              <h2 className="text-xl font-bold">{yourCompany.name}</h2>
              <p>{yourCompany.address}</p>
              <p>{yourCompany.phone}</p>
            </div>
          </div>
        </footer>
      </div>
    </BaseTemplate>
  );
};

export default Template8;
