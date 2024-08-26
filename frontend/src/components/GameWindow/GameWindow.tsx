import "./GameWindow.css";
import GameBoard from "../GameBoard/GameBoard";
import { useDispatch } from "react-redux";
import { resetGame } from "../../store/gameSlice";

export default function GameWindow() {
  const dispatch = useDispatch();

  function handleRestart() {
    dispatch(resetGame());
  }

  return (
    <article className="gamewindow wrapper_window">
      <header className="gamewindow__header">
        <div className="stat_text">Player name: </div>
        <div className="stat_text">Timer: </div>
      </header>
      <section className="game-window__main">
        <GameBoard size={10} />
        <button onClick={handleRestart} className="restart-button">
          Restart
        </button>
      </section>
    </article>
  );
}
