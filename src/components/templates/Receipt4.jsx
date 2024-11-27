import React from 'react';

const Receipt4 = ({ data }) => {
  const { billTo, invoice, yourCompany, items, taxPercentage, footer, cashier } = data;
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="p-4 font-['Courier_New',_monospace]">
      <h2 className="text-center font-bold">{yourCompany.name}</h2>
      <p className="text-center">{yourCompany.address}</p>
      <p className="text-center">Teléfono: {yourCompany.phone}</p>
      {yourCompany.gst && (
        <p className="text-center">RUC No: {yourCompany.gst.toUpperCase()}</p>
      )}
      <hr className="my-4" />
      <div>
        <p>Número de Factura: {invoice.number}</p>
        <p>Creado Por: {data.cashier}</p>
        <p>
          Fecha y Hora: {invoice.date} {currentTime}
        </p>
      </div>
      <hr className="my-4" />
      <div>
        <h3>Facturar a:</h3>
        <p>{billTo}</p>
        <span>Lugar de suministro: Asunción-Capital</span>
      </div>
      <hr className="my-4" />
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Artículo</th>
            <th className="text-right">Cant</th>
            <th className="text-right">Precio</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <tr className="align-bottom">
                <td>{item.name}</td>
                <td className="text-right text-sm">{item.quantity}</td>
                <td className="text-right text-sm">{item.amount}</td>
              </tr>
              <tr className="align-top">
                <td colSpan="2" className="text-left text-sm pb-2">
                  Código: {item.description}
                </td>
                <td className="text-right pb-2">Total: {item.total}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <hr className="my-4" />
      <div className="flex justify-between">
        <span>Subtotal:</span>
        <span>
          ₲ {items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between">
        <span>IVA ({taxPercentage}%):</span>
        <span>
          ₲{" "}
          {(
            items.reduce((sum, item) => sum + item.total, 0) *
            (taxPercentage / 100)
          ).toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between font-bold">
        <span>TOTAL:</span>
        <span>
          ₲{" "}
          {(
            items.reduce((sum, item) => sum + item.total, 0) *
            (1 + taxPercentage / 100)
          ).toFixed(2)}
        </span>
      </div>
      <hr className="my-4" />
      <div>
        <h3 className="mb-2">Resumen de Impuestos</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left font-normal">Tipo</th>
              <th className="text-right font-normal">Tasa</th>
              <th className="text-right font-normal">Monto Total</th>
              <th className="text-right font-normal">Monto IVA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>IVA</td>
              <td className="text-right">{taxPercentage.toFixed(2)}%</td>
              <td className="text-right">
                {items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
              </td>
              <td className="text-right">
                {(
                  items.reduce((sum, item) => sum + item.total, 0) *
                  (taxPercentage / 100)
                ).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr className="my-4" />
      <p className="text-center">{footer}</p>
    </div>
  );
};

export default Receipt4;
