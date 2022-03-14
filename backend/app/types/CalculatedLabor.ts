export interface ICalculatedLabor {
  contraction: {
    averageDuration: number; // Seconds
    averageIntensity: number;
    durations: number[] // Seconds
    intensities: number[]
  }
  rest: {
    currentDuration?: number; // seconds
    averageDuration: number; // seconds
    durations: number[]; // seconds
  }
  isGoTime: boolean;
}