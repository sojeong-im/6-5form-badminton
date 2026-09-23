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

  const categories = [
    { label: '전체', emoji: '✨' },
    { label: '배드민턴', emoji: '🏸' },
    { label: '탁구', emoji: '🏓' },
    { label: '야외/족구', emoji: '⚽' },
    { label: '친목/뒤풀이', emoji: '🎉' },
  ];

  const filteredPhotos =
    filter === '전체'
      ? photos
      : photos.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/70 via-[#f8fafc] to-white py-6 px-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Top Header */}
        <div className="mb-5 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>돌아가기</span>
          </button>

          <button
            type="button"
            onClick={onGoToApply}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0284c7] to-[#081d47] hover:opacity-95 text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            지원하기 ✨
          </button>
        </div>

        {/* Title & Filter */}
        <div className="mb-5 p-5 rounded-2xl bg-white border border-sky-100 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>활동 사진</span>
              <span className="text-lg">📸</span>
            </h1>
            <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
              {filteredPhotos.length}장
            </span>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {categories.map((cat) => (
              <button
                key={cat.label}
                type="button"
                onClick={() => setFilter(cat.label)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  filter === cat.label
                    ? 'bg-[#081d47] text-white shadow-xs'
                    : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-2xl overflow-hidden bg-slate-100 cursor-pointer aspect-square border border-slate-200/80 shadow-xs hover:shadow-md transition"
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-semibold drop-shadow truncate">
                  {photo.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Apply CTA Card */}
        <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-sky-500 via-sky-600 to-[#081d47] text-center text-white shadow-lg shadow-sky-600/15 flex flex-col items-center">
          <span className="text-2xl mb-1">🏸 🏓 ⚽</span>
          <h2 className="text-base font-bold">네트워크와 함께 뛰어볼까요?</h2>
          <button
            type="button"
            onClick={onGoToApply}
            className="mt-3.5 w-full max-w-xs py-3 rounded-2xl bg-white hover:bg-slate-50 text-[#081d47] font-extrabold text-sm shadow-md transition cursor-pointer"
          >
            지금 지원하기 ✨
          </button>
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="w-full h-auto max-h-[70vh] object-contain bg-slate-900"
              />
              <div className="p-4 flex items-center justify-between bg-white border-t border-slate-100">
                <span className="text-sm font-bold text-slate-800">
                  {selectedPhoto.title}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPhoto(null);
                    onGoToApply();
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-[#081d47] text-white text-xs font-bold transition cursor-pointer"
                >
                  지원하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

