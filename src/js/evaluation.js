const stockfish = STOCKFISH();
stockfish.onmessage = (event) => {
    onMessage(event, 'w');
};

function onMessage(event, turn) {
    console.log(event)
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
    stockfish.postMessage("go depth 15")

}

function getEvaluation(event, turn) {
    if (event.startsWith("info depth")) {
        const message = event.split(" ")
        const depth = parseInt(message[message.indexOf("depth") + 1])
        if (depth === 15) {
            return getEvaluationAux(message, turn)
        }
    }
}

function getEvaluationAux(message, turn) {
    if (message.includes('mate')) {
        return applyTurn(1000, turn)
    } else {
        const value = parseInt(message[message.indexOf("cp") + 1]) / 100
        return applyTurn(value, turn)
    }
}

function applyTurn(value, turn) {
    return turn === 'b' ? value * -1 : value
}



