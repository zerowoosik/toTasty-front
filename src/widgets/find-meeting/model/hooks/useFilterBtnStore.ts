import { create } from 'zustand';

interface FilterState {
  selectedFileterBtnId: string;
  setSelectedFilterBtnId: (filterName: string) => void;
}

const useFilterBtnStore = create<FilterState>()((set) => ({
  selectedFileterBtnId: 'filterBtn0',
  setSelectedFilterBtnId: (filterId) => set({ selectedFileterBtnId: filterId }),
}));

export default useFilterBtnStore;
