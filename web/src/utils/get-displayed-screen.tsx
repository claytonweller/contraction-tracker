import Home from "../components/Home";
import Labor from "../components/Labor";
import Contraction from "../components/Contraction";
import Intesnity from "../components/Intensity";
import GoTime from "../components/GoTime";
import { ILabor } from "../../types/Labor";
import { Dispatch, SetStateAction } from "react";

export const getDisplayedScreen = (
  screenName: string,
  [labor]: [ILabor, Dispatch<SetStateAction<ILabor>>]
) => {
  let displayedScreen = Home
  if (screenName === 'labor') displayedScreen = Labor
  if (screenName === 'contraction') displayedScreen = Contraction
  if (screenName === 'intensity') displayedScreen = Intesnity
  const itIsGoTime = labor.calculated?.isGoTime && screenName === 'labor'
  if (screenName === 'go-time' || itIsGoTime) displayedScreen = GoTime
  return displayedScreen
}