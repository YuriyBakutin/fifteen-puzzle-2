import { view } from './view.js'
import { game } from './game.js'

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
            parentElement: document.body,
            id: 'gameBoard'
        })

        view.gameFieldElement = view.renderElement({
            skinElement: view.skin.gameField,
            tagName: 'div',
        })

        for (
            let yLoopIndex = 0;
            yLoopIndex < game.numberOfRows;
            yLoopIndex++
        ) {
           for (
                let xLoopIndex = 0;
                xLoopIndex < game.numberOfColumns;
                xLoopIndex++
            ) {
                view.renderElement({
                    skinElement: view.skin.backsideBackgroundTile,
                    parentElement: view.gameFieldElement,
                    loopIndexes: { xLoopIndex, yLoopIndex },
                    zIndex: view.BACKSIDE_Z_INDEX
                })
            }
        }

        view.renderElement({
            skinElement: view.skin.gameField.topLeftShadowCorner,
            parentElement: view.gameFieldElement,
            zIndex: view.SHADOW_Z_INDEX
        })

        for (
            let xLoopIndex = 1;
            xLoopIndex < game.numberOfColumns;
            xLoopIndex++
        ) {
            view.renderElement({
                skinElement: view.skin.gameField.topShadowLine,
                loopIndexes: { xLoopIndex },
                parentElement: view.gameFieldElement,
                zIndex: view.SHADOW_Z_INDEX
            })
        }

        for (
            let yLoopIndex = 1;
            yLoopIndex < game.numberOfRows;
            yLoopIndex++
        ) {
            view.renderElement({
                skinElement: view.skin.gameField.leftShadowLine,
                loopIndexes: { yLoopIndex },
                parentElement: view.gameFieldElement,
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
            let xLoopIndex = 0;
            xLoopIndex < game.numberOfColumns - 2;
            xLoopIndex++
        ) {
            view.renderElement({
                skinElement: view.skin.frame.topLineTile,
                loopIndexes: { xLoopIndex }
            })

            view.renderElement({
                skinElement: view.skin.frame.bottomLineTile,
                loopIndexes: { xLoopIndex }
            })
        }

        for (
            let yLoopIndex = 0;
            yLoopIndex < game.numberOfRows - 2;
            yLoopIndex++
        ) {
            view.renderElement({
                skinElement: view.skin.frame.leftLineTile,
                loopIndexes: { yLoopIndex }
            })

            view.renderElement({
                skinElement: view.skin.frame.rightLineTile,
                loopIndexes: { yLoopIndex }
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
    }
}
