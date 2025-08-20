export function formatDate(d: Date) {
  // month/day를 숫자로만 받아서 직접 "월 일" 붙이기
  const parts = new Intl.DateTimeFormat('ko-KR', { month: 'numeric', day: 'numeric' })
    .formatToParts(d)
    .reduce<Record<string, string>>((acc, part) => {
      if (part.type !== 'literal') acc[part.type] = part.value;
      return acc;
    }, {});

  return `${parts.month}월 ${parts.day}일`;
}

export function formatTime(d: Date) {
  return new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(d);
}

export function formatDateToDotString(d: string) {
  const date = new Date(d);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}
