const CLOCK_MUTATION_1 = "rclock rclock-turn rclock-top"
const CLOCK_MUTATION_2 = "time"
const BOARD_WRAPPER_ELEMENT_ID = "#main-wrap .round"
const BOARD_ELEMENT_TAG = "cg-board"
const ORIENTATION_CLASS = "cg-wrap"
const GHOST_PIECE = "ghost"
const PIECE_MAPPER = {
    "black pawn": { type: 'p', color: 'b' },
    "white pawn": { type: 'p', color: 'w' },
    "black knight": { type: 'n', color: 'b' },
    "white knight": { type: 'n', color: 'w' },
    "black bishop": { type: 'b', color: 'b' },
    "white bishop": { type: 'b', color: 'w' },
    "black rook": { type: 'r', color: 'b' },
    "white rook": { type: 'r', color: 'w' },
    "black queen": { type: 'q', color: 'b' },
    "white queen": { type: 'q', color: 'w' },
    "black king": { type: 'k', color: 'b' },
    "white king": { type: 'k', color: 'w' },
}

const ROWS = 8
const BLACK = "black"
const WHITE = "white"
const ELEMENTS_ENUM = Object.freeze({"lastMove":1, "piece":2, "movedPiece":3})
const DEPTH = 15