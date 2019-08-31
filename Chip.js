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

        chipElementsObj.shadow = view.renderElement({
            skinElement: view.skin.chip.shadow,
            placeIndexes: { xPlaceIndex, yPlaceIndex },
            parentElement: view.gameFieldElement,
            id: 'chipShadow' + chipIndex,
            zIndex: view.SHADOW_Z_INDEX
        })

        chipElementsObj.frame = view.renderElement({
            skinElement: view.skin.chip.chipFrame,
            placeIndexes: { xPlaceIndex, yPlaceIndex },
            parentElement: view.gameFieldElement,
            tagName: 'div',
            id: 'chip' + chipIndex
        })

        chipElementsObj.chip = view.renderElement({
            skinElement: view.skin.chip.chip,
            parentElement: chipElementsObj.frame,
            zIndex: view.CHIP_POOL_Z_INDEX
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
