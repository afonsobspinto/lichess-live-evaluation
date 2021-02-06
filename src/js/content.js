console.log('Hello World')
const boardElement = document.getElementById(boardElementID)
observeDOM( boardElement, function(m){
    forkDetector(m)
});
