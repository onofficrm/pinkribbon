import { FormEvent, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Camera, Clock, Phone, Star, Upload, Users, X } from 'lucide-react';
import { getDongFromUrl, localAreas, neighborAreas, phoneCtaLabel, phoneCtaSubLabel, regionName, reviews, telHref } from '../data';

export const TrustSignals = () => {
  const [consultToday, setConsultToday] = useState(11);
  const [responseMin] = useState(3);

  useEffect(() => {
    const hour = new Date().getHours();
    const base = 8 + Math.min(hour, 18);
    setConsultToday(base + (hour % 3));
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-orange-500 text-white text-sm font-extrabold shadow-lg shadow-orange-500/30">
        <Users className="w-4 h-4" /> 오늘 상담 {consultToday}건
      </span>
      <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-bold">
        <Clock className="w-4 h-4 text-orange-400" /> 평균 응답 {responseMin}분
      </span>
      <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-bold">
        {regionName} 출동 가능
      </span>
    </div>
  );
};

export const PhoneCta = ({
  area,
  className = '',
  size = 'md',
}: {
  area?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const dong = area || getDongFromUrl() || regionName;
  const pad = size === 'lg' ? 'px-8 py-5' : size === 'sm' ? 'px-4 py-3' : 'px-6 py-4';
  const numberSize = size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-xl' : 'text-2xl';
  return (
    <a
      href={telHref()}
      className={`inline-flex flex-col items-center justify-center gap-1 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-extrabold transition-all shadow-lg shadow-orange-500/25 leading-none ${pad} ${className}`}
    >
      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm opacity-95">
        <Phone className="w-4 h-4" />
        {phoneCtaSubLabel(dong)}
      </span>
      <span className={`${numberSize} tracking-tight`}>{phoneCtaLabel(dong)}</span>
    </a>
  );
};

export const PhotoInquiryForm = ({ compact = false }: { compact?: boolean }) => {
  const defaultArea = getDongFromUrl() || localAreas[0]?.name || regionName;
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState(defaultArea);
  const [symptom, setSymptom] = useState('싱크대/배수 청소');
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!photo) {
      setPreview('');
      return;
    }
    const url = URL.createObjectURL(photo);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const tokenRes = await fetch('/proc/symptom-inquiry-token.php', { credentials: 'same-origin' });
      const tokenData = await tokenRes.json();
      if (!tokenData?.token) throw new Error('토큰 발급 실패');

      const fd = new FormData();
      fd.append('phone', phone);
      fd.append('area', area);
      fd.append('symptom', symptom);
      fd.append('onoff_inquiry_token', tokenData.token);
      fd.append('website_url', '');
      if (photo) fd.append('photo', photo);

      const res = await fetch('/proc/symptom-inquiry.php', {
        method: 'POST',
        body: fd,
        credentials: 'same-origin',
      });
      const data = await res.json();
      if (!data?.success) throw new Error(data?.message || '접수 실패');
      setStatus('ok');
      setMessage(data.message || '접수되었습니다.');
      setPhone('');
      setPhoto(null);
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : '접수에 실패했습니다.');
    }
  };

  return (
    <section id="inquiry-form" className={`${compact ? 'py-0' : 'py-20 md:py-28 bg-slate-50'} scroll-mt-24`}>
      <div className={compact ? '' : 'max-w-3xl mx-auto px-4'}>
        {!compact && (
          <div className="text-center mb-10">
            <p className="text-orange-500 font-extrabold tracking-widest text-sm mb-3">PHOTO CONSULT</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight break-keep">
              사진 1장이면<br />상담이 더 빨라집니다
            </h2>
          </div>
        )}

        <form
          onSubmit={onSubmit}
          className="bg-white rounded-[2rem] border border-slate-200 shadow-xl p-6 md:p-8 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="block text-sm font-bold text-slate-700 mb-2">연락처 *</span>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 font-medium outline-none focus:border-orange-400"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-bold text-slate-700 mb-2">지역 *</span>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 font-medium outline-none focus:border-orange-400 bg-white"
              >
                {localAreas.map((a) => (
                  <option key={a.slug} value={a.name}>{a.name}</option>
                ))}
                {neighborAreas.map((a) => (
                  <option key={`n-${a.slug}`} value={a.name}>{a.name}</option>
                ))}
                <option value={`${regionName} 기타`}>{regionName} 기타</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="block text-sm font-bold text-slate-700 mb-2">증상</span>
            <select
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 font-medium outline-none focus:border-orange-400 bg-white"
            >
              <option>싱크대/배수 청소</option>
              <option>변기 막힘</option>
              <option>하수구 역류</option>
              <option>배수구 악취</option>
              <option>정화조/외부 배수</option>
              <option>상가/음식점 배수</option>
              <option>기타</option>
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-bold text-slate-700 mb-2">증상 사진 (선택)</span>
            <div className="relative rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50/50 p-5 text-center cursor-pointer hover:bg-orange-50 transition-colors">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => setPhoto(e.target.files?.[0] || null)}
              />
              {preview ? (
                <img src={preview} alt="미리보기" className="mx-auto max-h-40 rounded-xl object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-600">
                  <Upload className="w-7 h-7 text-orange-500" />
                  <span className="font-bold text-sm">사진 올리기 · JPG/PNG · 5MB 이하</span>
                </div>
              )}
            </div>
          </label>

          <input type="text" name="website_url" className="hidden" tabIndex={-1} autoComplete="off" />

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-orange-500 disabled:opacity-60 text-white px-6 py-4 rounded-2xl font-extrabold transition-colors"
          >
            <Camera className="w-5 h-5" />
            {status === 'loading' ? '접수 중...' : '사진 보내고 상담 요청'}
          </button>

          {message && (
            <p className={`text-sm font-bold text-center ${status === 'ok' ? 'text-emerald-600' : 'text-red-500'}`}>
              {message}
            </p>
          )}

          <p className="text-xs text-slate-400 text-center break-keep">
            제출 시 상담 안내를 위한 연락처 수집·이용에 동의한 것으로 봅니다.
          </p>
        </form>
      </div>
    </section>
  );
};

