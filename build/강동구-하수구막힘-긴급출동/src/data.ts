export const contactInfo = {
  phone: '010-1234-5678',
  phoneFormatted: '010-1234-5678',
  phoneDisplay: '010-1234-5678',
  form: '#inquiry-form',
  companyName: '강동 하수구 해결센터',
  businessNumber: '123-45-67890',
  address: '서울특별시 강동구 천호대로 00길 00',
  ceo: '김배관',
};

export const keywords = {
  main: '강동구하수구막힘',
  secondary: [
    '강동구 싱크대 막힘', '강동구 변기 막힘', '강동구 배수구 막힘',
    '강동구 하수구 역류', '강동구 하수구 뚫는 업체', '강동구 하수구 청소',
    '강동구 배관 막힘', '강동구 배수관 막힘', '강동구 하수구 냄새', '강동구 하수구 긴급출동',
  ],
};

/** 지역 랜딩 — slug는 /page/local-{slug}.php 와 연결 */
export const localAreas = [
  { slug: 'cheonho', name: '천호동', label: '천호동 하수구막힘' },
  { slug: 'seongnae', name: '성내동', label: '성내동 하수구막힘' },
  { slug: 'gil', name: '길동', label: '길동 하수구막힘' },
  { slug: 'amsa', name: '암사동', label: '암사동 하수구막힘' },
  { slug: 'dunchon', name: '둔촌동', label: '둔촌동 하수구막힘' },
  { slug: 'myeongil', name: '명일동', label: '명일동 하수구막힘' },
  { slug: 'godeok', name: '고덕동', label: '고덕동 하수구막힘' },
  { slug: 'sangil', name: '상일동', label: '상일동 하수구막힘' },
  { slug: 'gangil', name: '강일동', label: '강일동 하수구막힘' },
];

export const reviews = [
  {
    area: '천호동',
    title: '싱크대 막힘 당일 해결',
    body: '물이 안 내려가서 급했는데, 증상만 말씀드려도 바로 안내해 주셨어요. 작업 후 배수도 정상입니다.',
    rating: 5,
  },
  {
    area: '길동',
    title: '욕실 배수구 악취 해결',
    body: '냄새 때문에 고생했는데 원인을 자세히 설명해 주시고 필요한 작업만 진행해 주셨습니다.',
    rating: 5,
  },
  {
    area: '암사동',
    title: '하수구 역류 긴급 상담',
    body: '밤에 역류가 와서 불안했는데 바로 상담이 됐고, 현장 상황에 맞게 안내받았습니다.',
    rating: 5,
  },
  {
    area: '성내동',
    title: '음식점 주방 배수 막힘',
    body: '영업 전에 급하게 연락드렸는데 대응이 빨랐어요. 사진 보내고 상담하니 더 수월했습니다.',
    rating: 5,
  },
];

export function phoneCtaLabel(area = '강동구') {
  return `${area} 지금 출동 가능 확인`;
}

export function telHref() {
  return `tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`;
}

declare global {
  interface Window {
    __PINKRIBBON_DONG__?: string;
  }
}

export function getDongFromUrl() {
  if (typeof window === 'undefined') return '';
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
