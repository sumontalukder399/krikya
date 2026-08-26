import React, { useState } from 'react';
import { X, User, Mail, Phone, Calendar } from 'lucide-react';
import { UserProfile } from '../../types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSave: (updated: Partial<UserProfile>) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave,
}) => {
  const [email, setEmail] = useState(user.email);
  const [fullName, setFullName] = useState(user.fullName || 'Hridoy Sonar');
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth || '1998-05-14');
  const [phoneNumber, setPhoneNumber] = useState(user.phone || '01768662245');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const response = await fetch('/api/v1/profile', { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'profile', name: fullName, phone: phoneNumber }) });
    const json = await response.json();
    if (!response.ok) { setError(json.error?.message || 'Could not update profile'); return; }
    onSave({
      email,
      fullName,
      dateOfBirth,
      phone: phoneNumber,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl overflow-hidden animate-scaleIn border border-gray-200">
        <div className="bg-[#0e5332] text-white -m-6 mb-4 p-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Edit Profile</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-emerald-200 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 mt-2 text-xs">
          {error && <p className="rounded-lg bg-red-50 p-2 text-red-600">{error}</p>}
          <div>
            <label className="block font-bold text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-[#0e5332]"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={user.username}
              disabled
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-500 cursor-not-allowed font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Date of Birth *</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-[#0e5332]"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Phone Number *</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-[#0e5332]"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Fullname</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Fill up here"
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-[#0e5332]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0e5332] hover:bg-[#0a3e25] text-white font-extrabold py-2.5 rounded-xl text-xs shadow-md transition hover:scale-101 cursor-pointer mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
