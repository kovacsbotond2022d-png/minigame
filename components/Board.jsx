import Square from "./Square.jsx";
import { useState } from "react";

function Board() {
    const [squares, setSquares] = useState([1, 2, 3]);

    return (
        <div className="board">
            <div className="board-row">
                <Square value={squares[0]} />
                <Square value={squares[1]} />
                <Square value={squares[2]} />
            </div>
        </div>
    );
}

export default Board;
