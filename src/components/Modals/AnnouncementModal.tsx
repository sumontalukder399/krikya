import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import { KrikyaLogo } from '../KrikyaLogo';

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnnouncementModal: React.FC<AnnouncementModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl overflow-hidden animate-scaleIn border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <KrikyaLogo size="sm" />
          <h3 className="text-base font-extrabold text-gray-800 mt-2">
            Important Announcement!
          </h3>

          <div className="my-4 p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-gray-700 leading-relaxed text-left">
            <p className="font-semibold text-amber-900 mb-1 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>BKASH Maintenance Notice</span>
            </p>
            We apologize for the inconvenience, <strong className="text-gray-900">BKASH</strong> wallet is temporarily undergoing scheduled maintenance daily between <strong>12AM - 7AM (+GMT+6)</strong>. All deposit and withdrawal under BKASH will be completed quickly as possible. You can also use <strong>Nagad-SpeedPay</strong> and <strong>Rocket</strong> for instant 30-second processing.
          </div>

          <button
            onClick={onClose}
            className="w-full bg-[#ff5a00] hover:bg-[#e04f00] text-white font-extrabold py-2.5 rounded-xl text-xs shadow-md transition hover:scale-101 cursor-pointer"
          >
            UNDERSTOOD
          </button>
        </div>
      </div>
    </div>
  );
};
