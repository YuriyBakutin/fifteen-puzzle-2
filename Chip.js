import { view } from './view.js'
import { game } from './game.js'

'use strict'

export class Chip {

    constructor(argsObject) {
        let {chipIndex, fieldIndex, xPlaceIndex, yPlaceIndex} = argsObject
        this.chipIndex = chipIndex
        this.fieldIndex = fieldIndex || this.getFieldIndex(xPlaceIndex, yPlaceIndex)
        xPlaceIndex = xPlaceIndex || this.getXPlaceIndex(fieldIndex)
        yPlaceIndex = yPlaceIndex || this.getYPlaceIndex(fieldIndex)

        let chipElementsObj = {}

        chipElementsObj.frame = view.renderElement({
            skinElement: view.skin.chip.chipFrame,
            placeIndexes: { xPlaceIndex, yPlaceIndex },
            parentElement: view.gameFieldElement,
            tagName: 'div',
            id: 'chip' + chipIndex
        })

        // chipElementsObj.shadow = view.renderElement({
        //     skinElement: view.skin.chip.shadow,
        //     parentElement: chipElementsObj.frame,
        //     zIndex: view.SHADOW_Z_INDEX
        // })

        chipElementsObj.chip = view.renderElement({
            skinElement: view.skin.chip.chip,
            parentElement: chipElementsObj.frame,
        })

        chipElementsObj.label = view.renderElement({
            skinElement: view.skin.chip.label,
            parentElement: chipElementsObj.frame,
            text: chipIndex
        })

        return chipElementsObj
    }

    // xPlaceIndex and yPlaceIndex starts from zero
    getFieldIndex(xPlaceIndex, yPlaceIndex) {
        return xPlaceIndex + 1 + yPlaceIndex * game.numberOfColumns
    }

    getXPlaceIndex(fieldIndex) {
        return (fieldIndex - 1) % game.numberOfColumns
    }

    getYPlaceIndex(fieldIndex) {
        return Math.floor((fieldIndex - 1) / game.numberOfColumns)
    }
}
