import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import SwipeContainer from './components/SwipeContainer';
import { useAudioManager } from './hooks/useAudioManager';
import { anniversaryData, anniversaryMeta } from './data/anniversaryData';
import './App.css';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  // Initialize audio manager
  const audioManager = useAudioManager(anniversaryData, currentSection);

  const handleStart = () => {
    if (!audioManager.isLoading) {
      setHasStarted(true);
      // Start playing audio after user interaction
      audioManager.play();
    }
  };

  const handleSectionChange = (newIndex) => {
    setCurrentSection(newIndex);
    // Audio manager will automatically switch tracks via useEffect
  };

  return (
    <div className="app">
      {!hasStarted ? (
        <SplashScreen
          onStart={handleStart}
          title={anniversaryMeta.title}
          subtitle={anniversaryMeta.subtitle}
          dateRange={`${anniversaryMeta.startDate} - ${anniversaryMeta.endDate}`}
          isLoading={audioManager.isLoading}
        />
      ) : (
        <SwipeContainer
          sections={anniversaryData}
          onSectionChange={handleSectionChange}
        />
      )}
    </div>
  );
}

export default App;
