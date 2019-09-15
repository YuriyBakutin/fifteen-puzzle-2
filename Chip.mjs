import { view } from './view.mjs'
import { game } from './game.mjs'

'use strict'

export class Chip {

    constructor(argsObject) {
        let {chipIndex, fieldIndex, xPlaceIndex, yPlaceIndex} = argsObject
        this.chipIndex = chipIndex
        this.fieldIndex = fieldIndex || Chip.getFieldIndex(xPlaceIndex, yPlaceIndex)
        xPlaceIndex = xPlaceIndex || Chip.getXPlaceIndex(fieldIndex)
        yPlaceIndex = yPlaceIndex || Chip.getYPlaceIndex(fieldIndex)

        let chipElementsObj = {}

        chipElementsObj.shadow = view.renderElement({
            skinElement: view.skin.chip.shadow,
            placeIndexes: { xPlaceIndex, yPlaceIndex },
            parentElement: view.gameFieldShadowElement,
            id: 'chipShadow' + chipIndex,
            zIndex: view.SHADOW_Z_INDEX
        })

        chipElementsObj.frame = view.renderElement({
            skinElement: view.skin.chip.chipFrame,
            placeIndexes: { xPlaceIndex, yPlaceIndex },
            parentElement: view.gameFieldElement,
            tagName: 'div',
            zIndex: view.CHIP_POOL_Z_INDEX,
            id: 'chip' + chipIndex
        })

        chipElementsObj.chip = view.renderElement({
            skinElement: view.skin.chip.chip,
            parentElement: chipElementsObj.frame,
            zIndex: view.CHIP_POOL_Z_INDEX,
            pointer: true
        })

        chipElementsObj.label = view.renderElement({
            skinElement: view.skin.chip.label,
            parentElement: chipElementsObj.frame,
            text: chipIndex,
            pointer: true
        })

        return chipElementsObj
    }

    // xPlaceIndex and yPlaceIndex starts from zero
    static getFieldIndex(xPlaceIndex, yPlaceIndex) {
        return xPlaceIndex + 1 + yPlaceIndex * game.numberOfColumns
    }

    static getXPlaceIndex(fieldIndex) {
        return (fieldIndex - 1) % game.numberOfColumns
    }

    static getYPlaceIndex(fieldIndex) {
        return Math.floor((fieldIndex - 1) / game.numberOfColumns)
    }
}
