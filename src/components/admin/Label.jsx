import React from 'react';

const Label = ({ children, required }) => {
  return (
    <label className="block text-[13px] font-medium text-gray-700 mb-1.5 font-body">
      {children} {required && <span className="text-green-700">*</span>}
    </label>
  );
};

export default Label;
