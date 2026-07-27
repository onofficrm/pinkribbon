import { motion } from 'motion/react';
import { BadgeCheck, GitCompareArrows, ShieldCheck, UserRound } from 'lucide-react';
import { contactInfo, keywords, phoneCtaLabel, phoneCtaSubLabel, regionName, telHref } from '../data';

/** AEO: 뚫기 vs 청소 판단 가이드 */
export const CompareGuide = () => (
  <section id="compare" className="py-20 md:py-24 bg-slate-50 scroll-mt-20" aria-labelledby="compare-heading">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center gap-2 text-orange-600 font-extrabold text-sm mb-4">
        <GitCompareArrows className="w-4 h-4" />
        증상 판단 가이드
      </div>
      <h2 id="compare-heading" className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3 break-keep">
        하수구 뚫기와 청소,<br className="md:hidden" /> 무엇이 다른가요?
      </h2>
      <p className="text-slate-600 font-medium max-w-3xl mb-10 break-keep leading-relaxed">
        같은 증상처럼 보여도 대응이 다릅니다. {keywords.main} 상담 전에 아래 기준으로 먼저 구분해 보세요.
      </p>

      <div className="grid md:grid-cols-2 gap-5 mb-8">
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200 bg-white p-7 md:p-8"
        >
          <h3 className="text-xl font-extrabold text-slate-900 mb-3">단순 뚫기가 맞는 경우</h3>
          <ul className="space-y-2 text-slate-600 font-medium break-keep">
            <li>· 갑자기 한 곳만 막히고 다른 배수구는 정상</li>
            <li>· 이물질이 입구 근처에 걸린 것이 분명할 때</li>
            <li>· 한 번 해결 후 재발이 거의 없을 때</li>
          </ul>
        </motion.article>
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="rounded-3xl border border-orange-200 bg-orange-50/60 p-7 md:p-8"
        >
          <h3 className="text-xl font-extrabold text-slate-900 mb-3">청소·점검이 필요한 경우</h3>
          <ul className="space-y-2 text-slate-700 font-medium break-keep">
            <li>· 같은 곳이 반복해서 막히거나 배수가 계속 느릴 때</li>
            <li>· 악취·역류가 함께 있을 때</li>
            <li>· 약·뚫어뻥으로도 금방 다시 막힐 때</li>
          </ul>
        </motion.article>
      </div>

      <p className="text-slate-700 font-semibold break-keep leading-relaxed max-w-3xl">
        원진하수구는 입구만 여는 작업보다, 배관 안쪽 오염·누적 원인을 확인해 재발을 줄이는 {regionName} 하수구청소 상담을 안내합니다.
        정확한 비용은 현장 상태 확인 후 안내합니다.
      </p>
    </div>
  </section>
);

/** GEO/E-E-A-T: 업체 신뢰·연락 정보(NAP) */
export const TrustIdentity = () => (
  <section id="about-trust" className="py-20 md:py-24 bg-white scroll-mt-20" aria-labelledby="trust-heading">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-10 items-start">
        <div>
          <div className="inline-flex items-center gap-2 text-orange-600 font-extrabold text-sm mb-4">
            <ShieldCheck className="w-4 h-4" />
            왜 원진하수구인가
          </div>
          <h2 id="trust-heading" className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4 break-keep">
            {regionName} 하수구청소·막힘,<br />
            필요한 작업만 정확하게
          </h2>
          <p className="text-slate-600 font-medium leading-relaxed break-keep mb-6 max-w-2xl">
            {contactInfo.companyName}는 {keywords.main}·{keywords.clog}를 중심으로 주거·상가 배관 청소와 악취·역류·막힘 점검을 상담합니다.
            과잉 공사 권유 없이, 증상과 현장 구조에 맞는 범위를 먼저 설명합니다.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              '강동구 동별·인접 지역(송파·광진·하남) 상담',
              '싱크대·배수구·정화조 등 증상별 허브 페이지 제공',
              '사진 상담으로 점검 방향 선안내',
              '작업 전 범위 설명 · 작업 후 배수 확인',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-slate-700 font-semibold break-keep">
                <BadgeCheck className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <a
              href={telHref()}
              className="inline-flex flex-col items-center justify-center gap-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-2xl font-extrabold leading-none"
            >
              <span className="text-xs opacity-95">{phoneCtaSubLabel(regionName)}</span>
              <span className="text-xl tracking-tight">{phoneCtaLabel(regionName)}</span>
            </a>
            <a
              href="/page/about.php"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-4 rounded-2xl font-extrabold"
            >
              <UserRound className="w-4 h-4" />
              회사소개 보기
            </a>
          </div>
        </div>

        <aside className="rounded-[2rem] bg-slate-950 text-white p-7 md:p-9 shadow-xl">
          <h3 className="text-lg font-extrabold mb-5">사업자·연락 정보 (NAP)</h3>
          <dl className="space-y-4 text-sm md:text-base">
            <div>
              <dt className="text-slate-400 font-bold mb-1">상호</dt>
              <dd className="font-extrabold text-lg">{contactInfo.companyName}</dd>
            </div>
            <div>
              <dt className="text-slate-400 font-bold mb-1">대표</dt>
              <dd className="font-semibold">{contactInfo.ceo || '상담 시 안내'}</dd>
            </div>
            <div>
              <dt className="text-slate-400 font-bold mb-1">주소</dt>
              <dd className="font-semibold break-keep">{contactInfo.address || `${regionName} 일대 출동 상담`}</dd>
            </div>
            <div>
              <dt className="text-slate-400 font-bold mb-1">전화</dt>
              <dd>
                <a href={telHref()} className="text-orange-400 font-extrabold text-xl hover:text-orange-300">
                  {contactInfo.phoneFormatted}
                </a>
              </dd>
            </div>
            {contactInfo.businessNumber ? (
              <div>
                <dt className="text-slate-400 font-bold mb-1">사업자등록번호</dt>
                <dd className="font-semibold">{contactInfo.businessNumber}</dd>
              </div>
            ) : null}
          </dl>
          <p className="mt-6 text-slate-400 text-xs leading-relaxed break-keep">
            네이버·구글 비즈니스 프로필의 상호·주소·전화는 위 정보와 동일하게 맞춰 주세요. (NAP 일관성)
          </p>
        </aside>
      </div>
    </div>
  </section>
);
