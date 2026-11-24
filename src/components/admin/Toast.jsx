import React from 'react'
import { CheckCircle2 } from "lucide-react";

const Toast = ({ toast }) => {
  if (!toast) return null;
      return (
        <div className="fixed top-5 right-5 z-50 anim-toast">
          <div className="flex items-center gap-3 bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-3.5 pr-5">
            <span className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4.5 h-4.5" />
            </span>
            <p className="text-[13.5px] font-medium text-gray-800 font-body">{toast}</p>
          </div>
        </div>
      )
}

export default Toast
