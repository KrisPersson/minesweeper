import "./GameBoard.css";
import Tile from "../Tile/Tile";
import { SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { update } from "../../store/gameSlice";
import { RootState } from "../../store/store";
import { collectAdjacentEmpty } from "../../gamelogic/utils";
import { Ttile } from "../../types";

type GameBoardProps = {
  size: number;
};

export default function GameBoard({ size }: GameBoardProps) {
  const dispatch = useDispatch();
  const matrix = useSelector((state: RootState) => state.game.matrix);

  function handleClick(event: SyntheticEvent, index: number) {
    let adjacentEmptyIndexes: number[] = [];
    const searched = matrix.map((tile, i) => {
      if (i !== index) {
        return tile;
      } else {
        if (event.type === "click") {
          if (tile.content !== 0) {
            return { ...tile, revealed: true, flagged: false };
          } else {
            const { x, y, index } = tile;
            adjacentEmptyIndexes = collectAdjacentEmpty(
              x,
              y,
              index,
              size,
              matrix
            );
            return { ...tile, revealed: true, flagged: false };
          }
        } else if (event.type === "contextmenu" && !tile.revealed) {
          return { ...tile, flagged: !tile.flagged } as Ttile;
        } else {
          return tile as Ttile;
        }
      }
    });
    if (adjacentEmptyIndexes.length > 0) {
      const updated = searched.map((tile) => {
        if (!adjacentEmptyIndexes.includes(tile.index)) {
          return tile;
        } else {
          return { ...tile, revealed: true, flagged: false };
        }
      });
      dispatch(update(updated));
      return;
    }

    dispatch(update(searched));
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
