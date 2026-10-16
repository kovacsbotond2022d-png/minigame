import Square from './Square.jsx'

function Board() {
  return (
    <div className="board">
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </div>
  )
}

export default Board