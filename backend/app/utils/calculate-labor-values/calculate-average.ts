export function calculateAverage(arr: number[]): number {
  const total = arr.reduce((sum, duration) => sum + duration, 0)
  return total / arr.length
}