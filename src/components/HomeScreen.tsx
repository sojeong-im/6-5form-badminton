import type { FC } from 'react';

interface HomeScreenProps {
  onGoToApply: () => void;
  onGoToPhotos: () => void;
}

export const HomeScreen: FC<HomeScreenProps> = ({ onGoToApply, onGoToPhotos }) => {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center py-6 px-4">
      <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center text-center space-y-6">
        {/* Poster Image */}
        <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-white">
          <img
            src="/poster.jpg"
            alt="네트워크 동아리 포스터"
            className="w-full h-auto object-cover block"
          />
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3 pt-1">
          <button
            type="button"
            onClick={onGoToApply}
            className="w-full py-4 px-6 rounded-xl bg-[#0d3278] hover:bg-[#081d47] text-white font-bold text-base shadow-md transition-all active:scale-[0.99] cursor-pointer"
          >
            지원하기
          </button>

          <button
            type="button"
            onClick={onGoToPhotos}
            className="w-full py-4 px-6 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border-2 border-slate-200 shadow-sm transition-all active:scale-[0.99] cursor-pointer"
          >
            활동 사진 보기
          </button>
        </div>
      </div>
    </div>
  );
};
