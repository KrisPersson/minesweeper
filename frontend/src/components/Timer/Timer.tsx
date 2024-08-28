import "./Timer.css";
import useTimer from "easytimer-react-hook";
import { useEffect } from "react";

export default function Timer() {
  /* The hook returns an EasyTimer instance and a flag to see if the target has been achieved */
  const [timer, isTargetAchieved] = useTimer();

  function startTimer() {
    timer.start({
      /* EasyTimer start configuration */
      startValues: { seconds: 0 }, // Start the countdown from 1 minute
    });
  }

  function stopTimer() {
    timer.stop();
  }

  useEffect(() => {
    startTimer();
  }, []);

  return <h2 className="timer">{timer.getTimeValues().toString()}</h2>;
}
