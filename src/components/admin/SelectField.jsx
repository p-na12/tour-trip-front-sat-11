import React from 'react'
import { ChevronDown } from "lucide-react";
import Label from "./Label";
import ErrorText from "./ErrorText";
import { cx } from '../../utils/helpers';

const SelectField = ({ label, required, error, children, ...props }) => {
  return (
        <div>
          <Label required={required}>{label}</Label>
          <div className="relative">
            <select
              {...props}
              className={cx(
                "w-full h-11 px-3.5 pr-9 rounded-lg border bg-white text-[14px] font-body text-gray-900 appearance-none",
                "focus:outline-none focus:ring-2 focus:ring-brand/15 focus:border-brand transition-colors",
                error ? "border-red-300" : "border-gray-200 hover:border-gray-300"
              )}
            >
              {children}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <ErrorText>{error}</ErrorText>
        </div>
      )
}

export default SelectField
