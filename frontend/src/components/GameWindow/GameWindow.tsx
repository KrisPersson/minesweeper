import "./GameWindow.css";
import GameBoard from "../GameBoard/GameBoard";

export default function GameWindow() {
  return (
    <article className="wrapper gamewindow">
      <header className="gamewindow__header">
        <div className="stat_text">Player name: </div>
        <div className="stat_text">Timer: </div>
      </header>
      <GameBoard />
    </article>
  );
}
