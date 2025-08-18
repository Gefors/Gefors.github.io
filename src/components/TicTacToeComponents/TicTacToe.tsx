import { useState } from "react";
import { GameBoard } from "./GameBoard";

type GameBoardArray = Array<Array<string | null>>;

const makeComputerMove = (GameBoard: GameBoardArray): [number, number] => {
  const emptyCells: [number, number][] = [];
  GameBoard.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (!cell) {
        emptyCells.push([rowIndex, cellIndex]);
      }
    });
  });

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
};

const chechWinner = (gameBoard: GameBoardArray): string | null => {
  const lines = [
    // Check rows
    [gameBoard[0][0], gameBoard[0][1], gameBoard[0][2]],
    [gameBoard[1][0], gameBoard[1][1], gameBoard[1][2]],
    [gameBoard[2][0], gameBoard[2][1], gameBoard[2][2]],

    // Check columns
    [gameBoard[0][0], gameBoard[1][0], gameBoard[2][0]],
    [gameBoard[0][1], gameBoard[1][1], gameBoard[2][1]],
    [gameBoard[0][2], gameBoard[1][2], gameBoard[2][2]],

    // Check diagonals
    [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]],
    [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]],
  ];

  for (const line of lines) {
    if (line[0] && line[0] === line[1] && line[1] === line[2]) {
      return line[0];
    }
  }
  return null;
};

const checkDraw = (board: GameBoardArray): boolean => {
  return board.every((row) => row.every((cell) => cell !== null));
};

export const TicTacToe = () => {
  const initialGameBoard = Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => null)
  );

  const [gameBoard, setGameBoard] = useState<GameBoardArray>(initialGameBoard);
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [noWinner, setNoWinner] = useState<boolean>(false);

  const handleOnClick = (row: number, col: number) => {
    if (gameBoard[row][col] || winner) {
      return;
    }

    const newGameBoard = gameBoard.map((newRow, rowIndex) =>
      newRow.map((cell, cellIndex) =>
        rowIndex === row && cellIndex === col ? player : cell
      )
    );
    setGameBoard(newGameBoard);
    const newWinner = chechWinner(newGameBoard);

    // If there's a winner, set it and return early
    if (newWinner) {
      setWinner(newWinner);
      return;
    }

    setPlayer("X");

    // Check for draw - all cells filled and no winner
    const isDraw = checkDraw(newGameBoard);

    if (isDraw) {
      setNoWinner(true);
      return;
    }

    //Computer move - only if no winner and no draw
    const [compRow, compCol] = makeComputerMove(newGameBoard);
    const updatedGameBoard = newGameBoard.map((newRow, rowIndex) =>
      newRow.map((cell, cellIndex) =>
        rowIndex === compRow && cellIndex === compCol ? "O" : cell
      )
    );

    setTimeout(() => {
      setGameBoard(updatedGameBoard);
      const computerWinner = chechWinner(updatedGameBoard);
      if (computerWinner) {
        setWinner(computerWinner);
      } else {
        // Check for draw after computer move
        const isDrawAfterComputer = checkDraw(updatedGameBoard);
        if (isDrawAfterComputer) {
          setNoWinner(true);
        }
      }
    }, 200); // Delay for better UX
  };

  const restartGame = () => {
    setGameBoard(initialGameBoard);
    setPlayer("X");
    setWinner(null);
    setNoWinner(false);
  };

  return (
    <div className="game flex flex-col items-center justify-center gap-10 pb-24 bg-gradient-to-tr from-blue-50 to-blue-100">
      <h2 className="font-mono font-bold text-4xl">Tic-Tac-Toe AI</h2>
      <GameBoard gameBoard={gameBoard} handleClick={handleOnClick} />
      {winner && (
        <p className="font-mono">{winner === "X" ? "You Win!" : "Ai Win!"}</p>
      )}
      {noWinner && <p className="font-mono">It's a draw!</p>}
      <button
        className="rounded-lg font-mono bg-blue-950 text-white px-4 py-2 hover:bg-blue-600 transition-colors duration-200"
        type="button"
        onClick={() => restartGame()}
      >
        {" "}
        Reset
      </button>
    </div>
  );
};
