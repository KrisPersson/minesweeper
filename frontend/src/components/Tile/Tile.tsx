import "./Tile.css";
import { Ttile } from "../../types";
import { SyntheticEvent } from "react";

type TileProps = Ttile & { clickHandler: (event: SyntheticEvent) => void };

export default function Tile({
  x,
  y,
  content,
  revealed,
  flagged,
  clickHandler,
}: TileProps) {
  let backgroundColor = "";

  if (x % 2 === 0 && y % 2 === 1) {
    backgroundColor = "tile--dark";
  }
  if (x % 2 === 1 && y % 2 === 0) {
    backgroundColor = "tile--dark";
  }

  return (
    <section
      className={`tile ${backgroundColor && backgroundColor}`}
      onClick={clickHandler}
      onContextMenu={clickHandler}
    >
      {revealed && content}
      {flagged && <img src="/flag.png" className="flag" />}
    </section>
  );
}
