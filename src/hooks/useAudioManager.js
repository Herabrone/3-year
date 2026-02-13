import { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';

/**
 * Custom hook for managing audio playback across sections
 * Handles track switching with fade transitions
 */
export const useAudioManager = (sections, currentSectionIndex) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRefs = useRef({});
  const fadeInterval = useRef(null);

  // Initialize all audio tracks
  useEffect(() => {
    let loadedCount = 0;
    const totalTracks = sections.length;

    sections.forEach((section, index) => {
      if (section.audioTrack) {
        audioRefs.current[index] = new Howl({
          src: [`/audio/${section.audioTrack}`],
          html5: true, // Use HTML5 Audio for better mobile support
          preload: true,
          volume: 0,
          onload: () => {
            loadedCount++;
            if (loadedCount === totalTracks) {
              setIsLoading(false);
            }
          },
          onloaderror: (id, error) => {
            console.error(`Failed to load audio for section ${index}:`, error);
            loadedCount++;
            if (loadedCount === totalTracks) {
              setIsLoading(false);
            }
          },
        });
      }
    });

    // Cleanup on unmount
    return () => {
      Object.values(audioRefs.current).forEach(sound => {
        if (sound) sound.unload();
      });
    };
  }, [sections]);

  // Fade audio in or out
  const fadeAudio = (sound, targetVolume, duration = 500) => {
    if (!sound) return Promise.resolve();

    return new Promise((resolve) => {
      const startVolume = sound.volume();
      const volumeDiff = targetVolume - startVolume;
      const steps = 50;
      const stepTime = duration / steps;
      const volumeStep = volumeDiff / steps;
      let currentStep = 0;

      if (fadeInterval.current) {
        clearInterval(fadeInterval.current);
      }

      fadeInterval.current = setInterval(() => {
        currentStep++;
        const newVolume = startVolume + (volumeStep * currentStep);
        sound.volume(Math.max(0, Math.min(1, newVolume)));

        if (currentStep >= steps) {
          clearInterval(fadeInterval.current);
          sound.volume(targetVolume);
          resolve();
        }
      }, stepTime);
    });
  };

  // Switch to a different track
  const switchTrack = async (newIndex) => {
    if (newIndex === currentTrack) return;

    const oldSound = audioRefs.current[currentTrack];
    const newSound = audioRefs.current[newIndex];

    if (!newSound) return;

    // Fade out old track
    if (oldSound && oldSound.playing()) {
      await fadeAudio(oldSound, 0, 500);
      oldSound.stop();
    }

    // Start and fade in new track
    setCurrentTrack(newIndex);
    newSound.volume(0);
    newSound.play();
    await fadeAudio(newSound, 0.7, 500);
    setIsPlaying(true);
  };

  // Watch for section changes
  useEffect(() => {
    if (!isLoading && currentSectionIndex !== currentTrack) {
      switchTrack(currentSectionIndex);
    }
  }, [currentSectionIndex, isLoading]);

  // Play audio (called after user interaction)
  const play = () => {
    const sound = audioRefs.current[currentTrack];
    if (sound && !sound.playing()) {
      sound.volume(0);
      sound.play();
      fadeAudio(sound, 0.7, 500);
      setIsPlaying(true);
    }
  };

  // Pause audio
  const pause = () => {
    const sound = audioRefs.current[currentTrack];
    if (sound) {
      fadeAudio(sound, 0, 500).then(() => {
        sound.pause();
        setIsPlaying(false);
      });
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return {
    play,
    pause,
    togglePlay,
    isPlaying,
    isLoading,
    currentTrack,
  };
};
