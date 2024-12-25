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
  const [gameTip, setGameTip] = useState("");
  // 3 State: X win; O win; draw;
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
      setGameTip(`Game Over! Winner: ${winner}`);
      setGameState({ winner });
    } else if (nextSquares.every((square) => square !== null)) {
      setGameTip("Game Over! It's a draw!");
      setGameState("draw");
    } else {
      const player = nextIsX ? "X" : "O";
      setGameTip(`Next Player: ${player}`);
      setGameState("continue");
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

  function onRestart() {
    setSquares(Array(9).fill(null));
  }

  const isStart = (gameState) => {
    if (gameState !== "continue") {
      return (
        <button className="btn-restart" onClick={onRestart}>
          Restart
        </button>
      );
    }
  };

  return (
    <>
      <p>{gameTip}</p>
      <div className="board">{SquareList}</div>
      {isStart(gameState)}
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
