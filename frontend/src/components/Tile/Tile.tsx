import "./Tile.css";
import { Ttile } from "../../types";

type TileProps = Ttile;

export default function Tile({ x, y, content, revealed }: TileProps) {
  return <section className="wrapper"></section>;
}
