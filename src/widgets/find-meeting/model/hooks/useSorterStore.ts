import { create } from 'zustand';

interface SorterState {
  selectedSorter: string;
  setSelectedSorter: (sorter: string) => void;
}

const useSorterStore = create<SorterState>()((set) => ({
  selectedSorter: '최신순',
  setSelectedSorter: (sorter: string) => set({ selectedSorter: sorter }),
}));

export default useSorterStore;
