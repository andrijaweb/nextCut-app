import React, { FC } from "react";

interface FormRowProps {
  children: React.ReactNode;
  label?: string;
  error?: string;
}

const FormRow: FC<FormRowProps> = ({ label, error, children }) => {
  return (
    <div>
      {label && (
        <label className="block text-lg font-medium mb-2.5" htmlFor={label}>
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default FormRow;
