function getMinMove(start, target, brokenTiles) {
  let point = [];
  const queue = [];
  const letterToCol = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 };
  const toCoords = (s) => {
    const col = letterToCol[s[0].toLowerCase()];
    const row = parseInt(s[1], 10) - 1;
    return [row, col];
  };

  const startCoords = toCoords(start);
  const targetCoords = toCoords(target);

  let brokenList = brokenTiles.map((tile) => toCoords(tile).toString());

  if (
    brokenList.includes(startCoords.toString()) ||
    brokenList.includes(targetCoords.toString())
  ) {
    return -1;
  }
  if (start === target) {
    return 0;
  }

  const knightMoves = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ];

  queue.push([startCoords, 0]);
  point.push(startCoords.toString());

  while (queue.length > 0) {
    const [current, moves] = queue.shift();
    const [row, col] = current;

    for (const [dr, dc] of knightMoves) {
      const nextRow = row + dr;
      const nextCol = col + dc;
      const nextCoords = [nextRow, nextCol];
      const nextCoordsStr = nextCoords.toString();

      if (nextRow === targetCoords[0] && nextCol === targetCoords[1]) {
        return moves + 1;
      }

      const board =
        nextRow >= 0 && nextRow < 8 && nextCol >= 0 && nextCol < 8;

      if (
        board &&
        !point.includes(nextCoordsStr) &&
        !brokenList.includes(nextCoordsStr)
      ) {
        point.push(nextCoordsStr);
        queue.push([nextCoords, moves + 1]);
      }
    }
  }
  return -1;
}

const start = "d6";
const target = "h8";
const brokenTiles = ["f6", "f7"];
const result = getMinMove(start, target, brokenTiles);

console.log(`start: ${start}`);
console.log(`target: ${target}`);
console.log(`brokenTiles: [${brokenTiles.join(", ")}]`);
console.log(`result: ${result}`);
