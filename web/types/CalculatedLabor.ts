export interface ICalculatedLabor {
  contraction: {
    averageDuration: number;
    averageIntensity: number;
    durations: number[]
    intensities: number[]
  }
  rest: {
    current: number;
    average: number;
    durations: number[];
  }
}