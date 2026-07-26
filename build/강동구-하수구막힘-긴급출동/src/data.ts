export type LocalArea = {
  slug: string;
  name: string;
  label: string;
  url?: string;
};

export type Review = {
  area: string;
  title: string;
  body: string;
  rating: number;
};

type SiteRuntimeConfig = {
  regionName?: string;
  regionShort?: string;
  regionInitial?: string;
  siteName?: string;
  siteDescription?: string;
  companyName?: string;
  ceoName?: string;
  businessNumber?: string;
  phone?: string;
  email?: string;
  address?: string;
  seoTitle?: string;
  seoDescription?: string;
  mainKeyword?: string;
  secondaryKeywords?: string[];
  localAreas?: LocalArea[];
  areaSpots?: string[];
  reviews?: Review[];
  builderProjectId?: string;
  assetBase?: string;
  activeArea?: string;
  canonical?: string;
};

declare global {
  interface Window {
    __SITE_CONFIG__?: SiteRuntimeConfig;
    __PINKRIBBON_DONG__?: string;
  }
}

const runtime = typeof window !== 'undefined' ? (window.__SITE_CONFIG__ || {}) : {};

export const regionName = runtime.regionName?.trim() || '지역';
export const regionShort = runtime.regionShort?.trim() || regionName.replace(/구$/, '');
export const regionInitial = runtime.regionInitial?.trim() || regionShort.charAt(0) || '긴';

const phone = runtime.phone?.trim() || '';

export const contactInfo = {
  phone,
  phoneFormatted: phone,
  phoneDisplay: phone,
  form: '#inquiry-form',
  companyName: runtime.companyName?.trim() || '하수구 해결센터',
  businessNumber: runtime.businessNumber?.trim() || '',
  address: runtime.address?.trim() || '',
  ceo: runtime.ceoName?.trim() || '',
};

export const keywords = {
  main: runtime.mainKeyword?.trim() || `${regionName}하수구막힘`,
  secondary: Array.isArray(runtime.secondaryKeywords) ? runtime.secondaryKeywords : [],
};

export const localAreas = Array.isArray(runtime.localAreas) ? runtime.localAreas : [];

export const areaSpots = Array.isArray(runtime.areaSpots) ? runtime.areaSpots : [];

export const reviews = Array.isArray(runtime.reviews) ? runtime.reviews : [];

export function assetUrl(filename: string) {
  const projectId = runtime.builderProjectId || 'gangdong-drain';
  const fallbackBase = `/plugin/onoff-builder-bridge/imports/${projectId}`;
  const base = (runtime.assetBase || fallbackBase).replace(/\/$/, '');
  return `${base}/images/${filename.replace(/^\/+/, '')}`;
}

export function localAreaUrl(area: LocalArea) {
  return area.url || `/page/local-${area.slug}.php`;
}

export function phoneCtaLabel(area = regionName) {
  if (!contactInfo.phone) return `${area} 전화상담`;
  return contactInfo.phoneFormatted;
}

export function phoneCtaSubLabel(area = regionName) {
  return `${area} 지금 전화상담`;
}

export function telHref() {
  return `tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`;
}

export function getDongFromUrl() {
  if (typeof window === 'undefined') return '';
  const activeArea = (window.__SITE_CONFIG__?.activeArea || '').trim();
  if (activeArea) return activeArea;
  const injected = (window.__PINKRIBBON_DONG__ || '').trim();
  if (injected) return injected;
  const params = new URLSearchParams(window.location.search);
  const fromQuery = (params.get('dong') || params.get('area') || '').trim();
  if (fromQuery) return fromQuery;
  const match = window.location.pathname.match(/\/page\/local-([a-z0-9-]+)\.php/i);
  if (match) {
    const found = localAreas.find((a) => a.slug === match[1]);
    if (found) return found.name;
  }
  return '';
}
