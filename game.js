'use strict'

export const game = {
    MAX_NUMBER_OF_COLUMNS: 10,
    MAX_NUMBER_OF_ROWS: 10,
    MIN_NUMBER_OF_COLUMNS: 2,
    MIN_NUMBER_OF_ROWS: 2,
    DEFAULT_NUMBER_OF_COLUMNS: 4,
    DEFAULT_NUMBER_OF_ROWS: 4,
    chipIndexes: [],
    _numberOfFields: null,

    _recalcNumberOfFields () {
        game._numberOfFields = game.numberOfColumns * game.numberOfRows
    },

    get numberOfColumns () {
        return localStorage['numberOfColumns'] || game.DEFAULT_NUMBER_OF_COLUMNS
    },

    set numberOfColumns (i) {
        localStorage['numberOfColumns'] = i
        game.chipIndexes = []
        game._recalcNumberOfFields()
    },

    get numberOfRows () {
        return localStorage['numberOfRows'] || game.DEFAULT_NUMBER_OF_ROWS
    },

    set numberOfRows (i) {
        localStorage['numberOfRows'] = i
        game.chipIndexes = []
        game._recalcNumberOfFields()
    },

    get numberOfFields () {
        if ( !game._numberOfFields ) {
            game._recalcNumberOfFields()
        }

        return game._numberOfFields
    },

    get holeIndex () {
        return game.numberOfFields
    },

    randomReplace () {
        let randomNumbers = [] // indexed from 0 for using method "sort()"

        for( let i = 0, n = game.numberOfFields; i < n; i++ ) {
            randomNumbers[i] = { number: i + 1, weight: Math.random() }
        }

        randomNumbers.sort((a, b) => a.weight - b.weight)

        let holeStringNumber

        for( let i = 1, n = game.numberOfFields; i <= n; i++ ) {
            game.chipIndexes[i] = randomNumbers[i - 1].number
            if ( game.chipIndexes[i] == game.holeIndex ) {
                holeStringNumber = Math.floor((i - 1) / game.numberOfRows) + 1
                console.log('holeStringNumber: ', holeStringNumber);
            }
        }

        // Checking for a possibility solution
        let displacedPairsCounter = 0;

        for(let i = 1; i < game.numberOfFields; i++) {
            for(let j = i + 1; j <= game.numberOfFields; j++) {
                if(
                    game.chipIndexes[i] > game.chipIndexes[j]
                    && game.chipIndexes[i] != game.holeIndex
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