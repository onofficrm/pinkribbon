import { motion } from 'motion/react';
import { Camera, Zap, Wrench, Search, MapPin, Clock, ShieldCheck, CheckCircle2, Info, PhoneCall, MessageSquare, ClipboardList, Sparkles } from 'lucide-react';
import { contactInfo } from '../data';

export const Equipment = () => {
  return (
    <section id="equipment" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start">
          
          {/* Left Image Area */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-auto lg:h-[800px] border-4 border-slate-50"
            >
              <img 
                src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1000&auto=format&fit=crop" 
                alt="강동구하수구막힘 전문 장비 점검" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                  <div className="flex items-start gap-4 text-white">
                    <div className="p-3 bg-orange-500 rounded-xl shrink-0">
                      <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-extrabold text-lg md:text-xl mb-1">최신 내시경 및 배관 장비</p>
                      <p className="text-slate-200 font-medium text-sm md:text-base">눈대중이 아닌 정확한 원인 파악을 위해 전문 장비로 점검합니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Text Area */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center lg:py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6 break-keep">
                반복되는 하수구 막힘,<br />
                <span className="text-slate-900 underline decoration-orange-500 decoration-4 underline-offset-4">원인 확인이 중요합니다</span>
              </h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed mb-10 break-keep">
                한 번 뚫었다고 끝나는 문제가 아닐 수 있습니다.<br className="hidden sm:block" />
                배관 안쪽에 기름때, 머리카락, 이물질, 슬러지가 남아 있다면 같은 문제가 반복될 수 있습니다.
              </p>

              <div className="space-y-8 mb-10">
                <div className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-orange-500 before:rounded-full">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    전문 장비로 막힘 위치 확인
                  </h3>
                  <p className="text-slate-600 font-medium break-keep leading-relaxed text-base">
                    눈에 보이는 입구만 확인하는 것이 아니라, 막힘이 발생한 위치와 배관 흐름을 함께 확인하는 것이 중요합니다.
                  </p>
                </div>
                
                <div className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-orange-500 before:rounded-full">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    현장 상황에 맞는 작업 안내
                  </h3>
                  <p className="text-slate-600 font-medium break-keep leading-relaxed text-base">
                    싱크대, 변기, 욕실, 세탁실, 상가 배관 등 현장마다 막힘 원인이 다르기 때문에 상황에 맞는 방식으로 안내합니다.
                  </p>
                </div>

                <div className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-orange-500 before:rounded-full">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    작업 후 배수 상태 확인
                  </h3>
                  <p className="text-slate-600 font-medium break-keep leading-relaxed text-base">
                    작업 후 물이 정상적으로 내려가는지 확인하고, 재발을 줄이기 위한 사용 방법도 함께 안내할 수 있습니다.
                  </p>
                </div>
              </div>

              {/* Navy Point Box (Checklist) */}
              <div className="bg-slate-900 rounded-[2rem] p-8 mb-6 shadow-xl shadow-slate-900/10">
                <h4 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-orange-400" />
                  현장 점검 필수 확인사항
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4">
                  {[
                    "막힘 위치 확인",
                    "배관 내부 상태 점검",
                    "악취 및 역류 원인 확인",
                    "현장 상황별 작업 안내",
                    "작업 후 배수 상태 확인"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-200 font-medium text-sm md:text-base">
                      <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Caution Box */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 mb-8 flex items-start gap-3">
                <Info className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <p className="text-yellow-800 text-sm font-bold leading-relaxed break-keep">
                  정확한 비용과 작업 방식은 현장 상태, 막힘 정도, 배관 구조에 따라 달라질 수 있습니다.
                </p>
              </div>

              {/* CTA Button */}
              <a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-5 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 shadow-lg shadow-orange-500/30 w-full sm:w-auto"
              >
                <PhoneCall className="w-5 h-5" />
                반복 막힘 상담하기
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Process = () => {
  const steps = [
    {
      num: "01",
      icon: <MessageSquare className="w-6 h-6" />,
      title: "상담 접수",
      desc: "전화, 카카오톡, 문의폼으로 현재 막힘 증상을 알려주세요."
    },
    {
      num: "02",
      icon: <Search className="w-6 h-6" />,
      title: "증상 확인",
      desc: "막힌 위치, 물 내려가는 상태, 악취 또는 역류 여부를 확인합니다."
    },
    {
      num: "03",
      icon: <ClipboardList className="w-6 h-6" />,
      title: "현장 상황 안내",
      desc: "상담 내용을 바탕으로 예상 작업 방식과 확인이 필요한 부분을 안내드립니다."
    },
    {
      num: "04",
      icon: <Wrench className="w-6 h-6" />,
      title: "전문 장비 작업",
      desc: "현장 상황에 따라 필요한 장비와 방식으로 막힘 문제를 처리합니다."
    },
    {
      num: "05",
      icon: <Sparkles className="w-6 h-6" />,
      title: "배수 확인 및 마무리",
      desc: "작업 후 물이 정상적으로 내려가는지 확인하고 관리 방법을 안내합니다."
    }
  ];

  return (
    <section id="process" className="py-24 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
            상담부터 마무리까지 이렇게 진행됩니다
          </h2>
          <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-2xl mx-auto break-keep">
            처음 문의하시는 분도 쉽게 이해할 수 있도록<br className="hidden md:block" />
            증상 확인부터 작업 안내까지 단계별로 진행됩니다.
          </p>
        </div>

        <div className="relative mb-16">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] w-[80%] h-1 bg-slate-200 -z-10"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative bg-white flex flex-col p-8 lg:p-6 rounded-3xl shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow group h-full"
              >
                {/* Number Badge */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-lg shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform">
                  {step.num}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-6 border border-orange-100 mx-auto">
                  {step.icon}
                </div>

                {/* Content */}
                <div className="text-center flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 break-keep">{step.title}</h3>
                  <p className="text-slate-600 font-medium text-sm leading-relaxed break-keep">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connecting line for mobile (vertical) */}
          <div className="lg:hidden absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-slate-200 -z-10"></div>
        </div>

        {/* Bottom Section */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center sm:items-start justify-center gap-3 shadow-sm inline-flex w-full sm:w-auto mx-auto text-left sm:text-center">
            <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <p className="text-slate-600 text-sm md:text-base font-bold leading-relaxed break-keep">
              작업 방식과 비용은 현장 상태에 따라 달라질 수 있습니다.<br className="hidden sm:block" />
              상담 시 증상을 자세히 알려주시면 더 정확한 안내가 가능합니다.
            </p>
          </div>

          <div>
            <a
              href={`tel:${contactInfo.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all hover:-translate-y-1 shadow-lg shadow-orange-500/30"
            >
              <PhoneCall className="w-6 h-6" />
              지금 작업 상담하기
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export const Areas = () => {
  const dongs = [
    "천호동", "성내동", "길동", "암사동", "둔촌동", "명일동", "고덕동", "상일동", "강일동",
    "천호역 인근", "강동역 인근", "길동역 인근", "둔촌동역 인근", "암사역 인근", "명일역 인근", "고덕역 인근", "상일동역 인근"
  ];

  return (
    <section id="areas" className="py-24 bg-white scroll-mt-20 relative overflow-hidden">
      {/* Map-like subtle background */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start">
          
          {/* Left Text & Tags Area */}
          <div className="w-full lg:w-3/5">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full text-orange-600 font-bold text-sm mb-6 border border-orange-100 shadow-sm">
              <MapPin className="w-4 h-4" /> 강동구 전지역 출동
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6 break-keep">
              강동구 전지역<br className="hidden sm:block" />
              <span className="text-slate-900 underline decoration-orange-500 decoration-4 underline-offset-4">하수구 막힘 상담 가능</span>
            </h2>
            
            <p className="text-slate-600 text-lg font-bold mb-6 break-keep">
              강동구 내 주거지역, 상가, 사무실, 음식점, 아파트, 빌라, 오피스텔 등 다양한 현장 상담이 가능합니다.
            </p>
            
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 mb-8 shadow-sm">
              <p className="text-slate-600 font-medium leading-relaxed break-keep">
                <span className="font-bold text-slate-800">강동구하수구막힘</span> 문제는 지역 특성과 건물 구조에 따라 증상이 다르게 나타날 수 있습니다.<br />
                아파트, 빌라, 상가, 음식점, 사무실 등 현장마다 배관 구조와 막힘 원인이 다르기 때문에 증상 확인 후 상황에 맞는 상담이 필요합니다.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
              {dongs.map((dong, idx) => (
                <span key={idx} className="px-4 py-2 md:px-5 md:py-2.5 bg-white border border-slate-200 text-slate-700 rounded-full font-bold text-sm shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-colors">
                  {dong}
                </span>
              ))}
            </div>
            
            <div className="flex items-start gap-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed break-keep">
                내 위치가 해당 지역에 없어도 강동구 인근이면 상담 가능합니다.<br />
                현재 위치와 증상을 알려주시면 가능 여부를 안내드립니다.
              </p>
            </div>
          </div>

          {/* Right CTA Box */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden text-center">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
              
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-slate-700">
                <MapPin className="w-10 h-10 text-orange-500" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-snug break-keep">
                우리 동네도 상담 가능한지<br />
                확인해보세요
              </h3>
              
              <p className="text-slate-300 font-medium mb-10 break-keep">
                현장 위치와 막힘 증상을 알려주시면<br />
                빠르게 안내해 드리겠습니다.
              </p>
              
              <a
                href={`tel:${contactInfo.phone}`}
                className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-5 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 shadow-lg shadow-orange-500/30"
              >
                <PhoneCall className="w-5 h-5" />
                출동 가능 지역 상담하기
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
