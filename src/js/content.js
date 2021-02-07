console.log('Hello World')
const boardWrapperElement = document.getElementById(BOARD_WRAPPER_ELEMENT_ID)
observeDOM( boardWrapperElement, function(m){
    let board = getLichessBoard(m)
    if (board != null){
        highlightElements(forkDetector(board))
    }
});
