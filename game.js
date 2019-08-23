'use strict'

export const game = {
    MAX_NUMBER_OF_COLUMNS: 10,
    MAX_NUMBER_OF_ROWS: 10,
    MIN_NUMBER_OF_COLUMNS: 2,
    MIN_NUMBER_OF_ROWS: 2,
    DEFAULT_NUMBER_OF_COLUMNS: 4,
    DEFAULT_NUMBER_OF_ROWS: 4,

    get numberOfColumns () {
        return localStorage['numberOfColumns'] || game.DEFAULT_NUMBER_OF_COLUMNS
    },

    set numberOfColumns (i) {
        localStorage['numberOfColumns'] = i
    },

    get numberOfRows () {
        return localStorage['numberOfRows'] || game.DEFAULT_NUMBER_OF_ROWS
    },

    set numberOfRows (i) {
        localStorage['numberOfRows'] = i
    },
}