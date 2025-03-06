export function getPercentageValue(sub: number, total: number) {
  return `${Math.round((sub / total) * 100)}%`;
}
