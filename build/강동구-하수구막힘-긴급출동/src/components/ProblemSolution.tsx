import { motion } from 'motion/react';
import { AlertTriangle, Droplets, Bath, Wind, Waves, CheckCircle2, XCircle, RefreshCcw, CloudRain, PhoneCall, ArrowRight, Utensils, Store, Sparkles, MessageCircle } from 'lucide-react';
import { contactInfo } from '../data';

export const Symptoms = () => {
  const symptoms = [
    {
      icon: <Droplets className="w-8 h-8 text-orange-500" />,
      title: "싱크대 물이 천천히 내려감",
      desc: "기름때, 음식물 찌꺼기, 배관 내부 이물질로 인해 배수가 느려질 수 있습니다."
    },
    {
      icon: <Bath className="w-8 h-8 text-orange-500" />,
      title: "변기 물이 시원하게 내려가지 않음",
      desc: "휴지, 이물질, 배관 막힘 등 다양한 원인으로 변기 막힘이 발생할 수 있습니다."
    },
    {
      icon: <Wind className="w-8 h-8 text-orange-500" />,
      title: "욕실 배수구에서 냄새가 올라옴",
      desc: "배관 내부 오염, 트랩 문제, 역류 가능성 등을 확인해야 합니다."
    },
    {
      icon: <Waves className="w-8 h-8 text-orange-500" />,
      title: "베란다나 세탁실 배수구가 막힘",
      desc: "먼지, 머리카락, 세제 찌꺼기 등이 쌓이면 배수가 원활하지 않을 수 있습니다."
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-orange-500" />,
      title: "하수구에서 물이 역류함",
      desc: "단순 막힘보다 더 심한 배관 문제일 수 있어 빠른 확인이 필요합니다."
    },
    {
      icon: <XCircle className="w-8 h-8 text-orange-500" />,
      title: "뚫어뻥으로 해결되지 않음",
      desc: "겉으로 보이는 부분이 아니라 배관 안쪽에 막힘이 있을 수 있습니다."
    },
    {
      icon: <RefreshCcw className="w-8 h-8 text-orange-500" />,
      title: "같은 곳이 반복해서 막힘",
      desc: "배관 내부에 슬러지나 이물질이 남아 있을 가능성이 있습니다."
    },
    {
      icon: <CloudRain className="w-8 h-8 text-orange-500" />,
      title: "비 오는 날이나 사용량이 많을 때 역류함",
      desc: "배관 흐름이나 외부 하수 라인 문제까지 확인이 필요할 수 있습니다."
    }
  ];

  return (
    <section id="symptoms" className="py-24 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 font-bold tracking-wider text-sm mb-4 border border-orange-100 shadow-sm">
            <AlertTriangle className="w-4 h-4" /> 증상 체크
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5 break-keep">
            이런 증상이 있다면 하수구 막힘 점검이 필요합니다
          </h2>
          <p className="text-slate-600 text-lg font-medium max-w-3xl mx-auto break-keep leading-relaxed">
            물이 천천히 내려가거나 악취, 역류 증상이 반복된다면 단순한 막힘이 아닐 수 있습니다.<br className="hidden md:block" />
            <span className="font-bold text-slate-800">강동구 지역 하수구 막힘</span> 증상을 확인하고 상담받아보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {symptoms.map((symptom, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col h-full"
            >
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 border border-orange-100 shrink-0">
                {symptom.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 break-keep leading-snug">{symptom.title}</h3>
              <p className="text-slate-600 leading-relaxed font-medium mb-6 flex-grow break-keep text-sm">{symptom.desc}</p>
              
              <a href={`tel:${contactInfo.phone}`} className="inline-flex items-center gap-1.5 text-orange-500 font-bold text-sm hover:text-orange-600 transition-colors mt-auto">
                상담하기 <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-center relative overflow-hidden shadow-xl shadow-slate-900/10 border border-slate-800">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="relative z-10 flex flex-col items-center">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 tracking-tight break-keep">
              막힘 증상이 반복된다면 지금 바로 상담해보세요.
            </h3>
            <p className="text-slate-300 font-medium text-lg mb-8 break-keep">
              증상을 알려주시면 상황에 맞게 안내드립니다.
            </p>
            <a
              href={`tel:${contactInfo.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4.5 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 shadow-lg shadow-orange-500/30"
            >
              <PhoneCall className="w-5 h-5" />
              강동구하수구막힘 상담하기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Services = () => {
  const services = [
    {
      title: "강동구 싱크대 막힘",
      desc: "음식물 찌꺼기, 기름때, 배관 내부 이물질로 인해 싱크대 물이 잘 내려가지 않을 때 상담 가능합니다.",
      points: ["물 빠짐이 느림", "싱크대 냄새", "반복 막힘"],
      btnText: "싱크대 막힘 상담하기",
      icon: <Utensils className="w-8 h-8 text-orange-500" />
    },
    {
      title: "강동구 변기 막힘",
      desc: "휴지, 이물질, 배관 문제 등으로 변기 물이 내려가지 않거나 넘칠 때 증상 확인 후 안내드립니다.",
      points: ["변기 물 차오름", "물 내려감 불량", "이물질 막힘"],
      btnText: "변기 막힘 상담하기",
      icon: <Bath className="w-8 h-8 text-orange-500" />
    },
    {
      title: "강동구 배수구 막힘",
      desc: "욕실, 베란다, 세탁실 배수구 막힘과 악취 문제를 현장 상황에 맞춰 상담합니다.",
      points: ["욕실 배수 불량", "세탁실 역류", "배수구 악취"],
      btnText: "배수구 막힘 상담하기",
      icon: <Droplets className="w-8 h-8 text-orange-500" />
    },
    {
      title: "강동구 하수구 역류",
      desc: "하수구에서 물이 역류하거나 냄새가 올라오는 경우 배관 상태 확인이 필요할 수 있습니다.",
      points: ["하수구 물 역류", "악취 발생", "반복적인 막힘"],
      btnText: "하수구 역류 상담하기",
      icon: <Waves className="w-8 h-8 text-orange-500" />
    },
    {
      title: "강동구 배관 청소",
      desc: "배관 내부에 쌓인 슬러지, 기름때, 이물질 등으로 배수 문제가 반복될 때 상담 가능합니다.",
      points: ["배관 내부 오염", "반복 막힘", "배수 속도 저하"],
      btnText: "배관 청소 상담하기",
      icon: <Sparkles className="w-8 h-8 text-orange-500" />
    },
    {
      title: "강동구 음식점 하수구 막힘",
      desc: "음식점, 카페, 상가 주방 배수 문제는 빠른 확인과 대응이 중요합니다.",
      points: ["주방 배수 막힘", "기름때 누적", "영업장 긴급 상담"],
      btnText: "상가 하수구 상담하기",
      icon: <Store className="w-8 h-8 text-orange-500" />
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
            강동구 하수구 막힘 주요 상담 서비스
          </h2>
          <p className="mt-6 text-slate-600 text-lg font-medium leading-relaxed max-w-2xl mx-auto break-keep">
            싱크대, 변기, 욕실 배수구, 하수구 역류까지<br className="hidden md:block" />
            현장 증상에 맞춰 필요한 작업을 안내드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all flex flex-col h-full group"
            >
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 border border-orange-100 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-600 mb-6 font-medium leading-relaxed break-keep">
                {service.desc}
              </p>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {service.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-center gap-3 text-slate-700 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`tel:${contactInfo.phone}`}
                className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-orange-500 text-slate-700 hover:text-white px-6 py-4 rounded-2xl font-bold text-base transition-colors border border-slate-200 hover:border-orange-500 mt-auto"
              >
                <PhoneCall className="w-4 h-4" />
                {service.btnText}
              </a>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-[2rem] p-8 md:p-12 text-center border border-slate-200 shadow-sm max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight break-keep">
            어떤 막힘인지 정확히 몰라도 괜찮습니다.
          </h3>
          <p className="text-slate-600 font-medium text-lg mb-8 break-keep">
            현재 증상만 알려주시면 상담 가능합니다.
          </p>
          <a
            href={`tel:${contactInfo.phone}`}
            className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all hover:-translate-y-1 shadow-lg shadow-orange-500/30"
          >
            <MessageCircle className="w-6 h-6" />
            증상 상담하기
          </a>
        </div>
      </div>
    </section>
  );
};

export const ContextTypes = () => {
  return (
    <section id="context" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-12">
          어떤 현장이든 문제 없습니다
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "주거공간", desc: "아파트, 빌라, 단독주택, 오피스텔" },
            { title: "상업공간", desc: "식당, 카페, 미용실, 상가" },
            { title: "공공/기타", desc: "관공서, 학교, 공장, 빌딩 메인배관" }
          ].map((type, idx) => (
            <div key={idx} className="p-8 md:p-10 rounded-3xl bg-slate-50 border border-slate-100 transition-all hover:bg-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-3">{type.title}</h3>
              <p className="text-slate-600 font-medium">{type.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
