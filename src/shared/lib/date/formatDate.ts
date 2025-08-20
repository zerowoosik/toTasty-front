function formatTwoDigits(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

export function getFormattedDate(dateStr: string, type: string = ''): string {
  if (!dateStr) return '';

  try {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = formatTwoDigits(date.getMonth() + 1);
    const day = formatTwoDigits(date.getDate());

    switch (type) {
      case 'dot':
        return `${year}.${month}.${day}`;
      default:
        return `${month}월 ${day}일`;
    }
  } catch (error) {
    console.error('날짜 형식 변환 오류:', error);
    return '';
  }
}

export function getFormattedTime(dateStr: string, type: string = ''): string {
  if (!dateStr) return '';

  try {
    const date = new Date(dateStr);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = formatTwoDigits(hours);
    const formattedMinutes = formatTwoDigits(minutes);

    switch (type) {
      case 'withText':
        return `${formattedHours}시 ${formattedMinutes}분`;
      default:
        return `${formattedHours}:${formattedMinutes}`;
    }
  } catch (error) {
    console.error('시간 형식 변환 오류:', error);
    return '';
  }
}
