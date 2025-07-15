// src/app/components/ConfirmationModal.tsx (ملف جديد)

"use client";

import { FC, ReactNode } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: ReactNode;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return (
    // الخلفية المعتمة
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      {/* جسم النافذة */}
      <div className="bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-md border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="text-slate-300 mb-6">
          {children}
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-white bg-slate-600 hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;