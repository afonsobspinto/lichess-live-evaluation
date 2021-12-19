const stockfish = STOCKFISH();
stockfish.onmessage = (event) => {
    onMessage(event, 'w');
};

function onMessage(event, turn) {
    const evaluation = getEvaluation(event, turn)
    if (evaluation) {
        displayEvaluation(evaluation)
    }
}

function triggerEvaluation(game) {
    stockfish.onmessage = (event) => {
        onMessage(event, game.turn());
    };
    stockfish.postMessage("ucinewgame");
    stockfish.postMessage("isready");
    stockfish.postMessage("position fen " + game.fen());
    stockfish.postMessage(`go depth ${DEPTH.toString()}`);

}

function getEvaluation(event, turn) {
    if (event.startsWith("info depth")) {
        const message = event.split(" ")
        const depth = parseInt(message[message.indexOf("depth") + 1])
        if (depth === DEPTH) {
            console.log(event)
            console.log(turn)
            return getEvaluationAux(message, turn)
        }
    }
}

function getEvaluationAux(message, turn) {
    if (message.includes('mate')) {
        const moves = parseInt(message[message.indexOf("mate") + 1])
        if (moves !== 0) {
            return applyTurn(15000 / moves, turn)
        }
    } else {
        const value = parseInt(message[message.indexOf("cp") + 1]) / 100
        return applyTurn(value, turn)
    }
}

function applyTurn(value, turn) {
    return turn === 'b' ? value * -1 : value
}



