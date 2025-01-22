import React from 'react';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';

const Template3 = ({ data }) => {
  const { billTo, shipTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-blue-500 text-white p-12">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="text-white inline-block">
              <h1 className="text-2xl font-bold" id="company-name">
                {yourCompany.name}
              </h1>
            </div>
            <p className="mt-2">{yourCompany.address}</p>
            <p>{yourCompany.phone}</p>
            <p>Email: {yourCompany.email}</p>
            <p>RUC: {yourCompany.ruc}</p>
            <p>Timbrado: {yourCompany.timbrado}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">FACTURADO A</h2>
            <p>{billTo.name}</p>
            <p>{billTo.address}</p>
            <p>{billTo.phone}</p>
            <p>Email: {billTo.email}</p>
            <p>RUC: {billTo.ruc}</p>
          </div>
        </div>
        <div className="rounded-lg border border-blue-500 -mt-[42px] w-[92%] mx-auto">
          <div id="item-data" className="w-full mb-8">
            <div className="bg-blue-200 flex rounded-t">
              <div className="p-2 w-12"></div>
              <div className="p-2 flex-grow text-left">
                NOMBRE/DESCRIPCIÓN DEL ARTÍCULO
              </div>
              <div className="p-2 flex-1 text-right">CANT.</div>
              <div className="p-2 flex-1 text-right">MONTO</div>
            </div>
            {items.map((item, index) => (
              <div key={index} className="flex border-t border-b">
                <div className="p-2 w-12 text-left">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="p-2 flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <div className="p-2 w-24 text-right">{item.quantity}</div>
                <div className="p-2 flex-1 text-right">
                  {formatCurrency(item.hasDiscount && item.discountPercentage ? 
                    (item.quantity * item.amount * (1 - item.discountPercentage / 100)) : 
                    (item.quantity * item.amount))}
                  {item.hasDiscount && item.discountPercentage > 0 && (
                    <span className="text-sm text-white ml-1">
                      (-{item.discountPercentage}%)
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <div className="w-2/3 p-4">
              <h3 className="text-lg font-semibold">Notas</h3>
              <p className="text-sm text-gray-600">{notes}</p>
            </div>
            <div className="w-1/3">
              <div className="flex justify-between mb-2 p-2">
                <span>Subtotal:</span>
                <span>{formatCurrency(subTotal)}</span>
              </div>
              {taxPercentage > 0 && (
                <div className="flex justify-between mb-2 p-2">
                  <span>IVA ({taxPercentage}%):</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold bg-blue-500 text-white p-2 mt-4">
                <span className="text-left">Total</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseTemplate>
  );
};

export default Template3;
