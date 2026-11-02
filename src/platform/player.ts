import { apiFetch, idempotencyKey, TENANT_SLUG } from './api';

export interface Game {
  id: string;
  name: string;
  provider: string;
  category: string;
  imageUrl?: string | null;
  providerLogoUrl?: string | null;
  popular?: boolean;
  featured?: boolean;
}
export interface GameQuery { category?: string; provider?: string; search?: string; page?: number; limit?: number }
export interface GamesPage { items: Game[]; total: number; page: number; limit: number; hasMore: boolean }
export interface ProviderInfo { key: string; name: string | null; logoUrl: string | null }

export interface Profile {
  id: string;
  username: string;
  displayName: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  createdAt: string;
}
export interface Wallet { walletId: string; balanceMinor: number; heldMinor: number; currency: string; status: string }

export interface PaymentMethod {
  id: string;
  name: string;
  slug: string;
  type: string;
  iconUrl: string | null;
  minDepositMinor: number;
  maxDepositMinor: number;
  minWithdrawalMinor: number;
  maxWithdrawalMinor: number;
  currency: string;
  isDepositEnabled: boolean;
  isWithdrawalEnabled: boolean;
  isGateway?: boolean;
  gatewayChannels?: Array<{ key: string; label: string }>;
}
export interface PaymentAccount {
  id: string;
  paymentMethodId: string;
  displayName: string | null;
  accountNumberMasked: string;
  accountHolderName: string | null;
  accountType: string | null;
  minLimitMinor: number;
  maxLimitMinor: number;
  instructions: string | null;
}
export interface Promotion {
  id: string;
  title: string;
  description: string;
  bannerUrl?: string | null;
  type?: string;
  bonusPercent?: number;
  rewardAmountMinor?: number;
  minDepositMinor?: number;
  wagerMultiplier?: number;
  freeSpins?: number;
  currency?: string;
  endsAt?: string | null;
}
export interface LedgerEntry {
  id: string;
  type: string;
  amountMinor: number;
  currency: string;
  status: string;
  reference: string | null;
  description: string | null;
  createdAt: string;
}
export interface Paged<T> { items: T[]; total: number; page: number; limit: number }
export interface VipTier { name: string; level: number; minDepositMinor?: number; minTurnoverMinor?: number; cashbackPercent?: number; bonusPercent?: number; withdrawalLimitMinor?: number; dedicatedManager?: boolean }
export interface Vip { current: VipTier | null; next: VipTier | null; cumulativeDepositMinor: number; cumulativeTurnoverMinor: number; tiers: VipTier[] }
export interface ReferralSummary { code: string; count: number; rewardMinor: number; currency: string; active?: boolean; signupBonusMinor?: number; refereeBonusMinor?: number }
export interface Wagering { enabled: boolean; remainingMinor: number; targetMinor: number; wageredMinor: number }
export interface Notification { id: string; title: string; message: string | null; isRead: boolean; createdAt: string }
export interface Ticket { id: string; subject: string; status: string; createdAt: string }

const qs = (params: Record<string, string | number | undefined>) => {
  const out = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== '') out.set(k, String(v));
  return out.toString();
};
const post = (body: unknown, headers?: HeadersInit): RequestInit => ({ method: 'POST', body: JSON.stringify(body), headers });

