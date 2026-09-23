import { useState, useEffect, type FC } from 'react';
import {
  Users,
  Search,
  Download,
  RefreshCw,
  Trash2,
  Eye,
  ArrowLeft,
  Lock,
  X,
} from 'lucide-react';

import { getApplications, deleteApplication, type ApplicationRecord } from '../firebase';

interface AdminScreenProps {
  onBackToHome: () => void;
}

const ADMIN_PIN = '00347';

export const AdminScreen: FC<AdminScreenProps> = ({ onBackToHome }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('ADMIN_AUTH') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState<string>('전체');
  const [selectedApp, setSelectedApp] = useState<ApplicationRecord | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getApplications();
      setApplications(data);
    } catch (err) {
      console.error('지원서 로드 실패:', err);
      alert('지원서 목록을 불러오는 중 오류가 발생했습니다. (Firestore 보안 규칙을 확인해주세요)');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem('ADMIN_AUTH', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('ADMIN_AUTH');
    setPinInput('');
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`'${name}' 지원자의 접수 내역을 삭제하시겠습니까?`)) {
      try {
        await deleteApplication(id);
        setApplications((prev) => prev.filter((a) => a.id !== id));
        if (selectedApp?.id === id) setSelectedApp(null);
      } catch (err) {
        console.error('삭제 실패:', err);
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const exportToCSV = () => {
    if (applications.length === 0) {
      alert('다운로드할 지원서 데이터가 없습니다.');
      return;
    }

    const headers = [
      '접수일시',
      '이름',
      '성별',
      '나이',
      '학교',
      '전공',
      '학적상태',
      '거주지',
      '연락처',
      '희망종목',
      '운동빈도',
      '종목경험',
      '가능요일',
      '가능시간',
      '기대하는점',
      '자기소개',
    ];

    const rows = applications.map((app) => [
      `"${app.submittedAt || ''}"`,
      `"${app.name || ''}"`,
      `"${app.gender || ''}"`,
      `"${app.age || ''}"`,
      `"${app.university || ''}"`,
      `"${app.major || ''}"`,
      `"${app.academicStatus || ''}"`,
      `"${app.residence || ''}"`,
      `"${app.phone || ''}"`,
      `"${(app.sports || []).join(', ')}"`,
      `"${app.exerciseFrequency || ''}"`,
      `"${(app.experienceCustomNotes || '').replace(/"/g, '""')}"`,
      `"${(app.availableDays || []).join(', ')}"`,
      `"${(app.availableTimes || []).join(', ')}"`,
      `"${(app.expectations || []).join(', ')}"`,
      `"${(app.introduction || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `네트워크3기_지원서목록_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered List
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      (app.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.university || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.phone || '').includes(searchTerm) ||
      (app.major || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSport =
      selectedSport === '전체' ||
      (app.sports || []).some((s) => s.includes(selectedSport));

    return matchesSearch && matchesSport;
  });

  // Statistics
  const totalCount = applications.length;
  const badmintonCount = applications.filter((a) => (a.sports || []).some((s) => s.includes('배드민턴'))).length;
  const pingpongCount = applications.filter((a) => (a.sports || []).some((s) => s.includes('탁구'))).length;
  const jokguCount = applications.filter((a) => (a.sports || []).some((s) => s.includes('족구'))).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-xl border border-slate-200 text-center">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">네트워크 관리자 인증</h2>
          <p className="text-xs text-slate-500 mt-1 mb-5">
            운영진 전용 페이지입니다. 비밀번호를 입력해주세요.
          </p>

          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="비밀번호 입력"
              autoFocus
              className="w-full text-center tracking-widest text-base font-bold bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500 focus:bg-white transition"
            />

            {pinError && (
              <p className="text-xs font-semibold text-rose-500">비밀번호가 올바르지 않습니다.</p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#081d47] hover:bg-[#041434] text-white text-xs font-bold transition shadow-sm cursor-pointer"
            >
              로그인
            </button>
          </form>

          <button
            type="button"
            onClick={onBackToHome}
            className="mt-4 text-xs font-semibold text-slate-400 hover:text-slate-600 transition"
          >
            ← 홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 pb-16">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToHome}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
              title="홈으로"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-lg">🏸</span>
              <h1 className="text-base font-bold text-slate-900">네트워크 3기 지원자 관리</h1>
              <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                실시간 연동중
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadData}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">새로고침</span>
            </button>

            <button
              type="button"
              onClick={exportToCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>엑셀 다운로드</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 text-xs font-medium transition cursor-pointer"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
              <span>총 지원자</span>
              <Users className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{totalCount}명</div>
          </div>

          <div className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-emerald-800 text-xs font-medium mb-1">
              <span>배드민턴</span>
              <span className="text-base">🏸</span>
            </div>
            <div className="text-2xl font-extrabold text-emerald-600">{badmintonCount}명</div>
          </div>

          <div className="bg-white border border-rose-100 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-rose-800 text-xs font-medium mb-1">
              <span>탁구</span>
              <span className="text-base">🏓</span>
            </div>
            <div className="text-2xl font-extrabold text-rose-600">{pingpongCount}명</div>
          </div>

          <div className="bg-white border border-sky-100 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-sky-800 text-xs font-medium mb-1">
              <span>족구</span>
              <span className="text-base">⚽</span>
            </div>
            <div className="text-2xl font-extrabold text-sky-600">{jokguCount}명</div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="이름, 학교, 전공, 전화번호 검색..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition"
            />
          </div>

          {/* Sport Filter Chips */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['전체', '배드민턴', '탁구', '족구'].map((sport) => (
              <button
                key={sport}
                type="button"
                onClick={() => setSelectedSport(sport)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedSport === sport
                    ? 'bg-[#081d47] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>

        {/* Table / List View */}
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-16 text-center text-slate-400 text-xs font-medium flex flex-col items-center gap-2">
              <RefreshCw className="w-6 h-6 animate-spin text-sky-600" />
              <span>데이터를 불러오는 중입니다...</span>
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-xs font-medium">
              등록된 지원서가 없거나 검색 결과가 없습니다.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <tr>
                    <th className="py-3 px-4">접수일</th>
                    <th className="py-3 px-4">이름 / 성별 / 나이</th>
                    <th className="py-3 px-4">소속</th>
                    <th className="py-3 px-4">연락처</th>
                    <th className="py-3 px-4">희망 종목</th>
                    <th className="py-3 px-4">가능 일정</th>
                    <th className="py-3 px-4 text-center">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/80 transition group">
                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap font-mono text-[11px]">
                        {app.submittedAt ? app.submittedAt.slice(0, 10) : '-'}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                        {app.name}
                        <span className="ml-1.5 font-normal text-slate-500 text-[11px]">
                          ({app.gender} / {app.age}세)
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                        <span className="font-semibold text-slate-800">{app.university}</span>
                        <span className="text-slate-400 ml-1">· {app.major}</span>
                        <span className="ml-1.5 text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">
                          {app.academicStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-700 whitespace-nowrap">
                        {app.phone}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {(app.sports || []).map((s) => (
                            <span
                              key={s}
                              className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-100 text-[11px] font-medium"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                        <span>{(app.availableDays || []).join(' ')}</span>
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => setSelectedApp(app)}
                            className="p-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 transition cursor-pointer"
                            title="상세보기"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(app.id, app.name)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition cursor-pointer"
                            title="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedApp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedApp(null)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  {selectedApp.name} 지원자 상세
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  접수일: {selectedApp.submittedAt}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">성별 / 나이</span>
                  <span className="font-bold text-slate-800">{selectedApp.gender} / {selectedApp.age}세</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">소속 대학 / 전공</span>
                  <span className="font-semibold text-slate-800">{selectedApp.university} {selectedApp.major} ({selectedApp.academicStatus})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">거주지</span>
                  <span className="font-semibold text-slate-800">{selectedApp.residence}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">연락처</span>
                  <a
                    href={`tel:${selectedApp.phone}`}
                    className="font-mono font-bold text-sky-600 hover:underline"
                  >
                    {selectedApp.phone}
                  </a>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-1 font-semibold">희망 종목</span>
                <div className="flex flex-wrap gap-1">
                  {(selectedApp.sports || []).map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-100">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block mb-0.5">운동 빈도</span>
                  <span className="font-bold text-slate-800">{selectedApp.exerciseFrequency || '-'}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block mb-0.5">종목 경험</span>
                  <span className="font-bold text-slate-800">{selectedApp.experienceCustomNotes || '없음'}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <span className="text-slate-400 block font-semibold">가능 일정</span>
                <div>
                  <span className="text-slate-500 mr-2">요일:</span>
                  <span className="font-bold text-slate-800">{(selectedApp.availableDays || []).join(', ') || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-500 mr-2">시간:</span>
                  <span className="font-bold text-slate-800">{(selectedApp.availableTimes || []).join(', ') || '-'}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-1 font-semibold">동아리에서 기대하는 것</span>
                <div className="flex flex-wrap gap-1">
                  {(selectedApp.expectations || []).map((e) => (
                    <span key={e} className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 font-medium border border-sky-100">
                      {e}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100">
                <span className="text-amber-800 font-bold block mb-1">본인 소개 & 한마디</span>
                <p className="text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {selectedApp.introduction || '(작성 내용 없음)'}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
