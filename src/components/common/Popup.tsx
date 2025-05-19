import React from 'react';
import { X } from 'lucide-react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-xl">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <div className="flex-1"></div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Chiudi"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-8 flex items-center justify-center">
          <h2 className="text-3xl font-bold text-center dark:text-white">PROGETTO SEME</h2>
        </div>
      </div>
    </div>
  );
};

export default Popup;