import React, { useState } from 'react';
import './App.css';
import { getDisplayedScreen } from './utils/get-displayed-screen'

export default function App() {

  const [screen, setScreen] = useState('home');
  const displayedScreen = getDisplayedScreen(screen, setScreen)

  return (
    <div className="App">
      <header className="App-header">
        {displayedScreen}
      </header>
    </div>
  );
}