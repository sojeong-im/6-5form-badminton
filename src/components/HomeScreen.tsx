import type { FC } from 'react';
import { Sparkles, ArrowRight, Camera, Users } from 'lucide-react';

interface HomeScreenProps {
  onGoToApply: () => void;
  onGoToPhotos: () => void;
  onGoToAdmin: () => void;
}

export const HomeScreen: FC<HomeScreenProps> = ({ onGoToApply, onGoToPhotos, onGoToAdmin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100/70 via-white to-emerald-50/50 flex flex-col items-center justify-center py-6 px-4">
      <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center">
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-sky-200/80 shadow-sm text-sky-700 text-xs font-bold mb-3 backdrop-blur-sm animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          <span>대학생 연합 운동 동아리 네트워크</span>
        </div>

        {/* Poster Card with subtle styling */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-sky-900/10 border-4 border-white bg-white group">
          <img
            src="/poster.jpg"
            alt="네트워크 동아리 포스터"
            className="w-full h-auto object-cover block transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </div>

        {/* Poster Key Visual Badges */}
        <div className="w-full grid grid-cols-3 gap-2 mt-4">
          <div className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold shadow-xs">
            <span className="text-base">🏸</span>
            <span>배드민턴</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-800 text-xs font-bold shadow-xs">
            <span className="text-base">🏓</span>
            <span>탁구</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-sky-50 border border-sky-200/80 text-sky-800 text-xs font-bold shadow-xs">
            <span className="text-base">⚽</span>
            <span>족구</span>
          </div>
        </div>

        {/* Eligibility Pill Badge */}
        <div className="w-full mt-2 py-2 px-4 rounded-xl bg-[#081d47] text-white flex items-center justify-center gap-2 text-xs font-medium shadow-sm">
          <Users className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-sky-200">모집대상</span>
          <span className="text-slate-400">|</span>
          <span className="font-semibold">서울·경기지역 대학생</span>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-2.5 mt-5">
          <button
            type="button"
            onClick={onGoToApply}
            className="group w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#081d47] hover:from-[#0369a1] hover:to-[#041434] text-white font-bold text-base shadow-lg shadow-sky-600/25 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <span>지금 바로 지원하기</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onClick={onGoToPhotos}
            className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200/90 shadow-sm transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4 text-sky-600" />
            <span>활동 사진 갤러리</span>
          </button>
        </div>

        {/* Minimal Tags */}
        <div className="flex items-center justify-center gap-2 mt-4 text-[11px] font-medium text-slate-400">
          <span>#초보환영</span>
          <span>•</span>
          <span>#라켓무료대여</span>
          <span>•</span>
          <span>#즐거운분위기</span>
        </div>

        {/* Subtle Admin Link */}
        <div className="mt-8 pt-4 border-t border-slate-200/50 w-full flex justify-center">
          <button
            type="button"
            onClick={onGoToAdmin}
            className="text-[11px] text-slate-400 hover:text-slate-600 transition flex items-center gap-1 cursor-pointer py-1 px-2.5 rounded-lg hover:bg-slate-100/60"
          >
            <span>운영진 관리자 페이지</span>
            <span className="text-[10px]">🔒</span>
          </button>
        </div>
      </div>
    </div>
  );
};


