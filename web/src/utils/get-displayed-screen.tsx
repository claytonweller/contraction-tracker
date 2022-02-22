import Home from "../components/Home";
import Labor from "../components/Labor";
import Contraction from "../components/Contraction";
import Intesnity from "../components/Intensity";
import GoTime from "../components/GoTime";

export const getDisplayedScreen = (screenName: string) => {
  let displayedScreen = Home
  if (screenName === 'labor') displayedScreen = Labor
  if (screenName === 'contraction') displayedScreen = Contraction
  if (screenName === 'intensity') displayedScreen = Intesnity
  if (screenName === 'go-time') displayedScreen = GoTime
  return displayedScreen
}