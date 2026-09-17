import type { FC } from 'react';
import { Sparkles } from 'lucide-react';

interface HeroBannerProps {
  activeTab: 'photos' | 'apply';
  onTabChange: (tab: 'photos' | 'apply') => void;
}

export const HeroBanner: FC<HeroBannerProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="mt-3 mb-6">
      {/* Main Poster & Mascot Showcase Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#74c407] via-[#88d900] to-[#5ea102] p-5 sm:p-7 shadow-xl shadow-lime-600/20 text-white border-2 border-white/60">
        {/* Subtle background tennis court grid curves */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          {/* Poster Image Preview Card */}
          <div className="w-40 sm:w-48 shrink-0 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/90 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            <img
              src="/poster.jpg"
              alt="네트워크 동아리 공식 포스터"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Hero Content */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d3278] text-white text-xs font-black shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>네트 스포츠 크루 · 네트워크 3기 모집</span>
            </div>

            {/* Poster Catchphrase */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight drop-shadow-sm text-[#081d47]">
              “넘기는 건 공, <br className="hidden sm:inline" />
              <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
                가까워지는 건 우리.
              </span>”
            </h1>

            <p className="text-xs sm:text-sm font-semibold text-lime-950/90 leading-relaxed max-w-lg">
              배드민턴 🏸 · 탁구 🏓 · 족구 ⚽️ 누구나 환영해요!<br />
              운동 실력은 전혀 중요하지 않아요. 함께 땀 흘리고 웃으며 친해져요!
            </p>

            {/* Mascot Character Pills */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 pt-1">
              <span className="px-2.5 py-1 rounded-xl bg-white/90 text-[#0d3278] text-xs font-bold shadow-sm">
                🏸 셔틀콕
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-white/90 text-[#0d3278] text-xs font-bold shadow-sm">
                ⚽️ 족구공
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-white/90 text-[#0d3278] text-xs font-bold shadow-sm">
                🏓 탁구라켓
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-white/90 text-[#0d3278] text-xs font-bold shadow-sm">
                🤍 미니탁구공
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 2개의 메인 버튼: 들어가자마자 눈에 확 띄는 큼직한 팝 버튼 */}
      <div className="grid grid-cols-2 gap-3 mt-4 p-1.5 bg-white border-2 border-court-border rounded-2xl shadow-md shadow-lime-900/5">
        <button
          type="button"
          onClick={() => {
            onTabChange('photos');
            window.scrollTo({ top: 400, behavior: 'smooth' });
          }}
          className={`py-4 px-4 rounded-xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
            activeTab === 'photos'
              ? 'bg-[#0d3278] text-white shadow-lg shadow-blue-900/25 scale-[1.01]'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <span className="text-lg">📸</span>
          <span>활동 사진 둘러보기</span>
        </button>

        <button
          type="button"
          onClick={() => {
            onTabChange('apply');
            window.scrollTo({ top: 400, behavior: 'smooth' });
          }}
          className={`py-4 px-4 rounded-xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
            activeTab === 'apply'
              ? 'bg-gradient-to-r from-[#74c407] to-[#88d900] text-[#081d47] shadow-lg shadow-lime-500/30 scale-[1.01]'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <span className="text-lg">✍️</span>
          <span>지금 바로 지원하기</span>
        </button>
      </div>
    </div>
  );
};
