// src/Board.js
import React, { useState } from 'react';
import Square from './Square';

function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false); // Beraberlik durumu için state

    const handleClick = (i) => {
        const newSquares = squares.slice();
        if (winner || isDraw || newSquares[i]) return; // Kazanan veya beraberlik varsa tıklamayı engelle
        newSquares[i] = xIsNext ? 'X' : 'O';
        setSquares(newSquares);
        setXIsNext(!xIsNext);

        const gameWinner = calculateWinner(newSquares);
        if (gameWinner) {
            setWinner(gameWinner);
        } else if (!newSquares.includes(null)) {
            setIsDraw(true); // Boş kare kalmadıysa beraberlik
        }
    };

    const renderSquare = (i) => (
        <Square
            value={squares[i]}
            onClick={() => handleClick(i)}
        />
    );

    const resetGame = () => {
        setSquares(Array(9).fill(null)); // Oyun tahtasını sıfırlama
        setXIsNext(true); // İlk oyuncuyu tekrar X yapma
        setWinner(null);  // Kazananı sıfırlama
        setIsDraw(false); // Beraberliği sıfırlama
    };

    const status = winner
        ? `Winner: ${winner}`
        : isDraw
        ? 'It\'s a draw!'
        : `Next player: ${xIsNext ? 'X' : 'O'}`;

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>

            {(winner || isDraw) && (
                <div className="winner-popup">
                    <p>{winner ? `Congratulations! ${winner} won the game!` : 'It\'s a draw!'}</p>
                    <button onClick={resetGame}>Start New Game</button>
                </div>
            )}
        </div>
    );
}

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
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Board;
