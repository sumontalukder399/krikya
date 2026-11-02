export type PageType = 
  | 'home'
  | 'slot'
  | 'cricket'
  | 'casino'
  | 'crash'
  | 'tablegames'
  | 'table'
  | 'sportsbook'
  | 'sports'
  | 'fishing'
  | 'promotion'
  | 'vip'
  | 'krikbet'
  | 'krikbet-challenge'
  | 'reward-store'
  | 'card-mania'
  | 'fortune-spin'
  | 'profile-hub'
  | 'deposit'
  | 'withdrawal'
  | 'claim-voucher'
  | 'betting-history'
  | 'turnover-history'
  | 'transfer-history'
  | 'bonus-history'
  | 'transaction-history'
  | 'redemption-history'
  | 'personal-info'
  | 'change-password'
  | 'bank-account'
  | 'bank-details'
  | 'inbox'
  | 'inbox-messages'
  | 'referral-summary'
  | 'affiliate-apply';

export interface UserProfile {
  username: string;
  isLoggedIn: boolean;
  walletBalance: number;
  balance: number;
  vipLevel: string;
  vipDepositProgress: number;
  vipDepositTarget: number;
  vipTurnoverProgress: number;
  vipTurnoverTarget: number;
  phone: string;
  email: string;
  fullName: string;
  currency: string;
  referralCode: string;
  totalReferrals: number;
  totalCommission: number;
  unreadMessagesCount: number;
}

export interface GameItem {
  id: string;
  title: string;
  category: 'slot' | 'casino' | 'crash' | 'table' | 'fishing' | 'cricket' | 'sports';
  provider: string;
  image: string;
  isHot?: boolean;
  isNew?: boolean;
  rtp?: number;
  minBet?: number;
}

export interface LiveWinner {
  id: string;
  gameTitle: string;
  gameImage: string;
  category: 'SLOTS' | 'CASINO' | 'CRASH' | 'TABLE';
  username: string;
  time: string;
  betAmount: number;
  winAmount: number;
}

export interface CricketMatch {
  id: string;
  tournament: string;
  isLive: boolean;
  team1: {
    name: string;
    flag: string;
    odds: number;
  };
  team2: {
    name: string;
    flag: string;
    odds: number;
  };
  dateText: string;
}

export interface PromotionItem {
  id: string;
  title: string;
  category: 'all' | 'slots' | 'casino' | 'sports';
  badge: string;
  image: string;
  description: string;
  reward: string;
  endDate: string;
  detailsHtml?: string;
}

export interface RewardStoreProduct {
  id: string;
  name: string;
  category: 'Top Redeem' | 'Electronics' | 'Home & Living' | 'Accessories' | 'Data Plan' | string;
  coins: number;
  costCoins?: number;
  image: string;
  brand: string;
  tag?: string;
}

export type RewardStoreItem = RewardStoreProduct & {
  costCoins: number;
};

export interface InboxMessage {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'inbox' | 'notification';
  isRead: boolean;
}

export interface ProviderItem {
  name: string;
  code: string;
  category: string;
  logo?: string;
}
