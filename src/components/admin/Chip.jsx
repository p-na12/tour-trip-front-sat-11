import React from 'react'
import { cx } from '../../utils/helpers'

const Chip = ({ active, onClick, children }) => {
  return (
          <button
            type="button"
            onClick={onClick}
            className={cx(
              "px-3.5 py-2 rounded-lg text-[13px] font-medium font-body border transition-all duration-150",
              active
                ? "bg-brand border-brand text-white shadow-sm"
                : "bg-white border-gray-200 text-gray-600 hover:border-brand/40 hover:text-brand"
            )}
          >
            {children}
          </button>
        )
}

export default Chip
