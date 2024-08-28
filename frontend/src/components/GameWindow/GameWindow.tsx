import "./GameWindow.css";
import GameBoard from "../GameBoard/GameBoard";
import { useDispatch } from "react-redux";
import { resetGame, setTimerIsRunning } from "../../store/gameSlice";
import useTimer from "easytimer-react-hook";
import { useEffect } from "react";

export default function GameWindow() {
  const dispatch = useDispatch();

  function handleRestart() {
    dispatch(resetGame());
    startTimer();
  }

  const [timer] = useTimer();

  function startTimer() {
    timer.reset();
    timer.start({
      /* EasyTimer start configuration */
      startValues: { seconds: 0 }, // Start the countdown from 1 minute
    });
    dispatch(setTimerIsRunning(true));
  }

  function stopTimer() {
    timer.stop();
    dispatch(setTimerIsRunning(false));
  }

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <article className="gamewindow wrapper_window">
      <header className="gamewindow__header">
        <div className="stat_text">Player name: </div>
        <div className="stat_text">
          Timer: <h2 className="timer">{timer.getTimeValues().toString()}</h2>
        </div>
      </header>
      <section className="game-window__main">
        <GameBoard size={10} stopTimer={stopTimer} timer={timer} />
        <button onClick={handleRestart} className="restart-button">
          Restart
        </button>
      </section>
    </article>
  );
}
