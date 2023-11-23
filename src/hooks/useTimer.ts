import { useEffect, useState } from 'react';

type useTimerProps = {
  time: number;
};

export const useTimer = ({ time }: useTimerProps) => {
  const [timerState, setTimerState] = useState(false);

  useEffect(() => {
    if (timerState) {
      const timer = setTimeout(() => {
        setTimerState(false);
      }, time);
      return () => clearTimeout(timer);
    }
  }, [timerState, time]);

  return { timerState, setTimerState };
};
