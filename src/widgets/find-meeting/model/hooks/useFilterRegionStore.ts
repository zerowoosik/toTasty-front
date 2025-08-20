import { create } from 'zustand';

interface FilterState {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
}

const useFilterRegionStore = create<FilterState>()((set) => ({
  isOpen: false,
  setIsOpen: (open: boolean) => set({ isOpen: open }),
  selectedRegion: '지역 전체',
  setSelectedRegion: (region: string) => set({ selectedRegion: region }),
}));

export default useFilterRegionStore;
