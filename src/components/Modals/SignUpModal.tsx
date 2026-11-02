import React, { useEffect, useState } from 'react';
import { X, PlayCircle, Check, ArrowRight, ArrowLeft, ShieldCheck, ChevronDown, CheckCircle2 } from 'lucide-react';
import { KrikyaLogo } from '../KrikyaLogo';
import { useLanguage } from '../../context/LanguageContext';
import { errorMessage } from '../../platform/api';
import { player, type Promotion } from '../../platform/player';
import { useTenant } from '../../platform/tenant';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUpSuccess: (userData: { username: string; phone: string; email: string }) => void;
  onSwitchToLogin: () => void;
  onNavigateToDeposit?: () => void;
}

export const SignUpModal: React.FC<SignUpModalProps> = ({
  isOpen,
  onClose,
  onSignUpSuccess,
  onSwitchToLogin,
  onNavigateToDeposit,
}) => {
  const { language, t } = useLanguage();
  const tenant = useTenant();
  const [promos, setPromos] = useState<Promotion[]>([]);
  const [step, setStep] = useState<1 | 2>(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [currency, setCurrency] = useState('BDT');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    const invitedBy = new URLSearchParams(window.location.search).get('ref');
    if (invitedBy) setReferralCode(invitedBy);
    player.promotions().then(setPromos).catch(() => setPromos([]));
  }, []);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setError(language === 'bn' ? 'অনুগ্রহ করে সব প্রয়োজনীয় ঘর পূরণ করুন' : 'Please fill all required fields');
      return;
    }
    if (password !== confirmPassword) {
      setError(language === 'bn' ? 'পাসওয়ার্ড দুটি মিলছে না' : 'Passwords do not match');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      setError(language === 'bn' ? 'অনুগ্রহ করে মোবাইল নম্বর প্রদান করুন' : 'Please provide mobile number');
      return;
    }
    if (!agreeTerms) {
      setError(language === 'bn' ? 'অনুগ্রহ করে শর্তাবলীতে সম্মতি প্রদান করুন' : 'Please accept the terms and conditions');
      return;
    }
    setError('');
    setShowSuccessModal(true);
  };

  const handleFinishRegistration = async () => {
    setError('');
    try {
      await player.register({
        username: username.trim(),
        password,
        phone: `+880${phoneNumber.replace(/^0+/, '')}`,
        ...(email.trim() ? { email: email.trim() } : {}),
        ...(referralCode.trim() ? { referralCode: referralCode.trim() } : {}),
      });
      onSignUpSuccess({ username, phone: `+880${phoneNumber}`, email });
      setShowSuccessModal(false);
      onClose();
      if (onNavigateToDeposit) onNavigateToDeposit();
    } catch (err) {
      setShowSuccessModal(false);
      setError(errorMessage(err, 'Registration failed. Please try again.'));
    }
  };

  return (
    <>
      {/* Registration Steps 1 & 2 Main Modal (Matching Screenshots 1 & 2) */}
      {!showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-[960px] bg-white rounded-xl shadow-2xl overflow-hidden border-2 md:border-4 border-[#2e694d] my-auto">
            {/* Main Content Grid: Left Form & Right Promotional Artwork */}
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
              {/* Left Form Section */}
              <div className="order-2 flex flex-col justify-between bg-white p-5 sm:p-6 md:order-1 md:col-span-5">
                <div>
                  {/* Active Tab: নিবন্ধন (Orange Underlined) */}
                  <div className="border-b border-gray-200 mb-5">
                    <div className="inline-block pb-2 border-b-2 border-[#ff5a00] text-[#ff5a00] font-black text-sm tracking-wide">
                      {t('register.tab_title')}
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 bg-red-50 text-red-600 text-xs p-2.5 rounded-md border border-red-200">
                      {error}
                    </div>
                  )}

                  {/* STEP 1 (Screenshot 1) */}
                  {step === 1 && (
                    <form onSubmit={handleNextStep} className="space-y-4">
                      {/* Username */}
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1.5">
                          {t('register.username')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full bg-[#e9ecef] border border-gray-300 rounded-md px-3 py-2 text-xs font-medium text-gray-900 focus:bg-white focus:outline-hidden focus:border-[#2e694d] transition"
                          required
                        />
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1.5">
                          {t('register.password')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-[#e9ecef] border border-gray-300 rounded-md px-3 py-2 text-xs font-medium text-gray-900 focus:bg-white focus:outline-hidden focus:border-[#2e694d] transition"
                          required
                        />
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1.5">
                          {t('register.confirm_password')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full bg-[#e9ecef] border border-gray-300 rounded-md px-3 py-2 text-xs font-medium text-gray-900 focus:bg-white focus:outline-hidden focus:border-[#2e694d] transition"
                          required
                        />
                      </div>

                      {/* Next Button (Green bg-[#2e694d] matching Screenshot 1) */}
                      <button
                        type="submit"
                        className="w-full mt-4 bg-[#2e694d] hover:bg-[#23533c] text-white font-bold py-2.5 rounded-md text-xs sm:text-sm flex items-center justify-center gap-1 shadow-md transition cursor-pointer"
                      >
                        <span>{t('register.next_btn')}</span>
                      </button>
                    </form>
                  )}

                  {/* STEP 2 (Screenshot 2) */}
                  {step === 2 && (
                    <form onSubmit={handleComplete} className="space-y-3.5">
                      {/* Currency */}
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1">
                          {t('register.currency')} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={currency}
                            readOnly
                            className="w-full bg-[#e9ecef] border border-gray-300 rounded-md px-3 py-2 text-xs font-bold text-gray-700 cursor-not-allowed"
                          />
                          <ChevronDown className="w-4 h-4 absolute right-3 top-2.5 text-gray-500 pointer-events-none" />
                        </div>
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1">
                          {t('register.phone_number')} <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-1.5">
                          <div className="bg-[#e9ecef] border border-gray-300 rounded-md px-2.5 py-2 text-xs font-bold text-gray-800 flex items-center gap-1">
                            <span>+880</span>
                            <ChevronDown className="w-3 h-3 text-gray-500" />
                          </div>
                          <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="1768662245"
                            className="flex-1 bg-[#e9ecef] border border-gray-300 rounded-md px-3 py-2 text-xs font-medium text-gray-900 focus:bg-white focus:outline-hidden focus:border-[#2e694d] transition"
                            required
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1">
                          {t('register.email')}
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t('register.email_placeholder')}
                          className="w-full bg-[#e9ecef] border border-gray-300 rounded-md px-3 py-2 text-xs font-medium text-gray-900 focus:bg-white focus:outline-hidden focus:border-[#2e694d] transition"
                        />
                      </div>

                      {/* Referral Code */}
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1">
                          {t('register.referral_code')}
                        </label>
                        <input
                          type="text"
                          value={referralCode}
                          onChange={(e) => setReferralCode(e.target.value)}
                          className="w-full bg-[#e9ecef] border border-gray-300 rounded-md px-3 py-2 text-xs font-medium text-gray-900 focus:bg-white focus:outline-hidden focus:border-[#2e694d] transition"
                        />
                      </div>

                      {/* Terms Checkbox (Screenshot 2) */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          id="agree-terms-checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="rounded text-[#2e694d] focus:ring-emerald-500 cursor-pointer w-3.5 h-3.5"
                          required
                        />
                        <label htmlFor="agree-terms-checkbox" className="text-[11px] text-gray-700 leading-tight select-none cursor-pointer">
                          {t('register.terms_checkbox')}
                        </label>
                      </div>

                      {/* Step 2 Action Buttons (Back & Complete matching Screenshot 2) */}
                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="flex-1 bg-[#2e694d] hover:bg-[#23533c] text-white font-bold py-2 rounded-md text-xs flex items-center justify-center gap-1 shadow-xs transition cursor-pointer"
                        >
                          <span>{t('register.back_btn')}</span>
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-[#2e694d] hover:bg-[#23533c] text-white font-bold py-2 rounded-md text-xs flex items-center justify-center gap-1 shadow-xs transition cursor-pointer"
                        >
                          <span>{t('register.complete_btn')}</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Bottom Switch to Login Link */}
                <div className="mt-4 pt-3 border-t border-gray-100 text-center text-xs text-gray-600">
                  <span>{t('login.no_account') === 'অ্যাকাউন্ট নেই?' ? 'ইতোমধ্যে অ্যাকাউন্ট আছে?' : 'Already have an account?'}{' '}</span>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSwitchToLogin();
                    }}
                    className="font-bold text-[#ff5a00] hover:underline cursor-pointer"
                  >
                    {t('nav.login')}
                  </button>
                </div>
              </div>

              {/* Right Side: Exact Promotional Artwork from Screenshots 1 & 2 */}
              <div className="relative order-1 flex flex-col justify-between overflow-hidden border-b border-emerald-800/40 bg-[#072a1a] p-5 text-white sm:p-6 md:order-2 md:col-span-7 md:border-b-0 md:border-l">
                {/* Top Promo Hero Header with Artwork */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h2 className="text-base sm:text-lg font-black text-[#ffb700] leading-tight">
                        {tenant.name}
                      </h2>
                    </div>

                    {/* Artwork Graphic (Dealer girl, lucky spin wheel, aviator jet) */}
                    <div className="w-24 h-20 sm:w-28 sm:h-24 shrink-0 relative">
                      <img
                        src="/banners/casino-gold.png"
                        alt="Promo visual"
                        className="w-full h-full object-cover rounded-lg border border-amber-400/40 shadow-md"
                      />
                      <div className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase">
                        HOT
                      </div>
                    </div>
                  </div>

                  {/* The brand's live promotions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2.5 mt-4 text-[11px] font-semibold text-gray-100">
                    {promos.slice(0, 8).map((promo) => (
                      <div key={promo.id} className="flex items-start gap-2 bg-white/5 p-2 rounded-lg border border-white/10">
                        <span className="w-5 h-5 rounded-full bg-amber-500 text-black font-black text-[10px] flex items-center justify-center shrink-0">৳</span>
                        <span className="leading-tight text-amber-200">{promo.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtle background aura */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-600/20 rounded-full blur-2xl pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Registration Success Popup (Exact as in Screenshot 3!) */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden animate-scaleIn border border-gray-200">
            {/* Emerald Green Header Bar with Logo and Close X */}
            <div className="bg-[#2e694d] text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KrikyaLogo size="sm" variant="white" showText={true} />
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  onClose();
                }}
                className="text-white/80 hover:text-white transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 text-center">
              {/* Orange Checkmark Circle (Exact from Screenshot 3) */}
              <div className="w-14 h-14 rounded-full bg-[#ff5a00] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              {/* Title: রেজিস্ট্রেশন সাফল্য */}
              <h3 className="font-extrabold text-base text-gray-900 mb-2">
                {t('register.success_title')}
              </h3>

              {/* Description */}
              <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed text-justify mb-4">
                {t('register.success_desc')}
              </p>

              {/* Step Indicators: (1) (2) (✔) */}
              <div className="flex items-center justify-center gap-3 my-4">
                <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 font-bold text-xs flex items-center justify-center">
                  1
                </div>
                <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 font-bold text-xs flex items-center justify-center">
                  2
                </div>
                <div className="w-6 h-6 rounded-full bg-[#2e694d] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              {/* Deposit Redirection Notice */}
              <p className="text-[11px] text-gray-500 leading-normal mb-5">
                {t('register.success_redirect_notice')}
              </p>

              {/* Deposit Now Green Button (Screenshot 3) */}
              <button
                type="button"
                onClick={handleFinishRegistration}
                className="w-full bg-[#2e694d] hover:bg-[#23533c] text-white font-bold py-2.5 rounded-md text-sm shadow-md transition hover:scale-101 cursor-pointer"
              >
                {t('register.deposit_now_btn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
