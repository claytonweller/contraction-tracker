export interface ICalculatedLabor {
  contraction: {
    averageDuration: number;
    averageIntensity: number;
    durations: number[]
    intensities: number[]
    averageDurations: number[]
  }
  rest: {
    currentDuration?: number;
    averageDuration: number;
    durations: number[];
  }
  isGoTime: boolean;
  contractionsAreLongEnough: boolean, 
  restsAreShortEnough: boolean, 
  laborIsLongEnough: boolean
}