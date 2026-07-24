import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ShieldAlert, PhoneCall } from 'lucide-react';
import { contactInfo } from '../data';

export const Notices = () => {
  return (
    <section id="notices" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 md:p-14">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-orange-100 rounded-2xl">
              <ShieldAlert className="w-8 h-8 text-orange-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              작업 전 반드시 확인하세요
            </h2>
          </div>
          
          <ul className="space-y-8">
            <li className="flex gap-5">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0 mt-1 shadow-md">1</div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-2">투명한 사전 견적</h4>
                <p className="text-slate-600 font-medium leading-relaxed">현장 상황(배관 길이, 막힘 정도)에 따라 작업 방식이 달라지므로, 현장 점검 후 정확한 견적을 안내해 드립니다.</p>
              </div>
            </li>
            <li className="flex gap-5">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0 mt-1 shadow-md">2</div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-2">과잉 진단 금지</h4>
                <p className="text-slate-600 font-medium leading-relaxed">불필요한 공사나 부속 교체를 강요하지 않으며, 꼭 필요한 작업만 정직하게 진행합니다.</p>
              </div>
            </li>
            <li className="flex gap-5">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0 mt-1 shadow-md">3</div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-2">미해결 시 작업비 청구 안함</h4>
                <p className="text-slate-600 font-medium leading-relaxed">문제를 해결하지 못했을 경우 작업비를 받지 않습니다. (단, 기본 출장 점검비는 발생할 수 있습니다.)</p>
              </div>
            </li>
          </ul>
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
                      <div className="pt-6 font-medium leading-relaxed break-keep">A. {faq.a}</div>
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
  return (
    <section id="contact" className="py-24 bg-slate-900 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight break-keep">
          강동구하수구막힘,<br className="hidden md:block" /> 지금 증상만 알려주세요
        </h2>
        <p className="text-slate-300 text-lg mb-12 font-medium break-keep leading-relaxed max-w-2xl mx-auto">
          물이 내려가지 않거나 냄새, 역류, 반복 막힘이 있다면 더 늦기 전에 상담해보세요.<br className="hidden md:block" />
          현재 증상과 위치를 알려주시면 상황에 맞게 안내드립니다.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`tel:${contactInfo.phone}`}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-5 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 shadow-lg shadow-orange-500/30 border border-orange-500"
          >
            <PhoneCall className="w-5 h-5" />
            전화상담 바로가기
          </a>
          
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); alert('카카오톡 상담 채널로 연결됩니다.'); }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-white px-8 py-5 rounded-2xl font-bold text-lg transition-all border border-white/30"
          >
            카카오톡 상담하기
          </a>
          
          <a
            href="#contact-form"
            onClick={(e) => { e.preventDefault(); alert('문의폼 작성 모달이 열립니다.'); }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-white px-8 py-5 rounded-2xl font-bold text-lg transition-all border border-white/30"
          >
            문의폼 작성하기
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
