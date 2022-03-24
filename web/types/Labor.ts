import { IContraction } from "./Contraction";
import { ICalculatedLabor } from "./CalculatedLabor";

export interface ILabor {
  userId: string;
  startTime: string; // ISO date
  endTime?: string; // ISO date
  contractions: IContraction[];
  calculated: ICalculatedLabor;
  bishopScore: number;
  continuing?: boolean;
}