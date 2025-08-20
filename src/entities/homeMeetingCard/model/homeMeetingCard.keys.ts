import { createQueryKeys } from '@lukemorales/query-key-factory';
import getNewMeetings from '../api/getNewMeetings';
import getWishlistMeetings from '../api/getWishlist';
// import getFavoriteMeetings from '../api/getFavoriteMeetings';
import getPopularMeetings from '../api/getPopularMeetings';

const homeMeetingCardKeys = createQueryKeys('homeMeetingCard', {
  newList: () => ({
    queryKey: ['new'],
    queryFn: () => getNewMeetings(),
  }),
  wishlist: (userId?: number) => ({
    queryKey: ['wishlist', userId],
    queryFn: () => getWishlistMeetings(),
  }),
  favorite: (interests: string[]) => ({
    queryKey: ['favorite', { interests: [...(interests ?? [])].sort() }],
  }),
  popular: () => ({
    queryKey: ['popular'],
    queryFn: () => getPopularMeetings(),
  }),
});

export default homeMeetingCardKeys;
