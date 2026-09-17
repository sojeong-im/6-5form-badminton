import { useState, type FC } from 'react';
import { ArrowLeft, X } from 'lucide-react';

interface PhotosScreenProps {
  onBackToHome: () => void;
  onGoToApply: () => void;
}

interface PhotoItem {
  id: string;
  src: string;
  title: string;
  category: '배드민턴' | '탁구' | '야외/족구' | '친목/뒤풀이';
}

export const PhotosScreen: FC<PhotosScreenProps> = ({ onBackToHome, onGoToApply }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [filter, setFilter] = useState<string>('전체');

  const photos: PhotoItem[] = [
    { id: '1', src: '/activities/badminton_all_courts.jpg', title: '체육관 정기 세션', category: '배드민턴' },
    { id: '2', src: '/activities/badminton_court.jpg', title: '실내 체육관 모임', category: '배드민턴' },
    { id: '3', src: '/activities/badminton_serve_05.jpg', title: '05번 코트 경기', category: '배드민턴' },
    { id: '4', src: '/activities/badminton_match_05.jpg', title: '복식 매치', category: '배드민턴' },
    { id: '5', src: '/activities/court_rally.jpg', title: '체육관 랠리', category: '배드민턴' },
    { id: '6', src: '/activities/scoreboard.jpg', title: '스코어보드', category: '배드민턴' },
    { id: '7', src: '/activities/badminton_net.jpg', title: '코트 & 네트', category: '배드민턴' },
    { id: '8', src: '/activities/aircon_cool.jpg', title: '운동 후 휴식', category: '친목/뒤풀이' },
    { id: '9', src: '/activities/pingpong_club.jpg', title: '탁구장 단체전', category: '탁구' },
    { id: '10', src: '/activities/table_tennis_match.jpg', title: '탁구 랠리', category: '탁구' },
    { id: '11', src: '/activities/table_tennis_ball.jpg', title: '탁구 세션', category: '탁구' },
    { id: '12', src: '/activities/pingpong_selfie.jpg', title: '크루 셀피', category: '탁구' },
    { id: '13', src: '/activities/outdoor_game.jpg', title: '야외 네트 게임', category: '야외/족구' },
    { id: '14', src: '/activities/night_outdoor.jpg', title: '야간 네트 스포츠', category: '야외/족구' },
    { id: '15', src: '/activities/crew_group.jpg', title: '크루 단체 사진', category: '친목/뒤풀이' },
    { id: '16', src: '/activities/boardgame_fun.jpg', title: '보드게임 친목', category: '친목/뒤풀이' },
    { id: '17', src: '/activities/racket_fun.jpg', title: '유쾌한 순간', category: '친목/뒤풀이' },
    { id: '18', src: '/activities/dinner.jpg', title: '고기 회식 & 뒤풀이', category: '친목/뒤풀이' },
  ];

  const categories = ['전체', '배드민턴', '탁구', '야외/족구', '친목/뒤풀이'];

  const filteredPhotos =
    filter === '전체'
      ? photos
      : photos.filter((p) => p.category === filter);

  return (
    <div className="w-full max-w-2xl mx-auto py-6 px-4">
      {/* Top Header */}
      <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>처음으로</span>
        </button>

        <button
          type="button"
          onClick={onGoToApply}
          className="px-4 py-1.5 rounded-lg bg-[#0d3278] hover:bg-[#081d47] text-white text-xs font-bold transition shadow-sm"
        >
          지원하기
        </button>
      </div>

      {/* Title & Filter */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          활동 사진
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          네트워크 정기 운동 및 친목 현장 사진입니다.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filter === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="group relative rounded-xl overflow-hidden bg-slate-100 cursor-pointer aspect-square border border-slate-200/80 hover:border-slate-400 transition"
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
              <span className="text-white text-xs font-semibold drop-shadow truncate">
                {photo.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Apply CTA */}
      <div className="mt-10 p-6 bg-slate-100 rounded-2xl text-center space-y-3">
        <p className="text-sm font-semibold text-slate-800">
          함께 운동하고 싶으시다면 네트워크 3기에 지원해 보세요!
        </p>
        <button
          type="button"
          onClick={onGoToApply}
          className="w-full py-3.5 px-6 rounded-xl bg-[#0d3278] hover:bg-[#081d47] text-white font-bold text-sm shadow-md transition"
        >
          네트워크 3기 지원하기
        </button>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="w-full h-auto max-h-[75vh] object-contain bg-black"
            />
            <div className="p-4 flex items-center justify-between bg-white">
              <span className="text-sm font-semibold text-slate-800">
                {selectedPhoto.title}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedPhoto(null);
                  onGoToApply();
                }}
                className="px-3 py-1.5 rounded-lg bg-[#0d3278] text-white text-xs font-bold transition"
              >
                지원하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