export const Reviews = () => (
  <section id="reviews" className="py-20 md:py-28 bg-white scroll-mt-20">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <p className="text-orange-500 font-extrabold tracking-widest text-sm mb-3">REVIEWS</p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight break-keep">
            {regionName} 현장 후기
          </h2>
        </div>
        <a href="/bbs/board.php?bo_table=notice" className="text-orange-500 font-extrabold hover:text-orange-600">
          시공사례 더보기 →
        </a>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews.map((r) => (
          <article key={r.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 flex flex-col">
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
              ))}
            </div>
            <span className="inline-flex self-start mb-3 px-2.5 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-extrabold">
              {r.area}
            </span>
            <h3 className="font-extrabold text-slate-900 text-lg mb-2 break-keep">{r.title}</h3>
            <p className="text-slate-600 text-sm font-medium leading-relaxed break-keep flex-grow">{r.body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export const ExitPopup = () => {
  const [open, setOpen] = useState(false);
  const shownKey = 'pinkribbon_exit_popup_v1';

  useEffect(() => {
    if (sessionStorage.getItem(shownKey)) return;

    const openOnce = () => {
      if (sessionStorage.getItem(shownKey)) return;
      sessionStorage.setItem(shownKey, '1');
      setOpen(true);
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) openOnce();
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= 0.5) openOnce();
    };

    document.addEventListener('mouseout', onMouseOut);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const area = useMemo(() => getDongFromUrl() || regionName, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="relative w-full max-w-md rounded-[2rem] bg-white p-6 md:p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center"
              aria-label="닫기"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="text-orange-500 font-extrabold text-sm mb-2">잠깐만요</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-3 break-keep">
              사진 1장만 보내세요
            </h3>
            <p className="text-slate-600 font-medium mb-6 break-keep">
              {area} 배수·청소 증상을 사진으로 보내주시면 예상 안내가 더 빨라집니다.
            </p>
            <div className="space-y-3">
              <PhoneCta area={area} className="w-full" />
              <a
                href="#inquiry-form"
                onClick={() => setOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-4 rounded-2xl font-extrabold"
              >
                <Camera className="w-5 h-5" /> 사진 보내고 전화상담
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
