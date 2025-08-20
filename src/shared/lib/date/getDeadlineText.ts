import { getFormattedDate, getFormattedTime } from './formatDate';

export default function getDeadlineText(joinEndAt: string): {
  isToday: boolean;
  message: string;
} {
  const endDate = new Date(joinEndAt);
  const today = new Date();
  const isToday =
    today.getFullYear() === endDate.getFullYear() &&
    today.getMonth() === endDate.getMonth() &&
    today.getDate() === endDate.getDate();

  const date = isToday ? '오늘' : getFormattedDate(joinEndAt);
  const time = getFormattedTime(joinEndAt, 'withText');
  const message = `${date} ${time} 마감`;

  return { isToday, message };
}
