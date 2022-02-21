import React, { useState } from "react";
import Home from "../components/Home";
import Labor from "../components/Labor";
import Contraction from "../components/Contraction";
import Intesnity from "../components/Intensity";
import GoTime from "../components/GoTime";



export const getDisplayedScreen = (screen: string, setScreen: (sceenName: string) => void) => {
  const transitionScreen = (screenName: string = 'home') => () => setScreen(screenName)

  let displayedScreen = <Home transitionScreen={transitionScreen} />
  if (screen === 'labor') displayedScreen = <Labor transitionScreen={transitionScreen} />
  if (screen === 'contraction') displayedScreen = <Contraction transitionScreen={transitionScreen} />
  if (screen === 'intensity') displayedScreen = <Intesnity transitionScreen={transitionScreen} />
  if (screen === 'go-time') displayedScreen = <GoTime transitionScreen={transitionScreen} />
  return displayedScreen
}
