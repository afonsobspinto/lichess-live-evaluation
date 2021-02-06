function forkDetector(mutations){
    if (hasPlayerChanged(mutations)){
        console.log("new player")
        buildChessBoard()
    }
}

function hasPlayerChanged(mutations){
    return mutations.some(elem => elem.target.className === clockMutation)
}

function buildChessBoard(){
    const chess = new Chess()
    console.log(chess)
}