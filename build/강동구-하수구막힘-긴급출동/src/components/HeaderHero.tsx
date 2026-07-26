import { motion } from 'motion/react';
import { Phone, FormInput, ArrowDown, CheckCircle2, ShieldCheck, Clock, MapPin, Wrench } from 'lucide-react';
import { assetUrl, contactInfo, getDongFromUrl, phoneCtaLabel, phoneCtaSubLabel, regionInitial, regionName, telHref } from '../data';
import { TrustSignals } from './Conversion';

export const Header = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  const area = getDongFromUrl() || regionName;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-900 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg md:text-xl">{regionInitial}</span>
          </div>
          <div>
            <span className="font-extrabold text-lg md:text-2xl tracking-tight text-slate-900 leading-none">{contactInfo.companyName}</span>
            <p className="hidden md:block text-[11px] text-slate-500 font-medium mt-0.5 tracking-tight">{area} 하수구 막힘 상담</p>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          <button onClick={() => scrollTo('services')} className="text-sm font-bold text-slate-700 hover:text-orange-500 transition-colors">서비스</button>
          <button onClick={() => scrollTo('inquiry-form')} className="text-sm font-bold text-slate-700 hover:text-orange-500 transition-colors">사진상담</button>
          <button onClick={() => scrollTo('areas')} className="text-sm font-bold text-slate-700 hover:text-orange-500 transition-colors">출동지역</button>
          <a href="/bbs/board.php?bo_table=notice" className="text-sm font-bold text-slate-700 hover:text-orange-500 transition-colors">시공사례</a>
          <button onClick={() => scrollTo('reviews')} className="text-sm font-bold text-slate-700 hover:text-orange-500 transition-colors">후기</button>
          <button onClick={() => scrollTo('faq')} className="text-sm font-bold text-slate-700 hover:text-orange-500 transition-colors">FAQ</button>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={telHref()}
            className="flex flex-col items-start justify-center gap-0.5 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-extrabold transition-all shadow-lg shadow-orange-500/25 leading-none"
          >
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold opacity-90">
              <Phone className="w-3.5 h-3.5" />
              {phoneCtaSubLabel(area)}
            </span>
            <span className="text-xl tracking-tight">{phoneCtaLabel(area)}</span>
          </a>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <a href={telHref()} className="flex flex-col items-end leading-none text-right">
            <span className="text-[10px] font-bold text-orange-500">전화상담</span>
            <span className="text-sm font-black text-slate-900 tracking-tight">{phoneCtaLabel(area)}</span>
          </a>
          <a href={telHref()} className="flex items-center justify-center w-10 h-10 bg-orange-500 text-white rounded-full shadow-md">
            <Phone className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
};

export const Hero = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  const area = getDongFromUrl() || regionName;

  return (
    <>
      <section className="relative min-h-[720px] md:min-h-[780px] flex items-end overflow-hidden bg-slate-950 pt-24">
        <img
          src={assetUrl('drain-hero.webp')}
          alt={`${regionName} 하수구 전문 기사의 배관 내시경 점검`}
          className="absolute inset-0 w-full h-full object-cover object-[68%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/25" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-12 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/10 backdrop-blur-md text-white font-extrabold text-sm mb-6 border border-white/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
              </span>
              {area} 전지역 긴급 상담
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.08] mb-5 tracking-[-0.04em] break-keep">
              {area} 하수구 막힘,<br />
              <span className="text-orange-500">안쪽까지 봐야</span><br />
              해결됩니다
            </h1>

            <p className="text-lg md:text-xl text-slate-200 mb-6 font-semibold break-keep">
              싱크대 · 변기 · 배수구 · 하수구 역류
            </p>

            <div className="mb-7">
              <TrustSignals />
            </div>

            <a
              href={telHref()}
              className="mb-5 inline-flex w-full sm:w-auto flex-col items-start sm:items-center justify-center gap-1 bg-orange-500 hover:bg-orange-600 text-white px-7 py-5 rounded-[1.75rem] font-extrabold transition-all shadow-xl shadow-orange-500/35"
            >
              <span className="inline-flex items-center gap-2 text-sm md:text-base opacity-95">
                <Phone className="w-5 h-5" />
                {phoneCtaSubLabel(area)}
              </span>
              <span className="text-3xl sm:text-4xl md:text-5xl tracking-tight leading-none">
                {phoneCtaLabel(area)}
              </span>
            </a>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => scrollTo('inquiry-form')}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-5 rounded-2xl font-extrabold text-lg transition-colors"
              >
                <ArrowDown className="w-5 h-5" />
                사진 보내고 상담
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {['내시경 점검', '전문 장비', `${area} 출동`].map((point) => (
                <span key={point} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950/50 text-slate-100 text-sm font-bold border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" /> {point}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="bg-slate-900 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center lg:justify-between gap-y-4 gap-x-8">
          <div className="flex items-center gap-2.5 text-white font-bold text-sm md:text-base">
            <Clock className="w-5 h-5 text-orange-500" />
            <span>24시간 상담 가능</span>
          </div>
          <div className="hidden lg:block w-1 h-1 rounded-full bg-slate-700" />
          <div className="flex items-center gap-2.5 text-white font-bold text-sm md:text-base">
            <MapPin className="w-5 h-5 text-orange-500" />
            <span>{area === regionName ? `${regionName} 전지역` : `${area} · ${regionName}`}</span>
          </div>
          <div className="hidden lg:block w-1 h-1 rounded-full bg-slate-700" />
          <div className="flex items-center gap-2.5 text-white font-bold text-sm md:text-base">
            <ShieldCheck className="w-5 h-5 text-orange-500" />
            <span>싱크대·변기·배수구</span>
          </div>
          <div className="hidden lg:block w-1 h-1 rounded-full bg-slate-700" />
          <div className="flex items-center gap-2.5 text-white font-bold text-sm md:text-base">
            <Wrench className="w-5 h-5 text-orange-500" />
            <span>하수구 역류 상담</span>
          </div>
        </div>
      </div>
    </>
  );
};

export const MobileBottomBar = () => {
  const area = getDongFromUrl() || regionName;
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 flex pb-safe shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)]">
      <a href={telHref()} className="flex-[1.7] py-2.5 flex flex-col items-center justify-center gap-0.5 bg-orange-500 text-white">
        <span className="inline-flex items-center gap-1 text-[10px] font-bold opacity-90">
          <Phone className="w-3.5 h-3.5" />
          {phoneCtaSubLabel(area)}
        </span>
        <span className="text-lg font-black tracking-tight leading-none">{phoneCtaLabel(area)}</span>
      </a>
      <a href="#inquiry-form" className="flex-1 py-3 flex flex-col items-center justify-center gap-1 bg-slate-900 text-white">
        <FormInput className="w-5 h-5" />
        <span className="text-[10px] font-extrabold tracking-tight">사진상담</span>
      </a>
    </div>
  );
};
