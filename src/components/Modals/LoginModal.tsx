import React, { useState } from 'react';
import { X, PlayCircle, Eye, EyeOff, Lock, User } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  onSwitchToSignUp: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onSwitchToSignUp,
}) => {
  const { language, t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError(t('login.error_required'));
      return;
    }
    setLoading(true); setError('');
    try {
      const response = await fetch('/api/v1/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: username, password }) });
      const json = await response.json(); if (!response.ok) throw new Error(json.error?.message || 'Login failed');
      onLoginSuccess(); onClose();
    } catch (error) { setError((error as Error).message); } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden animate-scaleIn border border-gray-200">
        {/* 1. Header: Emerald Green matching Screenshot 4 */}
        <div className="bg-[#2e694d] text-white px-4 py-3 flex items-center justify-between">
          <h3 className="font-bold text-sm text-white">
            {t('login.welcome')}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white transition cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Video Guide Announcement Bar (Screenshot 4) */}
        <div className="bg-[#f8f9fa] border-b border-gray-200 px-4 py-2.5 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-gray-800 leading-tight">
            {t('login.video_notice')}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => alert('Opening password reset tutorial video...')}
              className="bg-[#ff5a00] hover:bg-[#e04f00] text-white font-bold text-[11px] px-2.5 py-1 rounded-md shadow-xs transition cursor-pointer"
            >
              {t('login.watch_video')}
            </button>
            <button
              type="button"
              className="w-5 h-5 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-700 flex items-center justify-center text-[10px] cursor-pointer"
              onClick={() => {}}
            >
              ✕
            </button>
          </div>
        </div>

        {/* 3. Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-2.5 rounded-md border border-red-200">
              {error}
            </div>
          )}

          {/* Username Field */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              {t('login.username')} <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center bg-[#eef2f6] border border-gray-300 rounded-md focus-within:border-[#2e694d] focus-within:bg-white transition">
              <div className="pl-3 pr-2 text-amber-500">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                id="login-username-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t('login.username')}
                className="w-full bg-transparent px-1 py-2.5 text-xs font-semibold text-gray-800 focus:outline-hidden"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              {t('login.password')} <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center bg-[#eef2f6] border border-gray-300 rounded-md focus-within:border-[#2e694d] focus-within:bg-white transition">
              <div className="pl-3 pr-2 text-emerald-600">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="login-password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('login.password')}
                className="w-full bg-transparent px-1 py-2.5 text-xs font-semibold text-gray-800 focus:outline-hidden pr-8"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end pt-0.5">
            <button
              type="button"
              onClick={() => alert('Please contact 24/7 Live Support or use SMS Verification to recover your password.')}
              className="text-xs text-gray-600 hover:text-[#2e694d] font-medium transition cursor-pointer"
            >
              {t('login.forgot_password')}
            </button>
          </div>

          {/* Gold / Yellow Submit Button (Matching Screenshot 4) */}
          <button
            type="submit"
            disabled={loading}
            id="login-submit-btn"
            className="w-full bg-[#faa61a] hover:bg-[#e69512] text-black font-extrabold py-2.5 rounded-md text-xs sm:text-sm shadow-md transition hover:scale-101 active:scale-99 cursor-pointer tracking-wider"
          >
            {loading ? 'Signing in…' : t('login.submit_btn')}
          </button>

          {/* Footer Link: অ্যাকাউন্ট নেই? নিবন্ধন */}
          <div className="text-center pt-2 text-xs text-gray-700">
            <span>{t('login.no_account')}{' '}</span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onSwitchToSignUp();
              }}
              className="font-bold text-[#ff5a00] hover:underline cursor-pointer"
            >
              {t('login.register_link')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
