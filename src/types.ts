export interface FormData {
  // Step 1: 기본 인적사항
  name: string;
  gender: '남' | '여' | '기타' | '';
  age: string;
  university: string;
  major: string;
  academicStatus: '재학' | '휴학' | '졸업' | '기타' | '';
  residence: string;
  phone: string;

  // Step 2: 운동 성향 & 경험
  sports: string[]; // 배드민턴, 탁구, 족구, 다양하게
  exerciseFrequency: string; // 운동 빈도
  experienceBadminton: string;
  experienceTableTennis: string;
  experienceJokgu: string;
  experienceCustomNotes: string;

  // Step 3: 일정 & 기대사항
  availableDays: string[]; // 월, 화, 수, 목, 금, 토, 일
  availableTimes: string[]; // 14:00~16:00, 16:00~18:00, 18:00~20:00, 20:00 이후
  expectations: string[];

  // Step 4: 자기소개
  introduction: string;
}

export const INITIAL_DATA: FormData = {
  name: '',
  gender: '',
  age: '',
  university: '',
  major: '',
  academicStatus: '재학',
  residence: '',
  phone: '',

  sports: [],
  exerciseFrequency: '',
  experienceBadminton: '가끔',
  experienceTableTennis: '처음',
  experienceJokgu: '처음',
  experienceCustomNotes: '',

  availableDays: [],
  availableTimes: [],
  expectations: [],

  introduction: ''
};
