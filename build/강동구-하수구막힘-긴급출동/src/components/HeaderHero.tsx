import { motion } from 'motion/react';
import { Phone, MessageCircle, FormInput, Menu, ArrowDown, CheckCircle2, ShieldCheck, Clock, MapPin, Wrench } from 'lucide-react';
import { contactInfo } from '../data';

export const Header = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-900 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg md:text-xl">강</span>
          </div>
          <div>
            <span className="font-extrabold text-lg md:text-2xl tracking-tight text-slate-900 leading-none">{contactInfo.companyName}</span>
            <p className="hidden md:block text-[11px] text-slate-500 font-medium mt-0.5 tracking-tight">강동구 전지역 하수구 막힘 상담</p>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center gap-8">
          <button onClick={() => scrollTo('services')} className="text-sm font-bold text-slate-700 hover:text-orange-500 transition-colors">서비스</button>
          <button onClick={() => scrollTo('symptoms')} className="text-sm font-bold text-slate-700 hover:text-orange-500 transition-colors">증상</button>
          <button onClick={() => scrollTo('process')} className="text-sm font-bold text-slate-700 hover:text-orange-500 transition-colors">작업순서</button>
          <button onClick={() => scrollTo('areas')} className="text-sm font-bold text-slate-700 hover:text-orange-500 transition-colors">출동지역</button>
          <button onClick={() => scrollTo('faq')} className="text-sm font-bold text-slate-700 hover:text-orange-500 transition-colors">FAQ</button>
          <button onClick={() => scrollTo('contact')} className="text-sm font-bold text-slate-700 hover:text-orange-500 transition-colors">문의하기</button>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={`tel:${contactInfo.phone}`}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-slate-900/20"
          >
            <Phone className="w-4 h-4" />
            지금 상담하기
          </a>
        </div>
        <div className="md:hidden flex items-center gap-4">
          <a
            href={`tel:${contactInfo.phone}`}
            className="flex items-center justify-center w-10 h-10 bg-orange-500 text-white rounded-full shadow-md"
          >
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
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative pt-24 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-slate-50 -z-10" />
        <div className="absolute top-0 right-0 w-2/3 h-full bg-slate-200/50 rounded-l-full blur-3xl opacity-40 -z-10 transform translate-x-1/4" />
        
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-left z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white text-slate-700 font-bold text-sm mb-6 border border-slate-200 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                </span>
                강동구 전지역 하수구 막힘 상담 가능
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-slate-900 leading-[1.25] mb-6 tracking-tight break-keep">
                <span className="text-orange-500">강동구하수구막힘</span>, <br className="hidden lg:block" />
                지금 바로 상담하세요
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl font-medium break-keep leading-relaxed">
                싱크대 막힘부터 변기, 배수구, 하수구 역류까지<br className="hidden sm:block" />
                강동구 생활 배관 문제를 빠르게 확인하고 안내드립니다.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  "강동구 지역 상담 가능",
                  "싱크대·변기·배수구 막힘 상담",
                  "하수구 역류·악취 증상 확인",
                  "현장 상황에 맞는 작업 안내"
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-slate-800 font-bold text-base md:text-lg">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4.5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1"
                >
                  <Phone className="w-5 h-5" />
                  전화상담 바로가기
                </a>
                <button
                  onClick={() => scrollTo('symptoms')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:bg-slate-50"
                >
                  <ArrowDown className="w-5 h-5" />
                  막힘 증상 확인하기
                </button>
              </div>

              <div className="mt-8 p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-600 font-bold leading-relaxed break-keep">
                    증상만 알려주셔도 상담 가능합니다.<br />
                    <span className="font-medium">막힘 위치와 상황에 따라 필요한 작업을 안내드립니다.</span>
                  </p>
                </div>
              </div>

            </motion.div>
          </div>
          
          <div className="flex-1 w-full max-w-lg lg:max-w-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-200 border-4 border-white"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/90 to-slate-800/80 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1000&auto=format&fit=crop" 
                alt="강동구하수구막힘 전문 장비 상담" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-20">
                <div className="w-20 h-20 bg-white/10 rounded-2xl backdrop-blur-md flex items-center justify-center mb-6 border border-white/20 shadow-xl">
                  <Wrench className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">전문 배관 점검 장비 준비</h3>
                <p className="text-slate-200 font-medium text-lg">정확한 원인 파악을 위한 최신 장비</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-slate-900 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center lg:justify-between gap-y-4 gap-x-8">
          <div className="flex items-center gap-2.5 text-white font-bold text-sm md:text-base">
            <Clock className="w-5 h-5 text-orange-500" />
            <span>24시간 상담 가능</span>
          </div>
          <div className="hidden lg:block w-1 h-1 rounded-full bg-slate-700"></div>
          <div className="flex items-center gap-2.5 text-white font-bold text-sm md:text-base">
            <MapPin className="w-5 h-5 text-orange-500" />
            <span>강동구 전지역</span>
          </div>
          <div className="hidden lg:block w-1 h-1 rounded-full bg-slate-700"></div>
          <div className="flex items-center gap-2.5 text-white font-bold text-sm md:text-base">
            <ShieldCheck className="w-5 h-5 text-orange-500" />
            <span>싱크대·변기·배수구</span>
          </div>
          <div className="hidden lg:block w-1 h-1 rounded-full bg-slate-700"></div>
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
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 flex pb-safe shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)]">
      <a
        href={`tel:${contactInfo.phone}`}
        className="flex-1 py-3.5 flex flex-col items-center justify-center gap-1.5 bg-orange-500 text-white transition-colors"
      >
        <Phone className="w-5 h-5" />
        <span className="text-[11px] font-bold tracking-tight">전화상담</span>
      </a>
      <a
        href={contactInfo.kakao}
        className="flex-1 py-3.5 flex flex-col items-center justify-center gap-1.5 bg-[#FEE500] text-[#191919] transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-[11px] font-bold tracking-tight">카톡상담</span>
      </a>
      <a
        href={contactInfo.form}
        className="flex-1 py-3.5 flex flex-col items-center justify-center gap-1.5 bg-slate-900 text-white transition-colors"
      >
        <FormInput className="w-5 h-5" />
        <span className="text-[11px] font-bold tracking-tight">문의폼</span>
      </a>
    </div>
  );
};
