import React, { useState } from 'react';
import { X, Building2, CreditCard, User } from 'lucide-react';

interface AddBankAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAccount: (account: { bankName: string; holderName: string; accountNumber: string }) => void;
}

export const AddBankAccountModal: React.FC<AddBankAccountModalProps> = ({
  isOpen,
  onClose,
  onAddAccount,
}) => {
  const [bankName, setBankName] = useState('Nagad');
  const [holderName, setHolderName] = useState('Hridoy Sonar');
  const [accountNumber, setAccountNumber] = useState('01768662245');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountNumber) return;
    onAddAccount({ bankName, holderName, accountNumber });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl overflow-hidden animate-scaleIn border border-gray-200">
        <div className="bg-[#0e5332] text-white -m-6 mb-4 p-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Add Bank / Mobile Wallet</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-emerald-200 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 mt-2 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Bank / Method *</label>
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-[#0e5332]"
            >
              <option value="Nagad">Nagad (Mobile Banking)</option>
              <option value="bKash">bKash (Mobile Banking)</option>
              <option value="Rocket">Rocket (DBBL)</option>
              <option value="Upay">Upay</option>
              <option value="Dutch-Bangla Bank">Dutch-Bangla Bank Ltd</option>
              <option value="City Bank">City Bank</option>
              <option value="BRAC Bank">BRAC Bank</option>
              <option value="Islami Bank">Islami Bank Bangladesh</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Account Holder Name *</label>
            <input
              type="text"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-[#0e5332]"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Bank Account / Mobile Number *</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="e.g. 017XXXXXXXX or Account Number"
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-[#0e5332]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#ff5a00] hover:bg-[#e04f00] text-white font-extrabold py-2.5 rounded-xl text-xs shadow-md transition hover:scale-101 cursor-pointer mt-4"
          >
            Save Account
          </button>
        </form>
      </div>
    </div>
  );
};
