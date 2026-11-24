import React from 'react'
import { Pencil } from "lucide-react";

const ReviewCard = ({ title, icon: Icon, onEdit, children }) => {
  return (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                {Icon && <span className="w-7 h-7 rounded-lg bg-brand/10 text-brand flex items-center justify-center"><Icon className="w-3.5 h-3.5" /></span>}
                <h3 className="text-[14.5px] font-semibold text-gray-900 font-display">{title}</h3>
              </div>
              <button onClick={onEdit} className="flex items-center gap-1 text-[12.5px] font-medium text-brand hover:text-brand-hover font-body">
                <Pencil className="w-3.5 h-3.5" /> Edit
              </button>
            </div>
            {children}
          </div>
        )
}

export default ReviewCard
