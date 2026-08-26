'use client';

import React, { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import { Check, Copy, Gift, Megaphone, Share2 } from 'lucide-react';
import { PageType, UserProfile } from '../types';

interface ReferralProgramProps {
  user: UserProfile;
  onNavigate: (page: PageType) => void;
  onOpenLogin: () => void;
}

export function ReferralProgram({ user, onNavigate, onOpenLogin }: ReferralProgramProps) {
  const [qrImage, setQrImage] = useState('');
  const [copied, setCopied] = useState(false);
  const code = user.referralCode;
  const referralLink = useMemo(() => {
    if (!code) return '';
    const origin = typeof window === 'undefined' ? 'https://krikya11.club' : window.location.origin;
    return `${origin}/?ref=${encodeURIComponent(code)}`;
  }, [code]);

  useEffect(() => {
    if (!user.isLoggedIn || !referralLink) {
      setQrImage('');
      return;
    }
    let active = true;
    void QRCode.toDataURL(referralLink, {
      width: 360,
      margin: 2,
      errorCorrectionLevel: 'H',
      color: { dark: '#07120d', light: '#ffffff' },
    }).then((url) => active && setQrImage(url));
    return () => { active = false; };
  }, [referralLink, user.isLoggedIn]);

  const copy = async (value: string) => {
    await navigator.clipboard?.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: 'Join me on KRIKYA', text: `Use my referral code ${code}`, url: referralLink }).catch(() => undefined);
      return;
    }
    await copy(referralLink);
  };

  return (
    <section className="mx-auto mt-3 max-w-[1240px] px-2 sm:px-4 lg:mt-0">
      <h3 className="mb-1 text-[16px] font-bold text-gray-950">Referral Program</h3>

      <div className={`relative overflow-hidden bg-[#00251f] text-white shadow-xl ${user.isLoggedIn ? 'min-h-[350px] sm:min-h-[400px] lg:min-h-[350px]' : ''}`}>
        {user.isLoggedIn && <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_45%,rgba(0,220,116,.48),transparent_34%),radial-gradient(circle_at_75%_10%,rgba(0,145,102,.22),transparent_38%),linear-gradient(105deg,#004c34_0%,#002922_42%,#001f1e_100%)]" />
          <div className="absolute -left-16 top-12 h-52 w-52 rounded-full border border-emerald-300/20 bg-emerald-300/10 blur-2xl" />
          <Gift className="absolute left-3 bottom-1 h-16 w-16 -rotate-12 fill-amber-400 text-orange-600 drop-shadow-xl sm:h-20 sm:w-20" />
          <Megaphone className="absolute -right-5 bottom-3 h-28 w-28 rotate-[-18deg] fill-lime-400 text-emerald-950 drop-shadow-[0_8px_8px_rgba(0,0,0,.45)] sm:right-2 sm:h-32 sm:w-32" />
          <div className="absolute right-2 top-[-25px] h-20 w-20 rounded-full bg-gradient-to-br from-sky-200 to-blue-700 opacity-70 shadow-xl" />
        </>}

        {!user.isLoggedIn ? (
          <button
            type="button"
            onClick={onOpenLogin}
            aria-label="Log in to share your referral link"
            className="relative z-10 block w-full cursor-pointer overflow-hidden bg-[#00251f] text-left"
          >
            <img
              src="/banners/refer_desktop.webp"
              alt="KRIKYA Weekly Paycheck referral program"
              className="block h-auto w-full object-contain"
            />
          </button>
        ) : (
          <div className="relative z-10 grid min-h-[350px] items-center gap-7 px-4 py-6 sm:px-8 lg:grid-cols-[55%_45%] lg:px-[6%]">
            <div className="rounded-md bg-white/75 p-4 text-[#071b17] shadow-2xl backdrop-blur-md sm:p-6">
              <div className="grid items-center gap-5 sm:grid-cols-[200px_1fr]">
                <div className="mx-auto flex aspect-square w-[180px] items-center justify-center bg-white p-1 shadow-sm sm:w-[190px]">
                  {qrImage ? <img src={qrImage} alt={`Referral QR code for ${code}`} className="h-full w-full" /> : <div className="h-full w-full animate-pulse bg-slate-200" />}
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-bold">Referral Code <span className="text-red-500">*</span></label>
                  <div className="flex h-10 items-center rounded border border-slate-500 bg-[#b9c5c1] px-3">
                    <span className="min-w-0 flex-1 truncate font-mono font-black text-slate-700">{code}</span>
                    <button onClick={() => copy(code)} aria-label="Copy referral code" className="p-1 text-slate-700">{copied ? <Check className="h-5 w-5 text-emerald-700" /> : <Copy className="h-5 w-5" />}</button>
                  </div>
                  <label className="block text-sm font-bold">Today Commission <span className="text-red-500">*</span></label>
                  <div className="flex h-10 items-center rounded border border-slate-500 bg-[#b9c5c1] px-3 font-mono font-bold text-slate-600">{user.todayCommission?.toFixed(2) || '0'}</div>
                  <button onClick={share} className="flex h-10 w-full items-center justify-center gap-2 rounded bg-[#ff6500] font-bold text-white transition hover:bg-[#e85b00]"><Share2 className="h-5 w-5" /> Share Now</button>
                  <button onClick={() => onNavigate('referral-summary')} className="h-10 w-full rounded bg-[#001d23] font-bold text-white transition hover:bg-[#073641]">Referral Report</button>
                </div>
              </div>
            </div>
            <div className="hidden text-center lg:block lg:pr-10">
              <p className="text-2xl font-black italic text-yellow-300">Same Invite. <span className="text-white">Half the Effort.</span></p>
              <p className="text-2xl font-black italic text-white">Double the <span className="text-yellow-300">Reward.</span></p>
              <h2 className="mt-4 text-4xl font-black leading-tight text-[#ff8a00]">Share once. Get paid<br />every weekly.</h2>
              <button onClick={share} className="mt-6 rounded-full border-4 border-amber-300 bg-gradient-to-b from-[#ffad13] to-[#ff6500] px-9 py-2 text-xl font-black italic text-[#151515] shadow-[0_4px_0_#e34d00]">Share Now!</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
