import { useState, useEffect } from 'react';

const ALPHABET = '!<>-_\\/[]{}—=+*^?#________';

export function useScramble(targetString: string, durationMs: number = 1500, startDelayMs: number = 0) {
  const [displayText, setDisplayText] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      
      const safeCharacters = Math.floor(progress * targetString.length);
      let scrambled = targetString.substring(0, safeCharacters);
      
      for (let i = safeCharacters; i < targetString.length; i++) {
        // Preserve newlines and spaces to prevent severe layout shifting during scramble
        if (targetString[i] === ' ' || targetString[i] === '\n') {
          scrambled += targetString[i];
        } else {
          scrambled += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        }
      }
      
      setDisplayText(scrambled);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setIsFinished(true);
        setDisplayText(targetString);
      }
    };

    const delayTimeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, startDelayMs);

    return () => {
      clearTimeout(delayTimeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [targetString, durationMs, startDelayMs]);

  return { displayText, isFinished };
}
