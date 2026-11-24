import React from 'react'
import { cx } from '../../utils/helpers'

const Card = ({ title, subtitle, icon: Icon, children, className }) => {
   return (
    <div
      className={cx(
        "bg-white rounded-xl border border-gray-100 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_1px_3px_rgba(16,24,40,0.06)] p-6",
        className
      )}
    >
      {title && (
        <div className="flex items-center gap-2.5 mb-5">
          {Icon && (
            <span className="w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4" />
            </span>
          )}

          <div>
            <h3 className="text-[15px] font-semibold text-gray-900 font-display">
              {title}
            </h3>

            {subtitle && (
              <p className="text-[12.5px] text-gray-500 font-body">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {children}
    </div>
  )
}

export default Card
