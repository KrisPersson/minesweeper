import { Ttile } from "../types";

// -1 = Bomb
// 0 = Empty
// 1-8 = Adjacent

// (Size * Size) / 6.5 = Number of bombs in a given game

function createNewMatrix(size: number) {
  const matrix: Ttile[] = [];
  const numBombs = Math.floor((size * size) / 6.5);

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      matrix.push({ x: j + 1, y: i + 1, content: 0, revealed: false } as Ttile);
    }
  }
  return matrix;
}

function seedMatrix(matrix: Ttile[]);
