import { create } from 'zustand';

interface FilterState {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const useFilterRegionStore = create<FilterState>()((set) => ({
  isOpen: false,
  setIsOpen: (open: boolean) => set({ isOpen: open }),
}));

export default useFilterRegionStore;
