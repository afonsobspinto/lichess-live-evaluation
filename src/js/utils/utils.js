
const observeDOM = (function () {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    return function (obj, callback) {
        if (!obj || obj.nodeType !== 1) return;

        if (MutationObserver) {
            // define a new observer
            const mutationObserver = new MutationObserver(callback);

            // have the observer observe foo for changes in children
            mutationObserver.observe(obj, {childList: true, subtree: true})
            return mutationObserver
        }

        // browser support fallback
        else if (window.addEventListener) {
            obj.addEventListener('DOMNodeInserted', callback, false)
            obj.addEventListener('DOMNodeRemoved', callback, false)
        }
    }
})();


function displayEvaluation(evaluation){
    const evBar = document.querySelector('#evBar')
    const evaluationPercentage = evaluation > 50 ? 50 : evaluation < -50 ? -50 : evaluation
    evBar.style.background = `linear-gradient(to top, white 0%, white ${50+evaluationPercentage}%, black  ${50+evaluationPercentage}%, black 100%)`
    //console.log(evaluation)
}


function displayGame(game){
    console.log(game.ascii())
    console.log(game.turn())
}

function addEvaluationBar(){
    const evBar = document.createElement('div')
    evBar.setAttribute('id', 'evBar')
    evBar.style.position = 'absolute'
    evBar.style.width = '20px'
    evBar.style.height = '775px'
    evBar.style.marginLeft = '385px'
    evBar.style.border = '1px solid slategrey'
    evBar.style.background = 'linear-gradient(to top, white 0%, white 50%, black 50%, black 100%)'
    const element = document.querySelector(BOARD_WRAPPER_ELEMENT_ID);
    element.appendChild(evBar);
}