export const player = {
  // Session
  login: (identifier: string, password: string) =>
    apiFetch<{ user: { id: string } }>('/auth/login', post({ identifier, password, surface: 'public' })),
  register: (input: { username: string; password: string; phone?: string; email?: string; referralCode?: string }) =>
    apiFetch<{ user: { id: string } }>('/auth/register', post({ ...input, tenantSlug: TENANT_SLUG })),
  logout: () => apiFetch<unknown>('/auth/logout', post({ surface: 'public' })),

  // Account
  me: () => apiFetch<Profile>('/player/me'),
  updateMe: (input: { firstName?: string; lastName?: string; phone?: string; email?: string }) =>
    apiFetch<Profile>('/player/me', { method: 'PATCH', body: JSON.stringify(input) }),
  changePassword: (currentPassword: string, newPassword: string) =>
    apiFetch<{ message: string }>('/player/change-password', post({ currentPassword, newPassword })),
  wallet: () => apiFetch<Wallet>('/player/wallet'),
  vip: () => apiFetch<Vip>('/player/vip'),
  referrals: () => apiFetch<ReferralSummary>('/player/referrals/summary'),
  wagering: () => apiFetch<Wagering>('/player/wagering'),
  ledger: (params: { page?: number; limit?: number; type?: string }) =>
    apiFetch<Paged<LedgerEntry>>(`/player/ledger?${qs({ page: 1, limit: 30, ...params })}`),
  redeemCoupon: (code: string) =>
    apiFetch<{ ok: boolean; amountMinor: number; currency: string; code: string }>('/player/coupons/redeem', post({ code })),

  // Inbox and support
  notifications: async () => {
    const raw = await apiFetch<{ items?: Notification[] } | Notification[]>('/notifications?page=1&limit=30');
    return Array.isArray(raw) ? raw : raw.items ?? [];
  },
  unreadCount: () => apiFetch<{ count: number }>('/notifications/unread-count'),
  markAllRead: () => apiFetch<{ updated: number }>('/notifications/read-all', { method: 'PATCH' }),
  createTicket: (subject: string, body: string) => apiFetch<Ticket>('/player/support/tickets', post({ subject, body })),

  // Games
  games: (query: GameQuery) =>
    apiFetch<GamesPage>(`/public/games?${qs({ tenant: TENANT_SLUG, limit: 60, ...query })}`),
  providers: (category?: string) =>
    apiFetch<ProviderInfo[]>(`/public/games/providers-detailed?${qs({ tenant: TENANT_SLUG, category })}`),
  launchGame: (gameId: string) =>
    apiFetch<{ launchUrl: string; gameName: string; mode: string }>(`/player/games/${gameId}/launch`, post({ surface: 'public' })),
  /** Brings money back from a transfer-wallet provider when the player leaves a game. */
  syncGames: () => apiFetch<unknown>('/player/games/sync', { method: 'POST', keepalive: true }).catch(() => undefined),

  // Promotions
  promotions: () => apiFetch<Promotion[]>(`/public/promotions?${qs({ tenant: TENANT_SLUG })}`),

  // Cashier
  paymentMethods: (flow: 'deposit' | 'withdrawal') => apiFetch<PaymentMethod[]>(`/player/payment-methods?${qs({ type: flow })}`),
  paymentAccounts: (methodId: string, flow: 'deposit' | 'withdrawal' = 'deposit') =>
    apiFetch<PaymentAccount[]>(`/player/payment-accounts?${qs({ methodId, type: flow })}`),
  deposit: (input: { paymentMethodId: string; paymentAccountId: string; amount: number; currency: string; transactionReference: string; promotionId: string }) =>
    apiFetch<{ id: string; status: string }>('/player/deposits', post(input, { 'Idempotency-Key': idempotencyKey() })),
  startGatewayDeposit: (input: { paymentMethodId: string; amount: number; currency: string; channelKey?: string }) =>
    apiFetch<{ id: string; paymentUrl: string; status: string }>('/player/deposits/gateway', post(input, { 'Idempotency-Key': idempotencyKey() })),
  gatewayStatus: (depositId: string) =>
    apiFetch<{ id: string; status: string; creditedMinor?: number }>(`/player/deposits/${depositId}/gateway-status`),
  withdraw: (input: { paymentMethodId: string; amount: number; currency: string; accountNumber: string }) =>
    apiFetch<{ id: string; status: string }>('/player/withdrawals', post(input, { 'Idempotency-Key': idempotencyKey() })),
};
