import { useState, useEffect } from "react";
import "./App.css";

function Square({ value, onSquareClick }) {
  return (
    <>
      <button onClick={onSquareClick}>{value}</button>
    </>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [nextIsX, setNextIsX] = useState(true);
  const [gameState, setGameState] = useState("");

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return squares[a];
    }
    return null;
  }

  const updateGameState = (squares) => {
    const winner = calculateWinner(squares);
    const nextSquares = squares.slice();
    if (winner) {
      setGameState(`Game Over! Winner: ${winner}`);
    } else if (nextSquares.every((square) => square !== null)) {
      setGameState(
        <>
          Game Over!
          <br />
          It&apos;s a draw!
        </>,
      );
    } else {
      const player = nextIsX ? "X" : "O";
      setGameState(`Next Player: ${player}`);
    }
  };

  useEffect(() => {
    updateGameState(squares);
  }, [squares]);

  function handleClick(i) {
    const winner = calculateWinner(squares);
    updateGameState(squares);
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    setNextIsX(!nextIsX);
    nextSquares[i] = nextIsX ? "X" : "O";
    setSquares(nextSquares);
  }

  const SquareList = squares.map((value, index) => (
    <Square
      key={index}
      value={squares[index]}
      onSquareClick={() => handleClick(index)}
    />
  ));

  return (
    <>
      <p>{gameState}</p>
      <div className="board">{SquareList}</div>
    </>
  );
}

function App() {
  return (
    <>
      <Board />
    </>
  );
}

export default App;
