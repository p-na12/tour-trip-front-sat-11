import React from 'react';
import { ArrowLeft, Save, X } from 'lucide-react';

export default function CategoryHeader({ onSave, onCancel }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
            <span>Manage Masters</span>
            <span>/</span>
            <span>Categories</span>
            <span>/</span>
            <span className="text-gray-700 font-medium">Create Category</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Category</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          type="button"
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-hover transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Category
        </button>
      </div>
    </div>
  );
}