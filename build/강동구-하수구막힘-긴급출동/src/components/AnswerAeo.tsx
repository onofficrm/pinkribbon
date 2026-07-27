import { motion } from 'motion/react';
import { BookOpenCheck, ListOrdered, PhoneCall } from 'lucide-react';
import {
  contactInfo,
  getDongFromUrl,
  howToName,
  howToSteps,
  keywords,
  pageIntro,
  phoneCtaLabel,
  phoneCtaSubLabel,
  regionName,
  siteDefinition,
  telHref,
} from '../data';

/** AEO/GEO: 답변 우선 정의 블록 — AI·요약 검색 인용용 */
export const AnswerDefinition = () => {
  const area = getDongFromUrl() || regionName;
  const definition =
    pageIntro ||
    siteDefinition ||
    `${contactInfo.companyName}는 ${keywords.main}·${keywords.clog}를 중심으로 싱크대·배수구·변기·정화조 청소와 악취·역류·막힘 점검을 상담합니다.`;

  return (
    <section id="definition" className="py-14 md:py-16 bg-slate-50 border-y border-slate-100 scroll-mt-20" aria-labelledby="definition-heading">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-2 text-orange-600 font-extrabold text-sm mb-4">
          <BookOpenCheck className="w-4 h-4" />
          한눈에 보는 답변
        </div>
        <h2 id="definition-heading" className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4 break-keep">
          {keywords.main}·{keywords.clog}란?
        </h2>
        <p className="text-lg md:text-xl text-slate-700 font-semibold leading-relaxed break-keep mb-4">
          {definition}
        </p>
        <p className="text-slate-600 font-medium break-keep leading-relaxed">
          {area === regionName
            ? `${regionName} 전 지역과 인접 지역(송파·광진·하남)에서 하수구청소·하수구막힘 상담이 가능하며, 견적은 현장 상태 확인 후 안내합니다.`
            : `${area} 하수구청소·하수구막힘 증상(배수 느림·악취·역류)을 알려주시면 ${contactInfo.companyName}가 점검·청소 방향을 안내합니다.`}
        </p>
      </div>
    </section>
  );
};

const fallbackHowTo = [
  { name: '물 사용을 잠시 멈춘다', text: '역류·넘침이 있으면 물을 더 내리지 않습니다.' },
  { name: '증상 위치를 확인한다', text: '싱크대·욕실·변기·외부 배수 중 어디인지 구분합니다.' },
  { name: '무리한 약품·뚫기를 피한다', text: '강한 약품은 배관 손상·재발을 키울 수 있습니다.' },
  { name: '사진과 함께 상담한다', text: '증상 사진을 보내면 점검·청소 안내가 빨라집니다.' },
  { name: '필요한 청소만 진행', text: '현장 확인 후 필요한 범위만 안내합니다.' },
];

/** AEO: HowTo — 화면에 보이는 단계 = HowTo 스키마와 동일 소스 */
export const HowToGuide = () => {
  const steps = howToSteps.length > 0 ? howToSteps : fallbackHowTo;
  const title = howToName || '하수구가 막혔을 때 대처 방법';

  return (
    <section id="howto" className="py-20 md:py-24 bg-white scroll-mt-20" aria-labelledby="howto-heading">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-orange-600 font-extrabold text-sm mb-3">
              <ListOrdered className="w-4 h-4" /> HOW TO
            </div>
            <h2 id="howto-heading" className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight break-keep">
              {title}
            </h2>
            <p className="mt-3 text-slate-600 font-medium break-keep max-w-2xl">
              배수가 느려지거나 역류·악취가 있을 때, 안전하게 확인하고 상담받기까지의 순서입니다.
            </p>
          </div>
          <a
            href={telHref()}
            className="inline-flex flex-col items-center justify-center gap-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-2xl font-extrabold leading-none shrink-0"
          >
            <span className="inline-flex items-center gap-1.5 text-xs opacity-95">
              <PhoneCall className="w-4 h-4" />
              {phoneCtaSubLabel(regionName)}
            </span>
            <span className="text-xl tracking-tight">{phoneCtaLabel(regionName)}</span>
          </a>
        </div>

        <ol className="grid md:grid-cols-5 gap-4 list-none p-0 m-0">
          {steps.map((step, idx) => (
            <motion.li
              key={step.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6"
            >
              <span className="text-orange-500 font-black text-sm">STEP {idx + 1}</span>
              <h3 className="mt-2 text-lg font-extrabold text-slate-900 break-keep">{step.name}</h3>
              <p className="mt-2 text-sm text-slate-600 font-medium leading-relaxed break-keep">{step.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};
