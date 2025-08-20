import { create } from 'zustand';

interface GlobalErrorStatus {
  status: number | null;
  errorData: object | null;
  // reponse data 는 API 마다 다르기 때문에 이례적으로 any 사용

  setGlobalError: (status: number | null, errorData?: object | null) => void;
  clearGlobalError: () => void;
}

const useGlobalErrorStore = create<GlobalErrorStatus>((set) => ({
  status: null,
  errorData: null,
  setGlobalError: (status, errorData = null) =>
    set({
      status,
      errorData,
    }),
  clearGlobalError: () =>
    set({
      status: null,
      errorData: null,
    }),
}));

export default useGlobalErrorStore;
