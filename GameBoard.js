import { view } from './view.js'
import { game } from './game.js'

'use strict'

export class GameBoard {

    constructor() {

        view.gameBoardElement = view.renderElement({
            skinElement: view.skin.frame,
            tagName: 'div',
            parentElement: document.body,
            id: 'gameBoard',
            cssPropPosition: 'relative'
        })

        view.renderElement({
            skinElement:  view.skin.frame.topLeftCorner
        })

        view.renderElement({
            skinElement:  view.skin.frame.topRightCorner
        })

        view.renderElement({
            skinElement:  view.skin.frame.bottomRightCorner
        })

        view.renderElement({
            skinElement:  view.skin.frame.bottomLeftCorner
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

        view.gameField = view.renderElement({
            skinElement: view.skin.gameField,
            tagName: 'div',
            parentElement: document.body,
        })

        this.backsideBackground = []
        for (
            let yLoopIndex = 0;
            yLoopIndex < game.numberOfRows;
            yLoopIndex++
        ) {
            this.backsideBackground[yLoopIndex] = []
            for (
                let xLoopIndex = 0;
                xLoopIndex < game.numberOfColumns;
                xLoopIndex++
            ) {
                view.renderElement({
                    skinElement: view.skin.backsideBackgroundTile,
                    parentElement: view.gameField,
                    loopIndexes: { xLoopIndex, yLoopIndex }
                })
            }
        }

    }
}
