import { create } from 'zustand';

interface RatingState {
  selectedRating: number;
  setSelectedRating: (rating: number) => void;
}

const useRatingStore = create<RatingState>()((set) => ({
  selectedRating: 1,
  setSelectedRating: (rating: number) => set({ selectedRating: rating }),
}));

export default useRatingStore;
