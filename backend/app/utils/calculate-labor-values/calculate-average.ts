export function calculateAverage(arr: number[]): number {
  if(!arr.length) return 0
  const total = arr.reduce((sum, duration) => sum + duration, 0)
  return total / arr.length
}