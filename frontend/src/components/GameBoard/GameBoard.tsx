import "./GameBoard.css";
import { createNewMatrix } from "../../gamelogic/utils";
import Tile from "../Tile/Tile";
import { SyntheticEvent, useState } from "react";

type GameBoardProps = {
  size: number;
};

export default function GameBoard({ size }: GameBoardProps) {
  const [matrix, setMatrix] = useState(createNewMatrix(size));

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
    setMatrix(updated);
    return false;
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
