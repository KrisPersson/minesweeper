import "./GameBoard.css";
import Tile from "../Tile/Tile";
import { SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { update } from "../../store/gameSlice";
import { RootState } from "../../store/store";

type GameBoardProps = {
  size: number;
};

export default function GameBoard({ size }: GameBoardProps) {
  const dispatch = useDispatch();
  const matrix = useSelector((state: RootState) => state.game.matrix);

  function handleClick(event: SyntheticEvent, index: number) {
    const updated = matrix.map((tile, i) => {
      if (i !== index) {
        return tile;
      } else {
        if (event.type === "click") {
          return { ...tile, revealed: true, flagged: false };
        } else if (event.type === "contextmenu" && !tile.revealed) {
          return { ...tile, flagged: !tile.flagged };
        } else {
          return tile;
        }
      }
    });

    dispatch(update(updated));
  }

  const tiles = matrix.map((tile) => {
    const { x, y, content, revealed, index, flagged } = tile;
    return (
      <Tile
        key={index}
        x={x}
        y={y}
        content={content}
        revealed={revealed}
        flagged={flagged}
        index={index}
        clickHandler={(event) => handleClick(event, index)}
      />
    );
  });

  window.addEventListener(`contextmenu`, (e) => e.preventDefault()); // Preventing context menu to open when right clicking

  return (
    <section
      className="gameboard"
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`,
      }}
    >
      {tiles}
    </section>
  );
}
