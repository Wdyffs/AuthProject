export function countValidator(count: number): string {
  if (count / 1000 < 1) {
    return String(count)
  } else {
    const thousand = Math.floor(count / 1000);
    return thousand === count / 1000 ? `${thousand}k` : `${thousand}k+`
  }
}