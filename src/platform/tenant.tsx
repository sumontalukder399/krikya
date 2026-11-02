'use client';

import React, { createContext, useContext } from 'react';

/** The non-secret brand settings the admin panel controls. */
export interface TenantConfig {
  name: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  sliderEnabled: boolean;
  sliderImages: { imageUrl: string; link: string | null }[];
  announcementText: string | null;
  announcementEnabled: boolean;
  social: Record<string, string>;
}

export const FALLBACK_TENANT: TenantConfig = {
  name: 'Krikya',
  logoUrl: null,
  faviconUrl: null,
  sliderEnabled: false,
  sliderImages: [],
  announcementText: null,
  announcementEnabled: false,
  social: {},
};

const TenantContext = createContext<TenantConfig>(FALLBACK_TENANT);
export const useTenant = () => useContext(TenantContext);

export const TenantProvider: React.FC<{ tenant: TenantConfig; children: React.ReactNode }> = ({ tenant, children }) => (
  <TenantContext.Provider value={tenant}>{children}</TenantContext.Provider>
);
