console.log('Hello World')
const boardWrapperElement = document.getElementById(BOARD_WRAPPER_ELEMENT_ID)
let prevBoard = new Chess()
observeDOM( boardWrapperElement, function(m){
    prevBoard = forkDetector(m, prevBoard)
});
