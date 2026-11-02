import React, { useState } from 'react';
import { PageType } from '../types';
import { KrikyaLogo } from './KrikyaLogo';
import { Award, Facebook, Instagram, Landmark, MessageCircle, Send, ShieldCheck, Twitter, Youtube } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps { onNavigate: (page: PageType) => void; }

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { language, t } = useLanguage();
  const socials = [
    { label: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { label: 'WhatsApp', icon: MessageCircle, href: 'https://wa.me' },
    { label: 'Telegram', icon: Send, href: 'https://t.me' },
    { label: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { label: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
    { label: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  ];

  return (
    <footer className="mt-8 bg-[#d3d3d3] pb-[calc(84px+env(safe-area-inset-bottom))] pt-9 text-[#111] lg:pb-9">
      <div className="mx-auto w-full max-w-[1240px] px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-16">
          <section>
            <h4 className="mb-3 text-[12px] font-extrabold">{t('footer.payment_methods')}</h4>
            <Landmark className="h-9 w-9 text-[#707070]" strokeWidth={1.8} />
          </section>
          <section>
            <h4 className="mb-3 text-[12px] font-extrabold">{t('footer.responsible_gaming')}</h4>
            <div className="flex h-9 items-center gap-3 text-[#707070]">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-current text-[14px] font-black">18+</div>
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#707070] text-[11px] font-black text-[#d3d3d3]">G</div>
              <div className="text-[9px] font-semibold leading-[1.05]">Be<br />Gamble<br />Aware</div>
            </div>
          </section>
          <section>
            <h4 className="mb-3 text-[12px] font-extrabold">{t('footer.follow_us')}</h4>
            <div className="flex items-center gap-1 md:gap-3">
              {socials.map(({ label, icon: Icon, href }) => (
                <a key={label} aria-label={label} href={href} target="_blank" rel="noreferrer" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[5px] bg-[#707070] text-white transition hover:bg-[#555] md:h-8 md:w-8 md:rounded-[7px]">
                  <Icon className="h-4 w-4 md:h-5 md:w-5" fill={label === 'Facebook' ? 'currentColor' : 'none'} />
                </a>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-2">
          <h3 className="text-[19px] font-black tracking-tight">Krikya Bangladesh</h3>
          <p className={`mt-4 max-w-[1210px] text-[12px] font-semibold leading-[1.55] ${isExpanded ? '' : 'line-clamp-3'}`}>
            {language === 'bn'
              ? 'Krikya বাংলাদেশে অনলাইন গেমিংয়ের জন্য আপনার নির্ভরযোগ্য গন্তব্য। স্থানীয় খেলোয়াড়দের কথা মাথায় রেখে তৈরি Krikya-তে স্পোর্টস বেটিং, ক্যাসিনো, স্লট ও লটারিসহ পছন্দের গেম নিরাপদে ও সহজে উপভোগ করা যায়। দ্রুত পেমেন্ট, সহায়ক সাপোর্ট এবং নিয়মিত নতুন গেমের মাধ্যমে অভিজ্ঞতাটি সহজ, নিরাপদ ও আনন্দদায়ক রাখা হয়।'
              : 'Krikya is your one-stop destination for online gaming in Bangladesh. Built with local players in mind, Krikya offers a fun and secure place to enjoy your favorite games. From sports betting and casino tables to slots and lotteries, everything is right here in one platform. New players can jump in easily, while experienced ones will find plenty to keep things exciting. With helpful support, fast payments, and fresh games added often, Krikya keeps the experience simple, safe, and enjoyable for everyone.'}
          </p>
          <button onClick={() => setIsExpanded((value) => !value)} className="mt-4 cursor-pointer text-[12px] font-semibold text-[#888] transition hover:text-[#238b65]">{isExpanded ? (language === 'bn' ? 'কম দেখুন' : 'Read Less') : (language === 'bn' ? 'আরও পড়ুন' : 'Read More')}</button>
        </section>

        <div className="mt-8 flex flex-col items-center justify-between gap-5 border-t border-[#b9b9b9] pt-4 md:flex-row">
          <div className="flex items-center gap-5"><KrikyaLogo size="md" showText variant="dark" /><span className="h-8 w-px bg-[#b5b5b5]" /></div>
          <div className="text-center md:text-right">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[12px] font-bold text-[#29956e] md:justify-end">
              <button onClick={() => onNavigate('affiliate-apply')} className="cursor-pointer underline underline-offset-2">{t('footer.affiliate')}</button>
              <button onClick={() => onNavigate('vip')} className="cursor-pointer underline underline-offset-2">{t('footer.responsible')}</button>
            </div>
            <p className="mt-4 text-[12px] font-medium text-[#666]">{language === 'bn' ? 'কপিরাইট © ২০২৬ Krikya। সর্বস্বত্ব সংরক্ষিত।' : 'Copyright © 2026 Krikya. All rights reserved.'}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
