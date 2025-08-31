import { useEffect } from 'react';

const ScrollEffects = () => {
  useEffect(() => {
    // Enable smooth scrolling behavior for the whole document
    document.documentElement.style.scrollBehavior = 'smooth';

    // Cleanup on unmount
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return null; // No visual elements, just smooth scrolling behavior
};

export default ScrollEffects;
