import { Ttile } from "../types";

// -1 = Bomb
// 0 = Empty
// 1-8 = Adjacent

// (Size * Size) / 6.5 = Number of bombs in a given game

export function createNewMatrix(size: number) {
  const matrix: Ttile[] = [];
  const matrixLength = size * size;
  const numMines = Math.floor((size * size) / 6.5);
  const mineLocationsIndexes: number[] = [];

  for (let i = 0; i < numMines; i++) {
    let randomIndex = null;
    while (randomIndex === null || mineLocationsIndexes.includes(randomIndex)) {
      randomIndex = generateRandomIndex(matrixLength);
    }
    mineLocationsIndexes.push(randomIndex);
  }

  let counter = 0;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const content = mineLocationsIndexes.includes(counter) ? -1 : 0;
      matrix.push({
        index: counter,
        x: j + 1,
        y: i + 1,
        content,
        revealed: false,
        flagged: false,
      } as Ttile);
      counter++;
    }
  }

  const seededMatrix = matrix.map((tile) => {
    const { content } = tile;
    if (content === -1) return tile;
    const { index, x, y } = tile;
    const numAdjacentMines = countAdjacentMines(x, y, index, size, matrix);
    return { ...tile, content: numAdjacentMines };
  });

  return seededMatrix;
}

function generateRandomIndex(matrixLength: number) {
  return Math.floor(Math.random() * matrixLength);
}

type TadjacentObj = {
  x: number;
  y: number;
  index: number;
};

function countAdjacentMines(
  curX: number,
  curY: number,
  curIndex: number,
  size: number,
  matrix: Ttile[]
) {
  const adjacents: { [key: string]: TadjacentObj } = {
    topLeft: { x: curX - 1, y: curY - 1, index: curIndex - (size + 1) },
    top: { x: curX, y: curY - 1, index: curIndex - size },
    topRight: { x: curX + 1, y: curY - 1, index: curIndex - (size - 1) },
    left: { x: curX - 1, y: curY, index: curIndex - 1 },
    right: { x: curX + 1, y: curY, index: curIndex + 1 },
    bottomLeft: { x: curX - 1, y: curY + 1, index: curIndex + (size - 1) },
    bottom: { x: curX, y: curY + 1, index: curIndex + size },
    bottomRight: {
      x: curX + 1,
      y: curY + 1,
      index: curIndex + (size + 1),
    },
  };

  let counter = 0;

  for (const adjacentTile in adjacents) {
    const cur = adjacents[adjacentTile];
    const curInMatrix = matrix[cur.index];
    if (curInMatrix && curInMatrix.x === cur.x && curInMatrix.y === cur.y) {
      if (curInMatrix.content === -1) {
        counter += 1;
      }
    }
  }

  return counter;
}

export function collectAdjacentEmpty(
  curX: number,
  curY: number,
  curIndex: number,
  size: number,
  matrix: Ttile[]
) {
  const indexesAlreadyChecked: number[] = [];
  const tileQueueToBeSearched: TadjacentObj[] = [
    { x: curX, y: curY, index: curIndex },
  ];

  while (tileQueueToBeSearched.length > 0) {
    const { x, y, index } = tileQueueToBeSearched[0];
    const searchRound = findAdjacentEmpty(x, y, index, size, matrix);
    searchRound.toBeRevealed.forEach((tile) => {
      if (!indexesAlreadyChecked.includes(tile.index)) {
        tileQueueToBeSearched.push(tile);
      }
    });
    searchRound.hasBeenChecked.forEach((index) => {
      if (!indexesAlreadyChecked.includes(index)) {
        indexesAlreadyChecked.push(index);
      }
    });
    tileQueueToBeSearched.shift();
  }
  return indexesAlreadyChecked;
}

function findAdjacentEmpty(
  curX: number,
  curY: number,
  curIndex: number,
  size: number,
  matrix: Ttile[]
) {
  const adjacentsPositions: { [key: string]: TadjacentObj } = {
    topLeft: { x: curX - 1, y: curY - 1, index: curIndex - (size + 1) },
    top: { x: curX, y: curY - 1, index: curIndex - size },
    topRight: { x: curX + 1, y: curY - 1, index: curIndex - (size - 1) },
    left: { x: curX - 1, y: curY, index: curIndex - 1 },
    right: { x: curX + 1, y: curY, index: curIndex + 1 },
    bottomLeft: { x: curX - 1, y: curY + 1, index: curIndex + (size - 1) },
    bottom: { x: curX, y: curY + 1, index: curIndex + size },
    bottomRight: {
      x: curX + 1,
      y: curY + 1,
      index: curIndex + (size + 1),
    },
  };

  const collectedEmptyTilesToBeRevealed: TadjacentObj[] = [];
  const hasBeenChecked: number[] = [];

  for (const tile in adjacentsPositions) {
    const { x, y, index } = adjacentsPositions[tile];
    if (matrix[index] && matrix[index].x === x && matrix[index].y === y) {
      hasBeenChecked.push(index);
      if (matrix[index].content === 0) {
        collectedEmptyTilesToBeRevealed.push(adjacentsPositions[tile]);
      }
    }
  }

  return { toBeRevealed: collectedEmptyTilesToBeRevealed, hasBeenChecked };
}
