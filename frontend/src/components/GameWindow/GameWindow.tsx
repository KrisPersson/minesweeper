import "./GameWindow.css";
import GameBoard from "../GameBoard/GameBoard";

export default function GameWindow() {
  return (
    <article className="gamewindow wrapper_window">
      <header className="gamewindow__header">
        <div className="stat_text">Player name: </div>
        <div className="stat_text">Timer: </div>
      </header>
      <GameBoard size={10} />
    </article>
  );
}
