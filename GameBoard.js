import { view } from './view.js'
import { game } from './game.js'

'use strict'

export class GameBoard {

    constructor() {

        view.gameBoardElement = view.renderElement({
            skinElement: view.skin.frame,
            tagName: 'div',
            parentElement: document.body,
            id: 'gameBoard'
            // cssPropPosition: 'relative'
        })

        view.gameField = view.renderElement({
            skinElement: view.skin.gameField,
            tagName: 'div',
            // parentElement: document.body,
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
                    parentElement: view.gameField,
                    loopIndexes: { xLoopIndex, yLoopIndex },
                    zIndex: view.BACKSIDE_Z_INDEX
                })
            }
        }

        view.renderElement({
            skinElement: view.skin.gameField.topLeftShadowCorner,
            parentElement: view.gameField,
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
                parentElement: view.gameField,
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
                parentElement: view.gameField,
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
            let loopIndexes = { yLoopIndex }

            view.renderElement({
                skinElement: view.skin.frame.leftLineTile,
                loopIndexes: { yLoopIndex }
            })

            view.renderElement({
                skinElement: view.skin.frame.rightLineTile,
                loopIndexes: { yLoopIndex }
            })
        }
    }
}
