import "./GameWindow.css";
import GameBoard from "../GameBoard/GameBoard";
import { useDispatch, useSelector } from "react-redux";
import { resetGame, setTimerIsRunning } from "../../store/gameSlice";
import useTimer from "easytimer-react-hook";
import { useEffect } from "react";
import { RootState } from "../../store/store";

export default function GameWindow() {
  const dispatch = useDispatch();
  const [timer] = useTimer();

  const size = 10;

  function handleRestart() {
    dispatch(resetGame());
    startTimer();
  }

  function startTimer() {
    timer.reset();
    timer.start({
      /* EasyTimer start configuration */
      startValues: { seconds: 0 }, // Start the countdown from 1 minute
    });
    dispatch(setTimerIsRunning(true));
  }

  function stopTimer() {
    timer.pause();
    dispatch(setTimerIsRunning(false));
  }

  useEffect(() => {
    startTimer();
  }, []);

  let amtMines = 0;
  let flagsUsed = 0;
  let revealed = 0;
  const matrix = useSelector((state: RootState) => state.game.matrix);
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i].content === -1) amtMines += 1;
    if (matrix[i].flagged) flagsUsed += 1;
    if (matrix[i].revealed) revealed += 1;
  }
  const hasWon = size * size - revealed === amtMines;
  if (hasWon) {
    stopTimer();
  }

  return (
    <article className="gamewindow wrapper_window">
      <header className="gamewindow__header">
        <div className="stat_text">
          <img src="/flag.png" className="flag" /> {amtMines - flagsUsed}
        </div>
        <div className="stat_text">
          Timer: <h2 className="timer">{timer.getTimeValues().toString()}</h2>
        </div>
      </header>
      <section className="game-window__main">
        <GameBoard size={size} stopTimer={stopTimer} />
        <button onClick={handleRestart} className="restart-button">
          Restart
        </button>
        {hasWon && <h2 className="you-won-text">YOU WON!</h2>}
      </section>
    </article>
  );
}
