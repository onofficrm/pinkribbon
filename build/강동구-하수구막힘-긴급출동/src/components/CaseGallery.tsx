import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Images } from 'lucide-react';
import { regionName } from '../data';

type CaseItem = {
  id: number;
  subject: string;
  href: string;
  thumb: string;
  date: string;
  category: string;
};

type LatestResponse = {
  ok: boolean;
  list_url: string;
  items: CaseItem[];
};

const LATEST_API = '/proc/latest-posts.php?bo_table=notice&rows=6';

export const CaseGallery = () => {
  const [items, setItems] = useState<CaseItem[]>([]);
  const [listUrl, setListUrl] = useState('/bbs/board.php?bo_table=notice');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(LATEST_API)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('fetch failed'))))
      .then((data: LatestResponse) => {
        if (cancelled) return;
        if (data?.list_url) setListUrl(data.list_url);
        if (Array.isArray(data?.items)) setItems(data.items);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="cases" className="py-24 bg-slate-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-orange-400 font-bold text-sm mb-4 tracking-wide uppercase">
              <Images className="w-4 h-4" />
              Case Gallery
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3 break-keep">
              최근 시공사례
            </h2>
            <p className="text-slate-400 font-medium max-w-xl break-keep leading-relaxed">
              {regionName} 현장 작업 사진을 갤러리로 확인하세요. 신규 등록 사례가 홈에 바로 반영됩니다.
            </p>
          </div>
          <a
            href={listUrl}
            className="inline-flex items-center justify-center gap-2 self-start md:self-auto bg-white text-slate-900 hover:bg-orange-500 hover:text-white px-6 py-3.5 rounded-2xl font-bold transition-colors"
          >
            전체 사례 보기
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {!loaded ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-[4/3] rounded-3xl bg-slate-800/80 animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-16 text-center">
            <p className="text-slate-300 font-bold text-lg mb-2">아직 등록된 시공사례가 없습니다</p>
            <p className="text-slate-500 font-medium mb-8 break-keep">
              관리자에서 사진과 함께 사례를 등록하면 이곳에 썸네일이 표시됩니다.
            </p>
            <a
              href={listUrl}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold transition-colors"
            >
              시공사례 게시판 열기
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item, idx) => (
              <motion.a
                key={item.id}
                href={item.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group relative block overflow-hidden rounded-3xl bg-slate-800 aspect-[4/3] shadow-xl shadow-black/20"
              >
                {item.thumb ? (
                  <img
                    src={item.thumb}
                    alt={item.subject}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  {item.category ? (
                    <span className="inline-block mb-2 px-2.5 py-1 rounded-full bg-orange-500 text-white text-xs font-extrabold">
                      {item.category}
                    </span>
                  ) : null}
                  <h3 className="text-white font-extrabold text-lg leading-snug line-clamp-2 mb-2 break-keep">
                    {item.subject}
                  </h3>
                  {item.date ? (
                    <time className="text-slate-300 text-sm font-medium">{item.date}</time>
                  ) : null}
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
