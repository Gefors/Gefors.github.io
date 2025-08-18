export const getAIMoves = (
  gameBoard: Array<Array<string | null>>,
  player: string,
  chechWinner: (gameBoard: Array<Array<string | null>>) => string | null
): [number, number] => {
  const AIMoves: Array<[number, number]> = [];

  gameBoard.forEach((row, rowIndex) =>
    row.map((_col, colIndex) => {
      if (!gameBoard[rowIndex][colIndex]) {
        const newGameBoard = gameBoard.map((r) => [...r]);
        newGameBoard[rowIndex][colIndex] = player;
        if (chechWinner(newGameBoard) === player) {
          AIMoves.unshift([rowIndex, colIndex]);
        }
      }
    })
  );

  const opponent = player === "X" ? "O" : "X";

  gameBoard.some((row, rowIndex) =>
    row.some((_col, colIndex) => {
      if (!gameBoard[rowIndex][colIndex]) {
        const newGameBoard = gameBoard.map((r) => [...r]);

        newGameBoard[rowIndex][colIndex] = opponent;
        if (chechWinner(newGameBoard) === opponent) {
          AIMoves.push([rowIndex, colIndex]);
          return true;
        }
        return false;
      }
    })
  );

  if (AIMoves.length > 0) {
    return AIMoves[0];
  }

  if (!gameBoard[1][1]) {
    return [1, 1];
  }

  const emptyCells: Array<[number, number]> = [];
  gameBoard.forEach((row, rowIndex) =>
    row.forEach((_col, colIndex) => {
      if (!gameBoard[rowIndex][colIndex]) {
        emptyCells.push([rowIndex, colIndex]);
      }
    })
  );

  const randomMove = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomMove];
};
