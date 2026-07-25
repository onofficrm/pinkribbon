import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ShieldAlert, PhoneCall, Camera } from 'lucide-react';
import { contactInfo, getDongFromUrl, phoneCtaLabel, telHref } from '../data';

export const Notices = () => {
  const promises = [
    { num: '01', title: '사전 견적', desc: '현장 확인 후 필요한 작업만 안내' },
    { num: '02', title: '과잉 작업 없음', desc: '불필요한 공사·교체를 권하지 않음' },
    { num: '03', title: '작업 후 확인', desc: '배수 상태를 확인하고 마무리' },
  ];

  return (
    <section id="notices" className="py-20 md:py-28 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-slate-950 shadow-2xl">
          <div className="relative min-h-[380px] lg:min-h-[600px]">
            <img
              src="/plugin/onoff-builder-bridge/imports/gangdong-drain/images/commercial-drain.webp"
              alt="상가 하수구 현장 점검"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
            <div className="absolute left-6 right-6 bottom-6 md:left-8 md:bottom-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white font-extrabold text-sm">
                <ShieldAlert className="w-4 h-4" /> 현장 원칙
              </span>
            </div>
          </div>

          <div className="p-7 md:p-12 lg:p-14 flex flex-col justify-center">
            <p className="text-orange-400 font-extrabold tracking-widest text-sm mb-3">OUR PROMISE</p>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-10 break-keep">
              필요한 작업만<br />정확하게
            </h2>
            <div className="space-y-3">
              {promises.map((item) => (
                <div key={item.num} className="flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-white/5 border border-white/10">
                  <strong className="text-orange-400 font-black text-xl">{item.num}</strong>
                  <div>
                    <h3 className="text-white font-extrabold text-lg">{item.title}</h3>
                    <p className="text-slate-400 text-sm font-medium break-keep">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FAQ = () => {
  const faqs = [
    {
      q: "강동구 전지역 상담 가능한가요?",
      a: "강동구 주요 지역의 하수구 막힘, 싱크대 막힘, 변기 막힘, 배수구 막힘 증상 상담이 가능합니다. 정확한 가능 여부는 위치와 시간에 따라 안내드립니다."
    },
    {
      q: "하수구 막힘 비용은 얼마인가요?",
      a: "비용은 막힘 정도, 배관 구조, 필요한 장비, 작업 범위에 따라 달라질 수 있습니다. 상담 시 증상을 알려주시면 가능한 범위에서 안내드립니다."
    },
    {
      q: "싱크대 막힘도 가능한가요?",
      a: "네. 싱크대 물 빠짐 불량, 악취, 반복 막힘 등 다양한 증상 상담이 가능합니다."
    },
    {
      q: "변기 막힘도 상담 가능한가요?",
      a: "네. 변기 물이 잘 내려가지 않거나 물이 차오르는 증상도 상담 가능합니다."
    },
    {
      q: "하수구 냄새가 심한데 막힘 문제인가요?",
      a: "냄새의 원인은 배관 내부 오염, 트랩 문제, 역류, 배수 불량 등 다양할 수 있습니다. 증상 확인 후 안내가 필요합니다."
    },
    {
      q: "밤이나 주말에도 상담 가능한가요?",
      a: "긴급 상황은 상담 후 가능한 일정과 대응 여부를 안내드립니다."
    },
    {
      q: "뚫어뻥으로 해결되지 않으면 어떻게 해야 하나요?",
      a: "입구 쪽 문제가 아니라 배관 안쪽 막힘일 수 있습니다. 반복되거나 해결되지 않는 경우 전문 장비 점검이 필요할 수 있습니다."
    },
    {
      q: "작업 후 다시 막힐 수도 있나요?",
      a: "배관 상태와 사용 환경에 따라 재발 가능성이 있을 수 있습니다. 반복 막힘이 있다면 원인 확인이 중요합니다."
    }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-slate-50 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-5">
            강동구하수구막힘 자주 묻는 질문
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-shadow hover:shadow-md">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
              >
                <span className="font-bold text-slate-900 text-base md:text-lg pr-4 break-keep">Q. {faq.q}</span>
                <ChevronDown className={`w-6 h-6 text-slate-400 shrink-0 transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-8 text-slate-600 bg-slate-50/50 border-t border-slate-100">
                      <div className="pt-6 font-medium leading-relaxed break-keep mb-5">A. {faq.a}</div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <a
                          href={telHref()}
                          className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-xl text-sm font-extrabold"
                        >
                          <PhoneCall className="w-4 h-4" /> 이 증상으로 전화상담
                        </a>
                        <a
                          href="#inquiry-form"
                          className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-3 rounded-xl text-sm font-extrabold"
                        >
                          <Camera className="w-4 h-4" /> 사진 보내고 상담
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FinalCTA = () => {
  const area = getDongFromUrl() || '강동구';
  return (
    <section id="contact" className="py-24 md:py-32 bg-slate-900 relative overflow-hidden scroll-mt-20">
      <img src="/plugin/onoff-builder-bridge/imports/gangdong-drain/images/drain-hero.webp" alt="" className="absolute inset-0 w-full h-full object-cover object-[70%_center]" />
      <div className="absolute inset-0 bg-slate-950/80"></div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight break-keep">
          {area} 막힘,<br className="hidden md:block" /> 사진 한 장이면 상담이 빨라집니다
        </h2>
        <p className="text-slate-300 text-lg mb-10 font-medium break-keep leading-relaxed max-w-2xl mx-auto">
          현재 증상과 위치를 알려주세요. 필요한 장비와 작업 방향을 빠르게 안내합니다.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={telHref()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-5 rounded-2xl font-extrabold text-lg transition-all hover:-translate-y-1 shadow-lg shadow-orange-500/30 border border-orange-500"
          >
            <PhoneCall className="w-5 h-5" />
            {phoneCtaLabel(area)}
          </a>

          <a
            href="#inquiry-form"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-white px-8 py-5 rounded-2xl font-extrabold text-lg transition-all border border-white/30"
          >
            <Camera className="w-5 h-5" />
            사진 보내고 전화상담
          </a>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-500 py-16 text-sm border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-10">
        <div>
          <h3 className="text-slate-300 font-extrabold text-xl mb-5">{contactInfo.companyName}</h3>
          <div className="space-y-2 font-medium">
            <p>대표: {contactInfo.ceo} | 사업자등록번호: {contactInfo.businessNumber}</p>
            <p>주소: {contactInfo.address}</p>
            <p className="text-slate-400">고객센터: {contactInfo.phoneFormatted}</p>
          </div>
        </div>
        <div className="md:text-right font-medium flex flex-col justify-between">
          <p className="mb-6">
            본 사이트는 정보 제공을 목적으로 하며,<br className="hidden md:block" />
            서비스 제공에 따른 책임은 당사에 있습니다.
          </p>
          <p>&copy; {new Date().getFullYear()} {contactInfo.companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
