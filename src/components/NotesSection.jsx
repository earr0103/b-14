import React from 'react';
import { RefreshCw } from "lucide-react";

const NotesSection = ({ notes, setNotes, refreshNotes }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <h3 className="text-lg font-medium">Notas</h3>
        <button
          type="button"
          onClick={refreshNotes}
          className="ml-2 p-1 rounded-full hover:bg-gray-200"
          title="Actualizar notas"
        >
          <RefreshCw size={16} />
        </button>
      </div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full p-2 border rounded"
        rows="4"
      ></textarea>
    </div>
  );
};

export default NotesSection;