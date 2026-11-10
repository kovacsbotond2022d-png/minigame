import { getGameResult } from "../src/utils/gameUtils.js";

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

describe("getGameResult", () => {
    test.each(
        winningLines.flatMap((line) =>
            ["x", "o"].map((mark) => ({ line, mark })),
        ),
    )("detects a $mark win along $line", ({ line, mark }) => {
        const squares = Array(9).fill(null);
        line.forEach((index) => {
            squares[index] = mark;
        });

        expect(getGameResult(squares)).toEqual({
            winner: mark,
            isDraw: false,
        });
    });

    test("does not report a winner for an empty board", () => {
        expect(getGameResult(Array(9).fill(null))).toEqual({
            winner: null,
            isDraw: false,
        });
    });

    test("does not report a winner for an incomplete line", () => {
        expect(
            getGameResult(["x", "x", null, null, null, null, null, null, null]),
        ).toEqual({ winner: null, isDraw: false });
    });

    test("does not report a winner when a line contains different marks", () => {
        expect(
            getGameResult(["x", "o", "x", null, null, null, null, null, null]),
        ).toEqual({ winner: null, isDraw: false });
    });

    test("reports a draw for a full board with no winning line", () => {
        expect(
            getGameResult(["x", "o", "x", "x", "o", "o", "o", "x", "x"]),
        ).toEqual({ winner: null, isDraw: true });
    });

    test("reports a win rather than a draw when a full board has a winning line", () => {
        expect(
            getGameResult(["x", "x", "x", "o", "o", "x", "x", "o", "o"]),
        ).toEqual({ winner: "x", isDraw: false });
    });
});
