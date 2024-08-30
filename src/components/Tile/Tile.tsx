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

  const adjacentColors = [
    "",
    "var(--c-blue-500)",
    "var(--c-green-700)",
    "var(--c-red-500)",
    "var(--c-yellow-900)",
    "var(--c-purple-500)",
  ];

  const parsedContent =
    content === -1 ? (
      <img src="/mine.png" className="mine" />
    ) : content === 0 ? (
      ""
    ) : (
      content
    );

  return (
    <section
      className={`tile ${backgroundColor && backgroundColor} ${
        revealed && "tile--revealed"
      }`}
      onClick={clickHandler}
      onContextMenu={clickHandler}
      style={{ color: revealed ? adjacentColors[content] : "" }}
    >
      {revealed && parsedContent}
      {flagged && <img src="/flag.png" className="flag" />}
    </section>
  );
}
