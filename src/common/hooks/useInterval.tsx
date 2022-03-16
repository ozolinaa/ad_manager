import { useEffect } from "react";

const useInterval = (
  intervalMilliseconds: number,
  callback: () => void
): void => {
  useEffect(() => {
    if (intervalMilliseconds <= 0) {
      return;
    }
    const intervalId = setInterval(callback, intervalMilliseconds);

    // return a callback function to cleanup the effect (perform clearInterval when component unmounts)
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalMilliseconds]);
};

export default useInterval;
