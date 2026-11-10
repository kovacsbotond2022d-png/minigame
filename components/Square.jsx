function Square({ value, onSquareClick }) {
    function handleContextMenu(event) {
        event.preventDefault();
        onSquareClick("right");
    }

    return (
        <button
            aria-label={`Mező ${value ? value.toUpperCase() : "üres"}`}
            className={`square${value ? ` square-${value}` : ""}`}
            disabled={Boolean(value)}
            onClick={() => onSquareClick("left")}
            onContextMenu={handleContextMenu}
            type="button"
        >
            {value}
        </button>
    );
}

export default Square;
