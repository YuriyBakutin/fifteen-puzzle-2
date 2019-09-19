import { view } from './view.mjs'
import { game } from './game.mjs'
import { Indicator } from './Indicator.mjs'

'use strict'

export class GameBoard {

    constructor() {
        document.body.setAttribute('style', `
            background: ${view.skin.backgroundColor}
            `)

        view.gameBoardElement = view.renderElement({
            skinElement: view.skin.frame,
            tagName: 'div',
            parentElement: document.body
        })

        view.backsideElement = view.renderElement({
            skinElement: view.skin.gameField,
            tagName: 'div',
            zIndex: view.BACKSIDE_Z_INDEX
        })

        for (
            let yPlaceIndex = 0;
            yPlaceIndex < game.numberOfRows;
            yPlaceIndex++
        ) {
           for (
                let xPlaceIndex = 0;
                xPlaceIndex < game.numberOfColumns;
                xPlaceIndex++
            ) {
                view.renderElement({
                    skinElement: view.skin.backsideBackgroundTile,
                    parentElement: view.backsideElement,
                    placeIndexes: { xPlaceIndex, yPlaceIndex },
                    zIndex: view.BACKSIDE_Z_INDEX
                })
            }
        }

        view.renderElement({
            skinElement: view.skin.gameField.topLeftShadowCorner,
            parentElement: view.backsideElement,
            zIndex: view.SHADOW_Z_INDEX
        })

        for (
            let xPlaceIndex = 1;
            xPlaceIndex < game.numberOfColumns;
            xPlaceIndex++
        ) {
            view.renderElement({
                skinElement: view.skin.gameField.topShadowLine,
                placeIndexes: { xPlaceIndex },
                parentElement: view.backsideElement,
                zIndex: view.SHADOW_Z_INDEX
            })
        }

        for (
            let yPlaceIndex = 1;
            yPlaceIndex < game.numberOfRows;
            yPlaceIndex++
        ) {
            view.renderElement({
                skinElement: view.skin.gameField.leftShadowLine,
                placeIndexes: { yPlaceIndex },
                parentElement: view.backsideElement,
                zIndex: view.SHADOW_Z_INDEX
            })
        }

        view.renderElement({
            skinElement: view.skin.frame.topLeftCorner
        })

        view.renderElement({
            skinElement: view.skin.frame.topRightCorner
        })

        view.renderElement({
            skinElement: view.skin.frame.bottomRightCorner
        })

        view.renderElement({
            skinElement: view.skin.frame.bottomLeftCorner
        })

        for (
            let xPlaceIndex = 0;
            xPlaceIndex < game.numberOfColumns - 2;
            xPlaceIndex++
        ) {
            view.renderElement({
                skinElement: view.skin.frame.topLineTile,
                placeIndexes: { xPlaceIndex }
            })

            view.renderElement({
                skinElement: view.skin.frame.bottomLineTile,
                placeIndexes: { xPlaceIndex }
            })
        }

        for (
            let yPlaceIndex = 0;
            yPlaceIndex < game.numberOfRows - 2;
            yPlaceIndex++
        ) {
            view.renderElement({
                skinElement: view.skin.frame.leftLineTile,
                placeIndexes: { yPlaceIndex }
            })

            view.renderElement({
                skinElement: view.skin.frame.rightLineTile,
                placeIndexes: { yPlaceIndex }
            })
        }

        view.startAndPauseElement = view.renderElement({
            skinElement: view.skin.frame.buttons.startAndPause,
            id: 'startAndPause',
            pointer: true
        })

        view.renderElement({
            skinElement: view.skin.frame.buttons.restart,
            id: 'restart',
            pointer: true
        })

        view.removeRowElement = view.renderElement({
            skinElement: view.skin.frame.buttons.removeRow,
            disabled: game.numberOfRows == game.MIN_NUMBER_OF_ROWS,
            id: 'removeRow',
            pointer: true
        })

        view.renderElement({
            skinElement: view.skin.frame.buttons.addRemoveRowImage
        })

        view.addRowElement = view.renderElement({
            skinElement: view.skin.frame.buttons.addRow,
            disabled: game.numberOfRows == game.MAX_NUMBER_OF_ROWS,
            id: 'addRow',
            pointer: true
        })

        view.removeColumnElement = view.renderElement({
            skinElement: view.skin.frame.buttons.removeColumn,
            disabled: game.numberOfColumns == game.MIN_NUMBER_OF_COLUMNS,
            id: 'removeColumn',
            pointer: true
        })

        view.addColumnElement = view.renderElement({
            skinElement: view.skin.frame.buttons.addColumn,
            disabled: game.numberOfColumns == game.MAX_NUMBER_OF_COLUMNS,
            id: 'addColumn',
            pointer: true
        })

        view.renderElement({
            skinElement: view.skin.frame.buttons.removeColumnImage
        })

        view.renderElement({
            skinElement: view.skin.frame.buttons.addColumnImage
        })

        view.renderElement({
            skinElement: view.skin.frame.buttons.previousSkin,
            id: 'previousSkin',
            pointer: true
        })

        view.renderElement({
            skinElement: view.skin.frame.buttons.nextSkin,
            id: 'nextSkin',
            pointer: true
        })

        view.renderElement({
            skinElement: view.skin.frame.buttons.previousSkinImage
        })

        view.renderElement({
            skinElement: view.skin.frame.buttons.nextSkinImage
        })

        view.stepCounter = new Indicator({
            skinElement: view.skin.indicators.stepCounter,
            text: '00000'
        })

        view.timeCounter = new Indicator({
            skinElement: view.skin.indicators.timeCounter,
            text: '00:00'
        })

        view.gameFieldShadowElement = view.renderElement({
            skinElement: view.skin.gameField,
            tagName: 'div',
            zIndex: view.SHADOW_Z_INDEX
        })

        view.gameFieldElement = view.renderElement({
            skinElement: view.skin.gameField,
            tagName: 'div'
        })
    }
}
