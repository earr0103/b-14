import React from 'react';
import { FiEdit, FiFileText, FiTrash2 } from "react-icons/fi";

const FormHeader = ({ onClear, onFillDummy, onNavigateToReceipt }) => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center">Generador de Facturas</h1>
      <div className="fixed top-4 left-4 flex gap-2">
        <button
          onClick={onClear}
          className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600"
          aria-label="Limpiar Formulario"
        >
          <FiTrash2 size={24} />
        </button>
        <button
          onClick={onFillDummy}
          className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600"
          aria-label="Llenar con Datos de Ejemplo"
        >
          <FiEdit size={24} />
        </button>
      </div>
      <button
        onClick={onNavigateToReceipt}
        className="fixed top-4 right-4 bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600"
        aria-label="Cambiar a Recibo"
      >
        <FiFileText size={24} />
      </button>
    </>
  );
};

export default FormHeader;