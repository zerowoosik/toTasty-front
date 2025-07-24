import { create } from 'zustand';

interface FilterState {
  selectedCalendar: boolean;
  toggleCalendarSelection: () => void;
  date: Date;
}

const useFilterCalendarStore = create<FilterState>()((set) => ({
  selectedCalendar: false,
  toggleCalendarSelection: () => {
    set((state) => {
      if (state.selectedCalendar) {
        Object.assign(state, { selectedCalendar: false });
      } else {
        Object.assign(state, { selectedCalendar: true });
      }
      return { selectedCalendar: state.selectedCalendar };
    });
  },
  date: new Date(),
}));

export default useFilterCalendarStore;
