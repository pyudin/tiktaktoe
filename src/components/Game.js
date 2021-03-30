import React, { useState } from "react";
import Board from "./Board";

const styles = {
  width: "200px",
  color: "black",
  margin: "20px auto",
};

const styles1 = {
  textAlign: "center",
  width: "300px",
  margin: "20px auto",
};

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);

  const newBoard = [...board];

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
    for (let i = 0; i < lines.length; i += 1) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return {
          winner: squares[a],
          winnerLine: lines[i],
        };
      }
    }
    return { winner: null };
  }
  const { winner } = calculateWinner(newBoard);
  const { winnerLine } = calculateWinner(newBoard);

  function handleClick(i) {
    if (winner || newBoard[i]) return;
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXisNext(!xIsNext);
  }

  const DrawStatus = !newBoard.includes(null) && !winner ? "Draw" : "";

  const resetGame = () => {
    return (
      <button
        type="button"
        onClick={() => {
          setBoard(Array(9).fill(null));
          setXisNext(true);
        }}
        className="btn"
      >
        Reset
      </button>
    );
  };

  return (
    <>
      <h4 style={styles1}>Tic Tac Toe</h4>

      <Board squares={board} onClick={handleClick} winnerLine={winnerLine} />
      <div style={styles}>
        <p>
          {DrawStatus ||
            (winner
              ? `Winner: ${winner}`
              : `Next Step: ${xIsNext ? "X" : "O"}`)}
        </p>
        {resetGame()}
      </div>
    </>
  );
};

export default Game;
