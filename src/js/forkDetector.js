function forkDetector(board) {
   let piecesToMove = []
   let doubleAttacksCounter = countDoubleAttacks(board)
   for (let move of board.moves({verbose:true})){
      if (countDoubleAttacks(simulateMove(board, move)) > doubleAttacksCounter){
         console.log("Double Attack Detected" + move)
         piecesToMove.push(getPieceElement(move))
      }
   }
   return piecesToMove
}

function simulateMove(board, move){
   let boardCopy = Object.assign({}, board);
   let saveTurn = boardCopy.turn()
   boardCopy.move(move)
   boardCopy.setTurn(saveTurn)
   return boardCopy
}

function countDoubleAttacks(board){
   let counterMap = {}
   for(let move of board.moves({verbose:true})){
      if(move.hasOwnProperty("captured")){
         if (forkWinsMaterial(move, board)){
            if(counterMap.hasOwnProperty(move['from'])){
               counterMap[move['from']].push(move['to'])
            }else {
               counterMap[move['from']] = [move['to']]
            }
         }
      }
   }
   let counter = 0
   for(let key in counterMap){
      if (counterMap[key].length >= 2){
         counter++
      }
   }
   return counter
}

function forkWinsMaterial(move, board){
   if (canPieceBeTaken(move, board)){
      return false
   }
   //TODO: Can be higher if not defended
   return PIECE_VALUE_MAPPER[move['piece']] < PIECE_VALUE_MAPPER[board.get[move['to']].type]
}

function canPieceBeTaken(move, board){
   for (let opponent_move of board.moves({verbose:true})){
      if(opponent_move['to'] === move['to']){
         return true
      }
   }
   return false
}


