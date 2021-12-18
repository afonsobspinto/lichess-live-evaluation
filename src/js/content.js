console.log('Hello World')
const boardWrapperElement = document.querySelector(BOARD_WRAPPER_ELEMENT_ID)

if(boardWrapperElement){
    observeDOM(boardWrapperElement, function(m){
        let game = getLichessGame(m)
        if(game){
            triggerEvaluation(game)
        }
    });
}
