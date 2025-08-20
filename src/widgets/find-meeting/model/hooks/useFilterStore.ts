import { create } from 'zustand';
import { MeetingFilters, SortType } from '@/entities/meetings';

interface Filters {
  filters: MeetingFilters;
  setFilters: (filter: MeetingFilters) => void;
}

const useFilterStore = create<Filters>()((set) => ({
  filters: { sort: SortType.latest },
  setFilters: (filter: MeetingFilters) => set({ filters: filter }),
}));

export default useFilterStore;
