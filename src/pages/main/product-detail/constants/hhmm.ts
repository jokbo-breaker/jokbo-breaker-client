export const hhmm = (ts?: string | null) => {
  if (!ts) return '';
  const t = ts.split(' ')[1] || '';
  const [h = '00', m = '00'] = t.split(':');
  return `${h}:${m}`;
};
