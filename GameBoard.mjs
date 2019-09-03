import { view } from './view.mjs'
import { game } from './game.mjs'

'use strict'

export class GameBoard {

    constructor() {
        let disabled

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
            id: 'startAndPause'
        })

        view.renderElement({
            skinElement: view.skin.frame.buttons.restart,
            id: 'restart'
        })

        disabled = game.numberOfRows == game.MIN_NUMBER_OF_ROWS
        view.removeRowElement = view.renderElement({
            skinElement: view.skin.frame.buttons.removeRow,
            disabled,
            id: 'removeRow'
        })
        view.removeRowElement.disabled = disabled

        view.renderElement({
            skinElement: view.skin.frame.buttons.addRemoveRowImage
        })

        disabled = game.numberOfRows == game.MAX_NUMBER_OF_ROWS
        view.addRowElement = view.renderElement({
            skinElement: view.skin.frame.buttons.addRow,
            disabled,
            id: 'addRow'
        })
        view.addRowElement.disabled = disabled

        disabled = game.numberOfColumns == game.MIN_NUMBER_OF_COLUMNS
        view.removeColumnElement = view.renderElement({
            skinElement: view.skin.frame.buttons.removeColumn,
            disabled,
            id: 'removeColumn'
        })
        view.removeColumnElement.disabled = disabled

        disabled = game.numberOfColumns == game.MAX_NUMBER_OF_COLUMNS
        view.addColumnElement = view.renderElement({
            skinElement: view.skin.frame.buttons.addColumn,
            disabled,
            id: 'addColumn'
        })
        view.addColumnElement.disabled = disabled

        view.renderElement({
            skinElement: view.skin.frame.buttons.removeColumnImage
        })

        view.renderElement({
            skinElement: view.skin.frame.buttons.addColumnImage
        })

        view.addColumnElement.disabled = disabled
        view.previousSkinElement = view.renderElement({
            skinElement: view.skin.frame.buttons.previousSkin,
            id: 'previousSkin'
        })

        view.renderElement({
            skinElement: view.skin.frame.buttons.nextSkin,
            id: 'nextSkin'
        })

        view.renderElement({
            skinElement: view.skin.frame.buttons.previousSkinImage
        })

        view.nextSkinElement = view.renderElement({
            skinElement: view.skin.frame.buttons.nextSkinImage
        })

        view.gameFieldElement = view.renderElement({
            skinElement: view.skin.gameField,
            tagName: 'div',
        })
    }
}
