function getLichessGame(mutations) {
    if (hasPlayerChanged(mutations)) {
        let currentGame = getGame()
        setNextTurn(mutations, currentGame)
        //displayGame(currentGame)
        return currentGame
    }
}

function setNextTurn(mutations, currentBoard) {
    let nextTurn = blackPlayed(mutations) ?  'w' : 'b'
    currentBoard.setTurn(nextTurn)
}

function blackPlayed(mutations){
    return mutations.length === 3 || mutations.length === 5
}

function hasPlayerChanged(mutations) {
    return mutations.some(elem => elem.target.className === CLOCK_MUTATION)
}

function getGame() {
    const chessGame = new Chess()
    chessGame.clear()
    const board = document.getElementsByTagName(BOARD_ELEMENT_TAG)[0]
    let movedTo = null
    let movedPiece = null
    const boardWidth = getBoardWidth(board)
    for (let child of board.children) {
        let type = child.className.split(' ').length
        if (type === ELEMENTS_ENUM.piece) {
            chessGame.put(getChessPiece(child), getPiecePosition(child, boardWidth))
        } else if (type === ELEMENTS_ENUM.movedPiece) {
            movedPiece = child
        }
        else if(type === ELEMENTS_ENUM.lastMove && movedTo == null){
            movedTo = child
        }
    }
    let movedChessPiece = movedPiece != null ? getChessPiece(movedPiece) : getLastMoveChessPiece()
    if(isCastling(board)){
        handleCastling(chessGame, getPiecePosition(Array.from(board.children).filter(p => p.className.includes('rook anim'))[0], boardWidth))
    }else{
        chessGame.put(movedChessPiece, getPiecePosition(movedTo, boardWidth))
    }

    return chessGame
}

function isCastling(board){
    return Array.from(board.children).filter(p => p.className.includes('anim')).length === 2
}

function handleCastling(chessGame, movedRookCoords){
    if(movedRookCoords === 'h1'){
        chessGame.put(PIECE_MAPPER['white king'], 'g1')
        chessGame.put(PIECE_MAPPER['white rook'], 'f1')
    }
    else if(movedRookCoords === 'a1'){
        chessGame.put(PIECE_MAPPER['white king'], 'c1')
        chessGame.put(PIECE_MAPPER['white rook'], 'd1')
    }
    else if(movedRookCoords === 'h8'){
        chessGame.put(PIECE_MAPPER['black king'], 'g8')
        chessGame.put(PIECE_MAPPER['black rook'], 'f8')
    }
    else if(movedRookCoords === 'a8'){
        chessGame.put(PIECE_MAPPER['black king'], 'c8')
        chessGame.put(PIECE_MAPPER['black rook'], 'd8')
    }

}

function getLastMoveChessPiece(){
    const ghostPiece = document.getElementsByClassName(GHOST_PIECE)[0]
    let pieceClassName = ghostPiece.className.split(' ')
    return PIECE_MAPPER[pieceClassName[1]+" "+pieceClassName[2]]
}

function getChessPiece(piece) {
    let pieceClassName = piece.className.split(' ')
    return PIECE_MAPPER[pieceClassName[0]+" "+pieceClassName[1]]

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

function getBoardWidth(board) {
    return board.clientWidth
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

function getPlayer1Color(){
    return shorthandColor(getOrientation())
}

function getPlayer2Color(){
    return getPlayer1Color() === shorthandColor(BLACK) ? shorthandColor(WHITE) : shorthandColor(BLACK)
}

function shorthandColor(color){
    return color[0]
}
