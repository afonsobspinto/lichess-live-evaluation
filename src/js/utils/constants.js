const CLOCK_MUTATION = "rclock rclock-turn rclock-top"
const BOARD_WRAPPER_ELEMENT_ID = "main-wrap"
const BOARD_ELEMENT_TAG = "cg-board"
const ORIENTATION_CLASS = "cg-wrap"
const GHOST_PIECE = "ghost"
const PIECE_MAPPER = {
    "blackpawn": { type: 'p', color: 'b' },
    "whitepawn": { type: 'p', color: 'w' },
    "blackknight": { type: 'n', color: 'b' },
    "whiteknight": { type: 'n', color: 'w' },
    "blackbishop": { type: 'b', color: 'b' },
    "whitebishop": { type: 'b', color: 'w' },
    "blackrook": { type: 'r', color: 'b' },
    "whiterook": { type: 'r', color: 'w' },
    "blackqueen": { type: 'q', color: 'b' },
    "whitequeen": { type: 'q', color: 'w' },
    "blackking": { type: 'k', color: 'b' },
    "whiteking": { type: 'k', color: 'w' },
}
const ROWS = 8
const BLACK = "black"
const WHITE = "white"
const ELEMENTS_ENUM = Object.freeze({"lastMove":1, "piece":2, "movedPiece":3})
