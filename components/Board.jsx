import Square from "./Square.jsx";
import { useState } from "react";

function Board() {
    const [squares, setSquares] = useState([1, 2, 3]);

    function handleClick(idx) {
        alert(idx);
        setSquares((currentSquares) =>
            currentSquares.map((square, index) =>
                index === idx ? square + 1 : square
            )
        );
    }

    return (
        <div className="board">
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
        </div>
    );
}

export default Board;
