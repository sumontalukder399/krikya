import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'bn' | 'en';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  bn: {
    // Top Nav / Header
    'nav.home': 'হোম',
    'nav.slot': 'স্লট গেম',
    'nav.cricket': 'ক্রিকেট',
    'nav.casino': 'লাইভ ক্যাসিনো',
    'nav.crash': 'ক্র্যাশ',
    'nav.table': 'টেবিল গেম',
    'nav.sports': 'স্পোর্টস',
    'nav.fishing': 'ফিশিং',
    'nav.promotion': 'অফার',
    'nav.vip': 'ভিআইপি',
    'nav.krikbet': 'ক্রিকবাজি চ্যালেঞ্জ',
    'nav.reward_store': 'রিওয়ার্ড স্টোর',
    'nav.referral': 'রেফারেল',
    'nav.affiliate': 'অ্যাফিলিয়েট',
    'nav.login': 'প্রবেশ করুন',
    'nav.signup': 'নিবন্ধন',
    'nav.logout': 'লগ আউট',
    'nav.deposit': 'ডিপোজিট',
    'nav.main_wallet': 'প্রধান ওয়ালেট',
    'nav.download_app': 'অ্যাপ ডাউনলোড',
    'nav.select_provider': 'প্রোভাইডার নির্বাচন করুন',
    'nav.currency_lang': 'মুদ্রা এবং ভাষা',

    // Modals - Login
    'login.welcome': 'KRIKYA এ স্বাগতম',
    'login.username': 'ব্যবহারকারীর নাম',
    'login.password': 'পাসওয়ার্ড',
    'login.forgot_password': 'পাসওয়ার্ড ভুলে গেছেন',
    'login.submit_btn': 'প্রবেশ করুন',
    'login.no_account': 'অ্যাকাউন্ট নেই?',
    'login.register_link': 'নিবন্ধন',
    'login.error_required': 'অনুগ্রহ করে আপনার ব্যবহারকারীর নাম এবং পাসওয়ার্ড লিখুন',

    // Modals - Register Step 1 & 2 & 3
    'register.tab_title': 'নিবন্ধন',
    'register.username': 'ব্যবহারকারীর নাম',
    'register.password': 'পাসওয়ার্ড',
    'register.confirm_password': 'পাসওয়ার্ড নিশ্চিত করুন',
    'register.next_btn': 'পরবর্তী ➔',
    'register.currency': 'মুদ্রা',
    'register.phone_number': 'মোবাইল নম্বর',
    'register.email': 'ইমেইল',
    'register.email_placeholder': 'এখানে পূরণ করুন',
    'register.referral_code': 'রেফারেল কোড',
    'register.terms_checkbox': 'আমি আইনি বয়সী এবং আমি এর সাথে একমত শর্তাবলী',
    'register.back_btn': '⬅ পেছনে',
    'register.complete_btn': 'সম্পূর্ণ ✔',
    'register.success_title': 'রেজিস্ট্রেশন সাফল্য',
    'register.success_desc': 'KRIKYA, দক্ষিণ এশিয়ার সবচেয়ে বিশ্বস্ত অনলাইন ক্রিকেট এবং ক্যাসিনো প্ল্যাটফর্মে স্বাগতম। আমরা ক্রিকেট এক্সচেঞ্জ, স্পোর্টসবুক, লাইভ ক্যাসিনো এবং স্লট গেম অফার করি। সর্বশেষ প্রচার ও খবর পেতে সোশ্যাল মিডিয়াতে KRIKYA-এর সাথে সংযুক্ত হন।',
    'register.success_redirect_notice': 'আপনার বাজি অভিজ্ঞতা শুরু করতে, আমরা আপনাকে ডিপোজিট পেজে পুনর্নির্দেশ করব। যদি এটি নির্দেশিত না হয় তবে নীচের বোতামে ক্লিক করুন।',
    'register.deposit_now_btn': 'এখনই জমা দিন',

    // Register Banner Points (Screenshot 1 & 2)

    // Home Page
    'home.announcement_title': 'গুরুত্বপূর্ণ ঘোষণা',
    'home.live_winners_title': 'Live Betting: Real Time Winners Happening Right Now',
    'home.bet_amount': 'Bet Amount :',
    'home.won': 'Won',
    'home.cricket_title': 'Top Cricket Matches & Exchange Odds',
    'home.view_all_matches': 'সব ম্যাচ দেখুন',
    'home.live_now': 'Live NOW',
    'home.date': 'তারিখ:',
    'home.bet_exchange': 'Bet Exchange',
    'home.share_now': 'এখনই শেয়ার করুন',
    'home.report': 'রিপোর্ট',
    'home.free_coins': 'ফ্রি কয়েন',
    'home.contact_us': 'যোগাযোগ করুন',

    // Profile Hub
    'profile.vip_level': 'ভিআইপি স্তর :',
    'profile.deposit_progress': 'ডিপোজিট',
    'profile.turnover_progress': 'টার্নওভার',
    'profile.upgrade_club': 'আপগ্রেড করুন Club স্তর:',
    'profile.deposit_needed': 'আমানত প্রয়োজন : ৳',
    'profile.turnover_needed': 'টার্নওভার প্রয়োজন : ৳',
    'profile.view_tier_benefits': 'টিয়ার সুবিধাগুলি দেখুন',
    'profile.main_wallet': 'প্রধান ওয়ালেট',
    'profile.funds': 'তহবিল',
    'profile.deposit': 'ডিপোজিট',
    'profile.withdrawal': 'উত্তোলন',
    'profile.claim_voucher': 'ভাউচার দাবি করুন',
    'profile.history': 'ইতিহাস',
    'profile.betting_record': 'বাজির রেকর্ড',
    'profile.turnover': 'টার্নওভার',
    'profile.transfer_record': 'স্থানান্তর রেকর্ড',
    'profile.bonus': 'বোনাস',
    'profile.transaction_record': 'লেনদেন রেকর্ড',
    'profile.redemption_record': 'রিডেম্পশন রেকর্ড',
    'profile.earn_free_coins': 'বিনামূল্যে কয়েন নিন',
    'profile.daily_checkin': 'দৈনিক চেক-ইন',
    'profile.card_mania': 'কার্ড ম্যানিয়া',
    'profile.offers_rewards': 'অফার/ পুরষ্কার নিন',
    'profile.fortune_spin': 'ফরচুন স্পিন',
    'profile.reward_store': 'পুরষ্কার দোকান',
    'profile.profile_menu': 'প্রোফাইল',
    'profile.personal_info': 'ব্যক্তিগত তথ্য',
    'profile.change_password': 'পাসওয়ার্ড পরিবর্তন করুন',
    'profile.bank_details': 'ব্যাংক বিবরণ',
    'profile.inbox_messages': 'ইনবক্স মেসেজ',
    'profile.referral': 'রেফারেল',
    'profile.contact_us': 'যোগাযোগ করুন',
    'profile.support_247': '24/7 সাপোর্ট',
    'profile.whatsapp': 'হোয়াটসঅ্যাপ',
    'profile.telegram': 'টেলিগ্রাম',
    'profile.facebook': 'ফেসবুক',
    'profile.download': 'ডাউনলোড করুন',
    'profile.download_app': 'অ্যাপ ডাউনলোড করুন',
    'profile.logout': 'লগ আউট',

    // Footer
    'footer.payment_methods': 'মূল্য পরিশোধ পদ্ধতি',
    'footer.responsible_gaming': 'Responsible Gaming',
    'footer.follow_us': 'Follow Us',
    'footer.affiliate': 'অধিভুক্ত',
    'footer.responsible': 'দায়িত্বশীল গেমিং',
    'footer.copyright': 'কপিরাইট © ২০২৬ [ ব্র্যান্ড ]। সমস্ত অধিকার সংরক্ষিত',
  },
  en: {
    // Top Nav / Header
    'nav.home': 'Home',
    'nav.slot': 'Slot Games',
    'nav.cricket': 'Cricket',
    'nav.casino': 'Live Casino',
    'nav.crash': 'Crash',
    'nav.table': 'Table Games',
    'nav.sports': 'Sportsbook',
    'nav.fishing': 'Fishing',
    'nav.promotion': 'Promotion',
    'nav.vip': 'VIP',
    'nav.krikbet': 'Krikbet Challenge',
    'nav.reward_store': 'Reward Store',
    'nav.referral': 'Referral',
    'nav.affiliate': 'Affiliate',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.logout': 'Logout',
    'nav.deposit': 'Deposit',
    'nav.main_wallet': 'Main Wallet',
    'nav.download_app': 'Download App',
    'nav.select_provider': 'Select Provider',
    'nav.currency_lang': 'Currency & Language',

    // Modals - Login
    'login.welcome': 'Welcome to KRIKYA',
    'login.username': 'Username',
    'login.password': 'Password',
    'login.forgot_password': 'Forgot Password?',
    'login.submit_btn': 'Login',
    'login.no_account': "Don't have an account?",
    'login.register_link': 'Sign Up',
    'login.error_required': 'Please enter your username and password',

    // Modals - Register Step 1 & 2 & 3
    'register.tab_title': 'Sign Up',
    'register.username': 'Username',
    'register.password': 'Password',
    'register.confirm_password': 'Confirm Password',
    'register.next_btn': 'Next ➔',
    'register.currency': 'Currency',
    'register.phone_number': 'Phone Number',
    'register.email': 'Email',
    'register.email_placeholder': 'Fill in here',
    'register.referral_code': 'Referral Code',
    'register.terms_checkbox': 'I am of legal age and I agree with the Terms and Conditions',
    'register.back_btn': '⬅ Back',
    'register.complete_btn': 'Complete ✔',
    'register.success_title': 'Registration Successful',
    'register.success_desc': "Welcome to KRIKYA, South Asia's Most Trusted Online Cricket & Casino Platform. We offer Cricket Exchange, Sportsbook, Live Casino, and Slot Games. Connect with KRIKYA on social media for the latest promotions and news.",
    'register.success_redirect_notice': 'To start your betting experience, we will redirect you to the Deposit page. If not redirected, please click the button below.',
    'register.deposit_now_btn': 'Deposit Now',

    // Register Banner Points (Screenshot 1 & 2)

    // Home Page
    'home.announcement_title': 'IMPORTANT ANNOUNCEMENT',
    'home.live_winners_title': 'Live Betting: Real Time Winners Happening Right Now',
    'home.bet_amount': 'Bet Amount :',
    'home.won': 'Won',
    'home.cricket_title': 'Top Cricket Matches & Exchange Odds',
    'home.view_all_matches': 'View All Matches',
    'home.live_now': 'Live NOW',
    'home.date': 'Date:',
    'home.bet_exchange': 'Bet Exchange',
    'home.share_now': 'Share Now',
    'home.report': 'Report',
    'home.free_coins': 'FREE COINS',
    'home.contact_us': 'CONTACT US',

    // Profile Hub
    'profile.vip_level': 'VIP Level :',
    'profile.deposit_progress': 'Deposit',
    'profile.turnover_progress': 'Turnover',
    'profile.upgrade_club': 'Upgrade to Club Level:',
    'profile.deposit_needed': 'Deposit Needed : ৳',
    'profile.turnover_needed': 'Turnover Needed : ৳',
    'profile.view_tier_benefits': 'View Tier Privileges',
    'profile.main_wallet': 'Main Wallet',
    'profile.funds': 'Funds',
    'profile.deposit': 'Deposit',
    'profile.withdrawal': 'Withdrawal',
    'profile.claim_voucher': 'Claim Voucher',
    'profile.history': 'History',
    'profile.betting_record': 'Betting Record',
    'profile.turnover': 'Turnover',
    'profile.transfer_record': 'Transfer Record',
    'profile.bonus': 'Bonus',
    'profile.transaction_record': 'Transaction Record',
    'profile.redemption_record': 'Redemption Record',
    'profile.earn_free_coins': 'Earn Free Coins',
    'profile.daily_checkin': 'Daily Check-in',
    'profile.card_mania': 'Card Mania',
    'profile.offers_rewards': 'Offers & Rewards',
    'profile.fortune_spin': 'Fortune Spin',
    'profile.reward_store': 'Reward Store',
    'profile.profile_menu': 'Profile',
    'profile.personal_info': 'Personal Info',
    'profile.change_password': 'Change Password',
    'profile.bank_details': 'Bank Details',
    'profile.inbox_messages': 'Inbox Messages',
    'profile.referral': 'Referral',
    'profile.contact_us': 'Contact Us',
    'profile.support_247': '24/7 Support',
    'profile.whatsapp': 'WhatsApp',
    'profile.telegram': 'Telegram',
    'profile.facebook': 'Facebook',
    'profile.download': 'Download',
    'profile.download_app': 'Download App',
    'profile.logout': 'Log Out',

    // Footer
    'footer.payment_methods': 'Payment Methods',
    'footer.responsible_gaming': 'Responsible Gaming',
    'footer.follow_us': 'Follow Us',
    'footer.affiliate': 'Affiliate',
    'footer.responsible': 'Responsible Gaming',
    'footer.copyright': 'Copyright © 2026 [ Brand ]. All rights reserved.',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'bn',
  setLanguage: () => {},
  t: (key: string, fallback?: string) => fallback || key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('bn');

  useEffect(() => {
    const saved = localStorage.getItem('krikya_lang');
    if (saved === 'en' || saved === 'bn') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('krikya_lang', lang);
  };

  const t = (key: string, fallback?: string): string => {
    return TRANSLATIONS[language]?.[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
