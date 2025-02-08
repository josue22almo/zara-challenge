import { cn } from '@/lib/utils';
import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';

interface LoadingBarProps {
  isLoading: boolean;
  color?: string;
  className?: string;
}

export interface LoadingBarRef {
  start: () => void;
  stop: () => void;
  complete: () => void;
}

export const LoadingBar = forwardRef<LoadingBarRef, LoadingBarProps>(({ isLoading, color, className }, ref) => {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(isLoading);

  useImperativeHandle(ref, () => ({
    start() {
      setActive(true);
    },
    stop() {
      setActive(false);
    },
    complete() {
      console.log('complete');
      setProgress(100);
      setTimeout(() => {
        setProgress(0);
        setActive(false);
      }, 500);
    }
  }));

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (active) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => (Math.min(prev + 10, 100)));
        if (progress === 100) {
          clearInterval(interval!);
        }
      }, 500);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', zIndex: 50 }} className={className}>
      <div 
        style={{ width: `${progress}%`, height: '100%', backgroundColor: `${color || '#007bff'}`, transition: 'width 0.2s ease-in-out' }} 
        className={
          cn(
            className
          )
        }
        />
    </div>
  );
});
