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

export type PageFaq = {
  q: string;
  a: string;
};

export type HowToStep = {
  name: string;
  text: string;
};

export type ServiceHub = LocalArea & {
  hero_line?: string;
  intro?: string;
};

export type CaseStudy = {
  subject: string;
  category?: string;
  area?: string;
  href?: string;
  summary?: string;
  thumb?: string;
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
  neighborAreas?: LocalArea[];
  serviceHubs?: ServiceHub[];
  areaSpots?: string[];
  reviews?: Review[];
  caseStudies?: CaseStudy[];
  homeFaqs?: PageFaq[];
  howToSteps?: HowToStep[];
  howToName?: string;
  siteDefinition?: string;
  builderProjectId?: string;
  assetBase?: string;
  activeArea?: string;
  canonical?: string;
  pageIntro?: string;
  heroLine?: string;
  pageFaqs?: PageFaq[];
  serviceName?: string;
};

declare global {
  interface Window {
    __SITE_CONFIG__?: SiteRuntimeConfig;
    __PINKRIBBON_DONG__?: string;
  }
}

const runtime = typeof window !== 'undefined' ? (window.__SITE_CONFIG__ || {}) : {};

export const regionName = runtime.regionName?.trim() || '강동구';
export const regionShort = runtime.regionShort?.trim() || regionName.replace(/구$/, '').replace(/시$/, '');
export const regionInitial = runtime.regionInitial?.trim() || '원';

const phone = runtime.phone?.trim() || '';

export const contactInfo = {
  phone,
  phoneFormatted: phone,
  phoneDisplay: phone,
  form: '#inquiry-form',
  companyName: runtime.companyName?.trim() || '원진하수구',
  siteName: runtime.siteName?.trim() || '원진하수구',
  businessNumber: runtime.businessNumber?.trim() || '',
  address: runtime.address?.trim() || '',
  ceo: runtime.ceoName?.trim() || '',
};

export const keywords = {
  main: runtime.mainKeyword?.trim() || `${regionName}하수구청소`,
  secondary: Array.isArray(runtime.secondaryKeywords) ? runtime.secondaryKeywords : [],
};

export const localAreas = Array.isArray(runtime.localAreas) ? runtime.localAreas : [];
export const neighborAreas = Array.isArray(runtime.neighborAreas) ? runtime.neighborAreas : [];
export const serviceHubs = Array.isArray(runtime.serviceHubs) ? runtime.serviceHubs : [];
export const areaSpots = Array.isArray(runtime.areaSpots) ? runtime.areaSpots : [];
export const reviews = Array.isArray(runtime.reviews) ? runtime.reviews : [];
export const caseStudies = Array.isArray(runtime.caseStudies) ? runtime.caseStudies : [];
export const pageIntro = runtime.pageIntro?.trim() || '';
export const heroLine = runtime.heroLine?.trim() || '';
export const pageFaqs = Array.isArray(runtime.pageFaqs) ? runtime.pageFaqs : [];
export const homeFaqs = Array.isArray(runtime.homeFaqs) ? runtime.homeFaqs : [];
export const howToSteps = Array.isArray(runtime.howToSteps) ? runtime.howToSteps : [];
export const howToName = runtime.howToName?.trim() || '하수구가 막혔을 때 대처 방법';
export const siteDefinition = runtime.siteDefinition?.trim() || '';

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
  return `${area} 하수구청소 상담`;
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
  const path = window.location.pathname;
  const localMatch = path.match(/\/page\/local-([a-z0-9-]+)\.php/i);
  if (localMatch) {
    const found = [...localAreas, ...neighborAreas].find((a) => a.slug === localMatch[1]);
    if (found) return found.name;
  }
  const serviceMatch = path.match(/\/page\/service-([a-z0-9-]+)\.php/i);
  if (serviceMatch) {
    const found = serviceHubs.find((a) => a.slug === serviceMatch[1]);
    if (found) return found.label || found.name;
  }
  return '';
}

export function defaultFaqs(area = regionName): PageFaq[] {
  if (homeFaqs.length > 0 && (area === regionName || area === '')) {
    return homeFaqs;
  }
  return [
    {
      q: `${area} 하수구청소는 어디서 받나요?`,
      a: `원진하수구에서 ${area} 하수구청소 상담이 가능합니다. 증상과 위치를 알려주시면 일정을 안내합니다.`,
    },
    {
      q: `${area} 하수구청소 비용은 얼마인가요?`,
      a: '배관 상태·오염 정도·작업 범위에 따라 달라 상담 후 안내합니다.',
    },
    {
      q: '하수구 뚫기와 청소는 무엇이 다른가요?',
      a: '뚫기는 흐름을 일시적으로 여는 작업이고, 청소는 배관 안쪽 오염·누적 원인을 점검해 재발을 줄이는 방향입니다.',
    },
    {
      q: `${area} 싱크대청소도 가능한가요?`,
      a: '가능합니다. 기름때·음식물 찌꺼기로 느려진 주방 배수 청소·점검 상담을 진행합니다.',
    },
    {
      q: '밤이나 주말에도 상담 가능한가요?',
      a: '긴급 증상은 상담 후 가능 일정을 안내합니다. 전화 또는 사진 문의로 먼저 알려주세요.',
    },
    {
      q: '배수구 악취도 청소 대상인가요?',
      a: '트랩·오염·역류 등 원인이 다양합니다. 증상 확인 후 청소·점검 방향을 안내합니다.',
    },
  ];
}

export function resolveFaqs(area = regionName): PageFaq[] {
  if (pageFaqs.length > 0) {
    const extras = defaultFaqs(area).filter((f) => !pageFaqs.some((p) => p.q === f.q)).slice(0, 3);
    return [...pageFaqs, ...extras];
  }
  return defaultFaqs(area);
}
