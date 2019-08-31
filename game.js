import { view } from './view.js'
import { Chip } from './Chip.js'

'use strict'

export const game = {
    MAX_NUMBER_OF_COLUMNS: 10,
    MAX_NUMBER_OF_ROWS: 10,
    MIN_NUMBER_OF_COLUMNS: 2,
    MIN_NUMBER_OF_ROWS: 2,
    DEFAULT_NUMBER_OF_COLUMNS: 4,
    DEFAULT_NUMBER_OF_ROWS: 4,
    // For example:
    chipIndexes: [],
    _numberOfFields: null,

    _recalcNumberOfFields() {
        game._numberOfFields = game.numberOfColumns * game.numberOfRows
    },

    get numberOfColumns() {
        return localStorage['numberOfColumns'] || game.DEFAULT_NUMBER_OF_COLUMNS
    },

    set numberOfColumns(i) {
        localStorage['numberOfColumns'] = i
        game.chipIndexes = []
        game._recalcNumberOfFields()
    },

    get numberOfRows() {
        return localStorage['numberOfRows'] || game.DEFAULT_NUMBER_OF_ROWS
    },

    set numberOfRows(i) {
        localStorage['numberOfRows'] = i
        game.chipIndexes = []
        game._recalcNumberOfFields()
    },

    get numberOfFields() {
        if ( !game._numberOfFields ) {
            game._recalcNumberOfFields()
        }

        return game._numberOfFields
    },

    get holeIndex() {
        return game.numberOfFields
    },

    randomReplace() {
        let randomNumbers = []

        randomNumbers[0] = { weight: -1 } // To exclude from sorting

        for( let fieldIndex = 1; fieldIndex <= game.numberOfFields; fieldIndex++ ) {
            randomNumbers[fieldIndex] = { number: fieldIndex, weight: Math.random() }
        }

        randomNumbers.sort((a, b) => a.weight - b.weight)

        // holeStringNumber is used for manipulations
        // on achievement of possibility of a solution
        let holeStringNumber

        for( let fieldIndex = 1; fieldIndex <= game.numberOfFields; fieldIndex++ ) {
            game.chipIndexes[fieldIndex] = randomNumbers[fieldIndex].number

            if ( game.chipIndexes[fieldIndex] == game.holeIndex ) {
                holeStringNumber = Math.floor((fieldIndex - 1) / game.numberOfRows) + 1
            }
        }

        // Checking for a possibility of a solution
        let displacedPairsCounter = 0;

        for ( let fieldIndex = 1; fieldIndex < game.numberOfFields; fieldIndex++ ) {
            for(
                let fieldIndex2 = fieldIndex + 1;
                fieldIndex2 <= game.numberOfFields;
                fieldIndex2++
            ) {
                if(
                    game.chipIndexes[fieldIndex] > game.chipIndexes[fieldIndex2]
                    && game.chipIndexes[fieldIndex] != game.holeIndex
                ) {
                    displacedPairsCounter++;
                }
            }
        }

        let solutionIsPossible = Boolean((displacedPairsCounter + holeStringNumber + 1) % 2)

        if ( !solutionIsPossible ) {
            if(holeStringNumber != 1) {
                let n = game.chipIndexes[1];
                game.chipIndexes[1] = game.chipIndexes[2];
                game.chipIndexes[2] = n;
            } else {
                let n = game.chipIndexes[game.numberOfFields];
                game.chipIndexes[game.numberOfFields] =
                    game.chipIndexes[game.numberOfFields - 1];
                game.chipIndexes[game.numberOfFields - 1] = n;
            }
        }
    }
}