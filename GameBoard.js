import { view } from './view.js'
import { game } from './game.js'

'use strict'

export class GameBoard {

    constructor() {

        this.gameBoardElement = document.createElement('div')
        this.gameBoardElement.setAttribute('id', 'gameBoard')
        this.gameBoardElement.setAttribute('style', `
            position: relative;
            ${view.getSizeAndPositionCss(
                view.skin.frame
            )}
        `)
        document.body.appendChild(this.gameBoardElement)

        // game board frame parts (clockwise)
        this.topLeftCorner = document.createElement('img')
        this.topLeftCorner.setAttribute('src',
            view.skinUrl + view.skin.frame.topLeftCorner.url
        )
        this.topLeftCorner.setAttribute('style', `
            position: absolute;
            ${view.getSizeAndPositionCss(
                view.skin.frame.topLeftCorner
            )}
            z-index: view.GAME_Z_INDEX;
        `)
        this.gameBoardElement.appendChild(this.topLeftCorner)

        this.topRightCorner = document.createElement('img')
        this.topRightCorner.setAttribute('src',
            view.skinUrl + view.skin.frame.topRightCorner.url
        )
        this.topRightCorner.setAttribute('style', `
            position: absolute;
            ${view.getSizeAndPositionCss(
                view.skin.frame.topRightCorner
            )}
            z-index: view.GAME_Z_INDEX;
        `)
        this.gameBoardElement.appendChild(this.topRightCorner)

        this.bottomRightCorner = document.createElement('img')
        this.bottomRightCorner.setAttribute('src',
            view.skinUrl + view.skin.frame.bottomRightCorner.url
        )
        this.bottomRightCorner.setAttribute('style', `
            position: absolute;
            ${view.getSizeAndPositionCss(
                view.skin.frame.bottomRightCorner
            )}
            z-index: view.GAME_Z_INDEX;
        `)
        this.gameBoardElement.appendChild(this.bottomRightCorner)

        this.bottomLeftCorner = document.createElement('img')
        this.bottomLeftCorner.setAttribute('src',
            view.skinUrl + view.skin.frame.bottomLeftCorner.url
        )
        this.bottomLeftCorner.setAttribute('style', `
            position: absolute;
            ${view.getSizeAndPositionCss(
                view.skin.frame.bottomLeftCorner
            )}
            z-index: view.GAME_Z_INDEX;
        `)
        this.gameBoardElement.appendChild(this.bottomLeftCorner)

        this.topLine = []
        this.bottomLine = []
        for (
            let xLoopIndex = 0;
            xLoopIndex < game.numberOfColumns - 2;
            xLoopIndex++
        ) {
            let loopIndexes = { xLoopIndex }
            this.topLine[xLoopIndex] = document.createElement('img')
            this.topLine[xLoopIndex].setAttribute('src',
                view.skinUrl + view.skin.frame.topLineTile.url
            )
            this.topLine[xLoopIndex].setAttribute('style', `
                position: absolute;
                ${view.getSizeAndPositionCss(
                    view.skin.frame.topLineTile,
                    loopIndexes
                )}
                z-index: view.GAME_Z_INDEX;
            `)
            this.gameBoardElement.appendChild(this.topLine[xLoopIndex])

            this.bottomLine[xLoopIndex] = document.createElement('img')
            this.bottomLine[xLoopIndex].setAttribute('src',
                view.skinUrl + view.skin.frame.bottomLineTile.url
            )
            this.bottomLine[xLoopIndex].setAttribute('style', `
                position: absolute;
                ${view.getSizeAndPositionCss(
                    view.skin.frame.bottomLineTile,
                    loopIndexes
                )}
                z-index: view.GAME_Z_INDEX;
            `)
            this.gameBoardElement.appendChild(this.bottomLine[xLoopIndex])
        }

        this.leftLine = []
        this.rightLine = []
        for (
            let yLoopIndex = 0;
            yLoopIndex < game.numberOfRows - 2;
            yLoopIndex++
        ) {
            let loopIndexes = { yLoopIndex }
            this.leftLine[yLoopIndex] = document.createElement('img')
            this.leftLine[yLoopIndex].setAttribute('src',
                view.skinUrl + view.skin.frame.leftLineTile.url
            )
            this.leftLine[yLoopIndex].setAttribute('style', `
                position: absolute;
                ${view.getSizeAndPositionCss(
                    view.skin.frame.leftLineTile,
                    loopIndexes
                )}
                z-index: view.GAME_Z_INDEX;
            `)
            this.gameBoardElement.appendChild(this.leftLine[yLoopIndex])

            this.rightLine[yLoopIndex] = document.createElement('img')
            this.rightLine[yLoopIndex].setAttribute('src',
                view.skinUrl + view.skin.frame.rightLineTile.url
            )
            this.rightLine[yLoopIndex].setAttribute('style', `
                position: absolute;
                ${view.getSizeAndPositionCss(
                    view.skin.frame.rightLineTile,
                    loopIndexes
                )}
                z-index: view.GAME_Z_INDEX;
            `)
            this.gameBoardElement.appendChild(this.rightLine[yLoopIndex])
        }

        this.gameField = document.createElement('div')
        this.gameField.setAttribute('id', 'gameField')
        this.gameField.setAttribute('style', `
            position: absolute;
            ${view.getSizeAndPositionCss(
                view.skin.gameField
            )}
        `)
        document.body.appendChild(this.gameField)

        this.backsideBackground = []
        let elemIndex
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
                let loopIndexes = { xLoopIndex, yLoopIndex }
                elemIndex = xLoopIndex + yLoopIndex * game.numberOfColumns
                this.backsideBackground[yLoopIndex] = document.createElement('img')
                this.backsideBackground[yLoopIndex].setAttribute(
                    'src',
                    view.skinUrl
                    + view.skin.backsideBackgroundTile.url
                )
                this.backsideBackground[yLoopIndex].setAttribute(
                    'style', `
                    position: absolute;
                    ${view.getSizeAndPositionCss(
                        view.skin.backsideBackgroundTile,
                        loopIndexes
                    )}
                    z-index: view.BACKSIDE_Z_INDEX;
                `)
                this.gameField.appendChild(
                    this.backsideBackground[yLoopIndex]
                )
            }
        }

    }
}
