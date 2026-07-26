import { motion } from 'motion/react';
import { AlertTriangle, Bath, CheckCircle2, Droplets, PhoneCall, Store, Waves } from 'lucide-react';
import { assetUrl, phoneCtaLabel, phoneCtaSubLabel, regionName, telHref } from '../data';

const symptomItems = [
  { icon: Droplets, title: '물이 천천히 내려가요' },
  { icon: Waves, title: '물이 다시 역류해요' },
  { icon: AlertTriangle, title: '악취가 계속 올라와요' },
  { icon: Bath, title: '같은 곳이 반복해서 막혀요' },
];

export const Symptoms = () => (
  <section id="symptoms" className="py-20 md:py-28 bg-white scroll-mt-20">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid lg:grid-cols-[1.08fr_.92fr] gap-8 lg:gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] min-h-[430px] md:min-h-[560px] shadow-2xl"
        >
          <img src={assetUrl('sink-service.webp')} alt="싱크대 배관 내시경 점검" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute left-5 right-5 bottom-5 md:left-8 md:right-8 md:bottom-8 p-5 md:p-6 rounded-2xl bg-white/95 backdrop-blur shadow-xl">
            <p className="text-orange-500 font-extrabold text-sm mb-1">증상이 반복된다면</p>
            <p className="text-slate-900 font-extrabold text-xl md:text-2xl break-keep">배관 안쪽 원인부터 확인해야 합니다</p>
          </div>
        </motion.div>

        <div>
          <span className="inline-flex items-center gap-2 text-orange-600 font-extrabold text-sm mb-4">
            <AlertTriangle className="w-4 h-4" /> QUICK CHECK
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-8 break-keep">
            지금 보이는 증상,<br />그냥 두지 마세요
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {symptomItems.map(({ icon: Icon, title }) => (
              <div key={title} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-orange-500 text-white shrink-0">
                  <Icon className="w-5 h-5" />
                </span>
                <strong className="text-slate-800 break-keep">{title}</strong>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={telHref()} className="inline-flex flex-col items-center justify-center gap-1 bg-orange-500 hover:bg-orange-600 text-white px-7 py-4 rounded-2xl font-extrabold transition-colors leading-none">
              <span className="inline-flex items-center gap-1.5 text-xs opacity-95">
                <PhoneCall className="w-4 h-4" />
                {phoneCtaSubLabel(regionName)}
              </span>
              <span className="text-2xl tracking-tight">{phoneCtaLabel(regionName)}</span>
            </a>
            <a href="#inquiry-form" className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-7 py-4 rounded-2xl font-extrabold transition-colors">
              사진 보내고 상담
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const services = [
  {
    image: assetUrl('sink-service.webp'),
    icon: Droplets,
    title: '싱크대·주방 배관',
    caption: '느린 배수 · 기름때 · 반복 막힘',
  },
  {
    image: assetUrl('drain-equipment.webp'),
    icon: Waves,
    title: '하수구·배수구',
    caption: '역류 · 악취 · 내부 배관 점검',
  },
  {
    image: assetUrl('commercial-drain.webp'),
    icon: Store,
    title: '음식점·상가',
    caption: '영업장 주방 · 바닥 배수 · 긴급 작업',
  },
];

export const Services = () => (
  <section id="services" className="py-20 md:py-28 bg-slate-950 scroll-mt-20">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10 md:mb-14">
        <div>
          <p className="text-orange-400 font-extrabold tracking-widest text-sm mb-3">SERVICE</p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight break-keep">현장에 맞는 전문 작업</h2>
        </div>
        <p className="text-slate-400 font-medium md:text-right break-keep">사진으로 증상을 확인하고<br className="hidden md:block" /> 필요한 장비를 준비합니다.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {services.map(({ image, icon: Icon, title, caption }, idx) => (
          <motion.a
            key={title}
            href={telHref()}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            className="group relative min-h-[420px] md:min-h-[520px] overflow-hidden rounded-[2rem] bg-slate-800"
          >
            <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <span className="mb-4 flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-500 text-white shadow-lg">
                <Icon className="w-6 h-6" />
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{title}</h3>
              <p className="text-slate-300 font-semibold break-keep">{caption}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-orange-400 font-extrabold">
                상담하기 <PhoneCall className="w-4 h-4" />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export const ContextTypes = () => (
  <section id="context" className="py-16 md:py-20 bg-orange-500 scroll-mt-20">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-[1fr_1.2fr] items-center gap-8">
        <div className="text-white">
          <p className="font-extrabold tracking-widest text-sm mb-3 text-orange-100">RESIDENTIAL · COMMERCIAL</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-5 break-keep">집부터 영업장까지<br />현장 맞춤 대응</h2>
          <p className="text-orange-50 font-semibold text-lg break-keep">아파트 · 빌라 · 식당 · 카페 · 상가 · 사무실</p>
        </div>
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {[
            [assetUrl('drain-hero.webp'), '주거공간'],
            [assetUrl('commercial-drain.webp'), '상업공간'],
            [assetUrl('drain-equipment.webp'), '전문장비'],
          ].map(([image, label]) => (
            <div key={label} className="relative aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl">
              <img src={image} alt={label} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
              <strong className="absolute left-3 right-3 bottom-3 md:left-5 md:bottom-5 text-white text-sm md:text-lg">{label}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
