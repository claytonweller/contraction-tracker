export interface ICalculatedLabor {
  contraction: {
    averageDuration: number;
    averageIntensity: number;
    durations: number[]
    intensities: number[]
  }
  rest: {
    currentDuration?: number;
    averageDuration: number;
    durations: number[];
  }
  isGoTime: boolean;
}