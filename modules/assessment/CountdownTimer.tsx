'use client';
import React from 'react';

interface ICountdown {
  minutes: number | any;
  seconds: number | any;
  action: () => void;
}

export const CountdownTimer = ({ minutes, seconds, action }: ICountdown) => {
  const [time, setTime] = React.useState<ICountdown>({ minutes, seconds, action });

  const tick = () => {
    if (time.minutes === null && time.seconds === null) {
      return;
    } else if (time.minutes === 0 && time.seconds === 0) {
      setTime({ minutes: null, seconds: null, action });
      action();
    } else if (time.seconds === 0) {
      if (time.minutes > 0) {
        setTime({ minutes: time.minutes - 1, seconds: 59, action });
      }
    } else {
      setTime({ minutes: time.minutes, seconds: time.seconds - 1, action });
    }
  };

  const reset = () => setTime({ minutes: time.minutes, seconds: time.seconds, action });

  React.useEffect(() => {
    const timerId = setInterval(() => {
      tick();
      if (time.minutes !== null && time.seconds !== null) {
        localStorage.setItem('minute', `${time.minutes}`);
        localStorage.setItem('second', `${time.seconds}`);
      } else {
        localStorage.removeItem('minute');
        localStorage.removeItem('second');
      }
    }, 1000);
    return () => clearInterval(timerId);
  });

  return (
    <div>
      <p>{`${time.minutes?.toString().padStart(2, '0')}:${time.seconds?.toString().padStart(2, '0')}`}</p>
    </div>
  );
};
