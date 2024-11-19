'use client';

import { AlertTriangle } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50'>
      <div
        className='bg-white bg-opacity-20 p-8 rounded-2xl max-w-sm w-full shadow-lg 
                   backdrop-filter backdrop-blur-lg border border-opacity-20 border-white
                   transition-all duration-300 ease-in-out transform hover:scale-105'
      >
        <div className='flex items-center mb-6'>
          <AlertTriangle className='text-yellow-400 w-8 h-8 mr-3' />
          <h3 className='text-2xl font-bold text-white'>Are you sure?</h3>
        </div>
        <p className='mt-2 text-gray-200 mb-6'>This action cannot be undone.</p>
        <div className='flex justify-end space-x-4'>
          <button
            className='px-4 py-2 rounded-md bg-gray-600 bg-opacity-50 text-white 
                       transition-all duration-200 ease-in-out hover:bg-opacity-70 
                       focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50'
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className='px-4 py-2 rounded-md bg-red-600 bg-opacity-70 text-white 
                       transition-all duration-200 ease-in-out hover:bg-opacity-100 
                       focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50'
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
