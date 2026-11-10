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

export function getGameResult(squares) {
    for (const [first, second, third] of winningLines) {
        const mark = squares[first];
        if (mark && mark === squares[second] && mark === squares[third]) {
            return { winner: mark, isDraw: false };
        }
    }

    if (squares.every(Boolean)) {
        return { winner: null, isDraw: true };
    }

    return { winner: null, isDraw: false };
}

export function win_check(status, player, setWinner, setGameOver) {
    const result = getGameResult(status);

    if (result.winner === player) {
        setWinner(player);
        setGameOver(true);
    } else if (result.isDraw) {
        setGameOver(true);
    }

    return result;
}
