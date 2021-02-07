const CLOCK_MUTATION = "rclock rclock-turn rclock-top"
const BOARD_WRAPPER_ELEMENT_ID = "main-wrap"
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
const PIECE_VALUE_MAPPER = {
    'p': 1,
    'n': 3,
    'b': 3,
    'r': 5,
    'q': 9,
    'k': 999,
}
const PIECE_SHORTNAME_MAPPER = {
    'p': 'pawn',
    'n': 'knight',
    'b': 'bishop',
    'r': 'rook',
    'q': 'queen',
    'k': 'king'
}