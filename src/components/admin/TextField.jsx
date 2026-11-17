import React from 'react'
import Label from './Label';
import ErrorText from './ErrorText';
import { cx } from '../../utils/helpers';

const TextField = ({ label, required, error, ...props }) => {
  return (
    <div>
      <Label required={required}>{label}</Label>

      <input
        {...props}
        className={cx(
          "w-full h-11 px-3.5 rounded-lg border bg-white text-[14px] font-body text-gray-900 placeholder:text-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-brand/15 focus:border-brand transition-colors",
          error
            ? "border-red-300"
            : "border-gray-200 hover:border-gray-300"
        )}
      />

      <ErrorText>{error}</ErrorText>
    </div>
  );
}

export default TextField
