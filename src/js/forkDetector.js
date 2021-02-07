function forkDetector(mutations) {
    if (hasPlayerChanged(mutations)) {
        console.log("new player")
        let currentBoard = getBoard()
        setTurn(mutations, currentBoard)
        let forkOriginPieces = forkDetectorAux(currentBoard)
        for (let piecePosition of forkOriginPieces) {
            highlightElement(getElementGivenPosition(piecePosition))
        }
    }
}

function setTurn(mutations, currentBoard) {
    console.log(currentBoard.ascii())
}

function hasPlayerChanged(mutations) {
    return mutations.some(elem => elem.target.className === CLOCK_MUTATION)
}

function getBoard() {
    const chessboard = new Chess()
    chessboard.clear()
    const board = document.getElementsByTagName(BOARD_ELEMENT_TAG)[0]
    const lastMoveData = {
        'lastMove': null,
        'piece': null
    }
    const boardWidth = getBoardWidth(board)
    for (let child of board.children) {
        let type = child.className.split(' ').length
        if (type === ELEMENTS_ENUM.piece) {
            chessboard.put(getChessPiece(child), getPiecePosition(child, boardWidth))
        } else if (type === ELEMENTS_ENUM.movedPiece) {
            lastMoveData['piece'] = child
        }
        else if(type === ELEMENTS_ENUM.lastMove && lastMoveData['lastMove'] == null){
            lastMoveData['lastMove'] = (child)
        }
    }
    chessboard.put(getChessPiece(lastMoveData['piece']), getPiecePosition(lastMoveData['lastMove'], boardWidth))

    return chessboard
}


function forkDetectorAux(currentBoard) {
    return []
}

function isPiece(element) {
    return element.tagName === PIECE_ELEMENT_TAG
}

function getChessPiece(piece) {
    let pieceClassName = piece.className.split(' ')
    return PIECE_MAPPER[pieceClassName[0]+pieceClassName[1]]

}

function getPiecePosition(piece, width) {
    let squareWidth = width / ROWS
    let pieceTransform = getPieceTransform(piece)
    const col = colsMapper(pieceTransform[0] / squareWidth)
    const row = rowsMapper(pieceTransform[1] / squareWidth)
    return col + row
}

function getPieceTransform(piece) {
    let regExp = /\(([^)]+)\)/;
    let match = regExp.exec(piece.attributes.style.value)[1].split(',');
    return [parseInt(match[0], 10), parseInt(match[1], 10)]
}

// Board is a square so both width and height are equal
function getBoardWidth(board) {
    return board.clientWidth
}

function getElementGivenPosition(position) {
    const board = document.getElementsByTagName(BOARD_ELEMENT_TAG)[0]
    for (let child of board.children) {
        if (isPiece(child) && getPiecePosition(child) === position) {
            return child
        }
    }
}

function colsMapper(index) {
    index = getOrientation() === BLACK ? ROWS - 1 - Math.round(index) : Math.round(index)
    return String.fromCharCode('a'.charCodeAt(0) + index)
}

function rowsMapper(index) {
    return getOrientation() === BLACK ? Math.round(index) + 1 : ROWS - Math.round(index)
}

function getOrientation() {
    return document.getElementsByClassName(ORIENTATION_CLASS)[0].className.split(' ')[1].split('-')[1]
}