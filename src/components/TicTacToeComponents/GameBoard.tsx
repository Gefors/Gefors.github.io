type GameBoardProps = {
  gameBoard: Array<Array<string | null>>;
  handleClick: (row: number, col: number) => void;
};

export const GameBoard = ({ gameBoard, handleClick }: GameBoardProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-blue-100 rounded-lg shadow-lg p-4 ">
      {gameBoard.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-row items-center justify-center gap-2"
        >
          {row.map((cell, cellIndex) => (
            <button
              key={cellIndex}
              className="w-20 h-20 bg-amber-50 border-2 border-gray-300 rounded-lg shadow-md hover:shadow-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center text-2xl font-bold text-gray-700 hover:scale-105 active:scale-95"
              onClick={() => handleClick(rowIndex, cellIndex)}
            >
              {cell}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
