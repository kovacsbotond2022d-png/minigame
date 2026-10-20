import Square from "./Square.jsx";
import { useState } from "react";

function Board() {
    const [squares, setSquares] = useState([1, 2, 3]);

    function handleClick(idx, mouseButton) {
        setSquares((currentSquares) =>
            currentSquares.map((square, index) => (index === idx ? (mouseButton === "left" ? "x" : "o") : square)),
        );
    }

    return (
        <div className="board">
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={(mouseButton) => handleClick(0, mouseButton)} />
                <Square value={squares[1]} onSquareClick={(mouseButton) => handleClick(1, mouseButton)} />
                <Square value={squares[2]} onSquareClick={(mouseButton) => handleClick(2, mouseButton)} />
            </div>
        </div>
    );
}

export default Board;
