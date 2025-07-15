import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
// 테스트용 카운트 스토어 코드

interface CountState {
  count: number;
  increment: () => void;
}

export const useCountStore = create(
  persist<CountState>(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    {
      // Zustand의 persist 미들웨어를 사용하여 상태를 로컬 스토리지에 저장
      name: 'count-storage', // 로컬 스토리지에 저장할 때 사용할 키
      storage: createJSONStorage(() => localStorage), // 로컬 스토리지 사용
    },
  ),
);
