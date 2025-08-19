export const formatKRW = (n: number | '' = ''): string => {
  return typeof n === 'number' ? n.toLocaleString('ko-KR') : '';
};
