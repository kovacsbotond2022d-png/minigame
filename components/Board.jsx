import { useState } from "react";
import Square from "./Square.jsx";
import { getGameResult } from "../src/utils/gameUtils.js";

function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);
    const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });
    const completedGames = scores.x + scores.o + scores.draws;
    const gameOver = winner !== null || isDraw;

    function handleClick(idx, mouseButton) {
        if (gameOver || squares[idx] !== null) {
            return;
        }

        const mark = mouseButton === "left" ? "x" : "o";
        const nextSquares = [...squares];
        nextSquares[idx] = mark;
        setSquares(nextSquares);

        const result = getGameResult(nextSquares);

        if (result.winner) {
            setWinner(result.winner);
            setScores((currentScores) => ({
                ...currentScores,
                [result.winner]: currentScores[result.winner] + 1,
            }));
        } else if (result.isDraw) {
            setIsDraw(true);
            setScores((currentScores) => ({
                ...currentScores,
                draws: currentScores.draws + 1,
            }));
        }
    }

    function startNewGame() {
        setSquares(Array(9).fill(null));
        setWinner(null);
        setIsDraw(false);
    }

    function winPercentage(wins) {
        return completedGames === 0
            ? 0
            : Math.round((wins / completedGames) * 100);
    }

    return (
        <main className="game">
            <header className="game-header">
                <p className="eyebrow">Játssz egy kört!</p>
                <h1>Amőba</h1>
                <p className="game-instructions">
                    Bal kattintás: X <span aria-hidden="true">·</span> Jobb
                    kattintás: O
                </p>
            </header>

            <section className="scoreboard" aria-label="Eredmények">
                <article className="score-card score-card-x">
                    <span className="score-mark">X</span>
                    <span className="score-label">X győzelmei</span>
                    <strong className="score-wins">{scores.x}</strong>
                    <span className="score-percentage">
                        {winPercentage(scores.x)}% győzelmi arány
                    </span>
                </article>
                <article className="score-card score-card-draw">
                    <span className="score-label">Döntetlen</span>
                    <strong className="score-wins">{scores.draws}</strong>
                    <span className="score-percentage">befejezett játék</span>
                </article>
                <article className="score-card score-card-o">
                    <span className="score-mark">O</span>
                    <span className="score-label">O győzelmei</span>
                    <strong className="score-wins">{scores.o}</strong>
                    <span className="score-percentage">
                        {winPercentage(scores.o)}% győzelmi arány
                    </span>
                </article>
            </section>

            <section className="game-panel" aria-label="Amőba játéktábla">
                <p className="game-status" aria-live="polite">
                    {winner
                        ? `${winner.toUpperCase()} nyert!`
                        : isDraw
                          ? "Döntetlen!"
                          : "Válassz egy mezőt!"}
                </p>
                <div className="board" role="group" aria-label="3x3-as tábla">
                    {[0, 1, 2].map((row) => (
                        <div className="board-row" key={row}>
                            {[0, 1, 2].map((column) => {
                                const index = row * 3 + column;

                                return (
                                    <Square
                                        key={index}
                                        value={squares[index]}
                                        onSquareClick={(mouseButton) =>
                                            handleClick(index, mouseButton)
                                        }
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
                {gameOver && (
                    <button
                        className="new-game-button"
                        onClick={startNewGame}
                        type="button"
                    >
                        Új játék
                    </button>
                )}
            </section>

            <p className="games-played">
                Befejezett játékok: <strong>{completedGames}</strong>
            </p>
        </main>
    );
}

export default Board;
