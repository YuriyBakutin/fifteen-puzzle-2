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
    movingChipsParams: [],
    gameOverEvent: new Event('gameOver'),
    step: {},

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

        for( let fieldIndex = 1; fieldIndex <= game.numberOfFields; fieldIndex++ ) {
            game.chipIndexes[fieldIndex] = randomNumbers[fieldIndex].number
        }

        // Checking for a possibility of a solution
        let solutionIsPossible = game.checkForSolvable()

        if ( !solutionIsPossible ) {
            game.randomReplace()
        }
    },

    checkForSolvable() {
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

        let holeFieldIndex = game.chipIndexes.findIndex(
            (chipIndex) => chipIndex == game.holeIndex
        )

        let holeStringNumber = Chip.getYPlaceIndex(holeFieldIndex) + 1

        // If even, game has a solution
        let invariantByEven = displacedPairsCounter
            + (+game.numberOfColumns + 1) * (+game.numberOfRows + holeStringNumber)

        return !Boolean((invariantByEven) % 2)
    },

    setNextPosition(pickedChipIndex) {
        let pickedFieldIndex = game.chipIndexes.findIndex(
            (chipIndex) => chipIndex == pickedChipIndex
        )

        let holeFieldIndex = game.chipIndexes.findIndex(
            (chipIndex) => chipIndex == game.holeIndex
        )

        let xPlacePickedChipIndex = Chip.getXPlaceIndex(pickedFieldIndex)
        let xPlaceHoleIndex = Chip.getXPlaceIndex(holeFieldIndex)
        let yPlacePickedChipIndex = Chip.getYPlaceIndex(pickedFieldIndex)
        let yPlaceHoleIndex = Chip.getYPlaceIndex(holeFieldIndex)

        if ( xPlacePickedChipIndex == xPlaceHoleIndex ) {
            game.movingChipsParams = []
            let yDistance = yPlacePickedChipIndex - yPlaceHoleIndex
            game.step.x = null
            game.step.y = Math.sign(yDistance)
            let yCurrentPlaceIndex = yPlaceHoleIndex

            do {
                let currentFieldIndex = Chip.getFieldIndex(
                    xPlacePickedChipIndex,
                    yCurrentPlaceIndex
                )

                let currentMovingChipIndex = game.chipIndexes[currentFieldIndex]

                let yNextPlaceIndex = yCurrentPlaceIndex + game.step.y

                let nextFieldIndex = Chip.getFieldIndex(
                    xPlacePickedChipIndex,
                    yNextPlaceIndex
                )

                game.movingChipsParams.push(
                    {
                        chipIndex: game.chipIndexes[nextFieldIndex],
                        fieldIndexBeforeMoving: nextFieldIndex,
                        fieldIndex: currentFieldIndex
                    }
                )

                game.chipIndexes[currentFieldIndex] = game.chipIndexes[nextFieldIndex]
                yCurrentPlaceIndex = yNextPlaceIndex
            } while ( yCurrentPlaceIndex != yPlacePickedChipIndex )
            game.chipIndexes[pickedFieldIndex] = game.holeIndex
            game.endGameCheck()
        }

        if ( yPlacePickedChipIndex == yPlaceHoleIndex ) {
            game.movingChipsParams = []
            let xDistance = xPlacePickedChipIndex - xPlaceHoleIndex
            game.step.y = null
            game.step.x = Math.sign(xDistance)
            let xCurrentPlaceIndex = xPlaceHoleIndex

            do {
                let currentFieldIndex = Chip.getFieldIndex(
                    xCurrentPlaceIndex,
                    yPlacePickedChipIndex
                )
                let currentMovingChipIndex = game.chipIndexes[currentFieldIndex]

                let xNextPlaceIndex = xCurrentPlaceIndex + game.step.x

                let nextFieldIndex = Chip.getFieldIndex(
                    xNextPlaceIndex,
                    yPlacePickedChipIndex
                )

                game.movingChipsParams.push(
                    {
                        chipIndex: game.chipIndexes[nextFieldIndex],
                        fieldIndexBeforeMoving: nextFieldIndex,
                        fieldIndex: currentFieldIndex
                    }
                )

                game.chipIndexes[currentFieldIndex] = game.chipIndexes[nextFieldIndex]
                xCurrentPlaceIndex = xNextPlaceIndex
            } while ( xCurrentPlaceIndex != xPlacePickedChipIndex )
            game.chipIndexes[pickedFieldIndex] = game.holeIndex
            game.endGameCheck()
        }
    },

    endGameCheck() {
        game.checkForSolvable()

        let dislocation = game.chipIndexes.find(
            (chipIndex, fieldIndex) => {
                return chipIndex && chipIndex != fieldIndex
            }
        )
        if ( !dislocation ) {
            document.dispatchEvent(game.gameOverEvent)
            return true
        } else {
            return false
        }
    }
}