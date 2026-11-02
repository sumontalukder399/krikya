import { cache } from 'react';
import { API_BASE_URL, TENANT_SLUG } from './api';
import { FALLBACK_TENANT, type TenantConfig } from './tenant';

/** Brand settings for this render. A failure keeps the site up with its own defaults. */
export const getTenant = cache(async (): Promise<TenantConfig> => {
  try {
    const res = await fetch(`${API_BASE_URL}/public/tenant/resolve?slug=${encodeURIComponent(TENANT_SLUG)}`, { next: { revalidate: 60 } });
    const body = await res.json();
    return body?.success && body.data ? { ...FALLBACK_TENANT, ...body.data } : FALLBACK_TENANT;
  } catch {
    return FALLBACK_TENANT;
  }
});
