import { useState } from "react";
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

  function caculateWinner(squares) {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        console.log("winner", squares[a]);
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(i) {
    if (squares[i] || caculateWinner(squares)) return;
    const nextSquares = squares.slice();
    setNextIsX(!nextIsX);
    nextIsX ? (nextSquares[i] = "X") : (nextSquares[i] = "O");
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
      <p>{squares}</p>
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
