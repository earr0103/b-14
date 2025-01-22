import React from 'react';
import { Button } from "./ui/button";
import { Trash2, Wand2 } from "lucide-react";

const FormHeader = ({ onClear, onFillDummy }) => {
  return (
    <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 p-4 shadow-sm">
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={onClear}
        >
          <Trash2 className="w-4 h-4" />
          Clear Form
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={onFillDummy}
        >
          <Wand2 className="w-4 h-4" />
          Fill Dummy Data
        </Button>
      </div>
    </div>
  );
};

export default FormHeader;