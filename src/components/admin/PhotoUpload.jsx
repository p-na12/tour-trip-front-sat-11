import React from 'react'
import { useState, useRef } from "react";
import { Upload, Camera, UserCircle2 } from "lucide-react";
import Card from './Card';
import { cx } from '../../utils/helpers';

const PhotoUpload = ({ photo, onUpload, onRemove }) => {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);
    
      const handleFiles = (files) => {
        const file = files?.[0];
        if (!file) return;
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return;
        if (file.size > 5 * 1024 * 1024) return;
        const url = URL.createObjectURL(file);
        onUpload({ url, name: file.name });
      };
    
      return (
        <Card title="Customer Photo" icon={Camera}>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
            className={cx(
              "rounded-xl border-2 border-dashed p-6 flex flex-col items-center text-center transition-colors duration-200",
              dragOver ? "border-brand bg-brand/5" : "border-gray-200 bg-gray-50/50"
            )}
          >
            <div className="w-24 h-24 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center overflow-hidden mb-4">
              {photo ? (
                <img src={photo.url} alt="Customer" className="w-full h-full object-cover" />
              ) : (
                <UserCircle2 className="w-14 h-14 text-gray-300" />
              )}
            </div>
    
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
    
            {photo ? (
              <div className="flex flex-col items-center gap-2 w-full">
                <p className="text-[13px] font-medium text-gray-700 font-body truncate max-w-[180px]">{photo.name}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="text-[12.5px] font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-white transition-colors font-body"
                  >
                    Change Photo
                  </button>
                  <button
                    type="button"
                    onClick={onRemove}
                    className="text-[12.5px] font-medium px-3 py-1.5 rounded-lg border border-red-100 text-red-600 hover:bg-red-50 transition-colors font-body"
                  >
                    Remove Photo
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="inline-flex items-center gap-2 text-[13px] font-semibold px-4 py-2 rounded-lg bg-brand text-white hover:bg-brand-hover transition-colors font-body shadow-sm"
                >
                  <Upload className="w-4 h-4" /> Upload Photo
                </button>
                <p className="text-[12.5px] text-gray-500 mt-3 font-body">or drag &amp; drop an image here</p>
              </>
            )}
          </div>
          <p className="text-[12px] text-gray-400 mt-3 text-center font-body">JPG, PNG, or WEBP &middot; Maximum size 5MB</p>
        </Card>
      )
}

export default PhotoUpload
