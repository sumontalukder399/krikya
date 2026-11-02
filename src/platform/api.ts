/**
 * Platform API client: the backend's `{success, message, data}` envelope, httpOnly
 * cookie auth, and one refresh-and-retry on a 401. Tokens never reach page JS.
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.superparibet.com/api/v1';
export const TENANT_SLUG = process.env.NEXT_PUBLIC_TENANT_SLUG ?? 'krikya';

/** Pins the backend to the player's cookie, since dashboards share this API host. */
const SURFACE = { 'X-Auth-Surface': 'public' } as const;

export class ApiError extends Error {
  constructor(message: string, readonly status: number, readonly code: string) {
    super(message);
    this.name = 'ApiError';
  }
}

/** What to show for a failed request: the server's reason, or that it never got there. */
export function errorMessage(err: unknown, fallback = 'Something went wrong. Please try again.'): string {
  if (err instanceof ApiError) return err.message;
  if (err instanceof TypeError) return "Can't reach the server. Check your connection and try again.";
  return fallback;
}

let refreshing: Promise<boolean> | null = null;
function refreshSession(): Promise<boolean> {
  refreshing ??= fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...SURFACE },
    body: JSON.stringify({ surface: 'public' }),
  })
    .then((res) => res.ok)
    .catch(() => false)
    .finally(() => { refreshing = null; });
  return refreshing;
}

// A 401 from these is the answer itself. /auth/me is deliberately not here.
const NO_REFRESH = new Set(['/auth/login', '/auth/register', '/auth/refresh', '/auth/logout']);

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const send = () =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...SURFACE, ...(options.headers ?? {}) },
      credentials: 'include',
    });

  let res = await send();
  if (res.status === 401 && !NO_REFRESH.has(endpoint.split('?')[0]) && (await refreshSession())) res = await send();

  const body = (await res.json().catch(() => null)) as
    | { success: true; data: T }
    | { success: false; message?: string; errorCode?: string }
    | null;
  if (!res.ok || !body || body.success === false) {
    const failure = body as { message?: string; errorCode?: string } | null;
    throw new ApiError(failure?.message ?? 'Request failed', res.status, failure?.errorCode ?? 'REQUEST_FAILED');
  }
  return body.data;
}

/** Keys a money request so a double click or a retry cannot act twice. */
export function idempotencyKey(): string {
  return crypto.randomUUID();
}
