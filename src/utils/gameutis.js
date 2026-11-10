const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

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

        const winningLine = winningLines.find(
            ([first, second, third]) =>
                nextSquares[first] !== null &&
                nextSquares[first] === nextSquares[second] &&
                nextSquares[first] === nextSquares[third],
        );

        if (winningLine) {
            setWinner(mark);
            setScores((currentScores) => ({
                ...currentScores,
                [mark]: currentScores[mark] + 1,
            }));
        } else if (nextSquares.every((square) => square !== null)) {
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
}