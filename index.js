'use strict'

const view = {}
const game = {}
game.DEFAULT_NUMBER_OF_ROWS = 4
game.DEFAULT_NUMBER_OF_COLUMNS = 4
view.BACKSIDE_Z_INDEX = 0
view.SHADOW_Z_INDEX = 1
view.GAME_Z_INDEX = 2
view.CONTROL_Z_INDEX = 3

view.twitchWhenResizeEliminationTimerId = null
view.twitchWhenResizeEliminationTiming = 200 // ms

view.rescaleSkin = () => {
    const objectRescale = (obj) => {
        for (let key in obj) {
            if ( typeof obj[key] == 'object' ) {
                objectRescale(obj[key])
            } else if ( typeof obj[key] == 'number' ) {
                obj[key] = Math.round(obj[key] * view.scale)
            }
        }
    }

    objectRescale(view.skin)
}

view.resolve = (param, loopIndexes) => {
    let { xLoopIndex, yLoopIndex } = loopIndexes || {}
    const expression = parseInt(param)
    if ( !Number.isNaN(expression) ) {
        return expression // This is the number
    }

    let expressionParts = param.split(' ')
    expressionParts.forEach((expressionPart, i) => {
        if (
            expressionPart != '+'
            && expressionPart != '-'
            && expressionPart != '*'
            && expressionPart != '/'
            && expressionPart != '('
            && expressionPart != ')'
        ) {
            expressionParts[i] = view.resolve(eval(expressionPart), loopIndexes)
        }
    })

    return eval(expressionParts.join(' '))
}


view.getSizeAndPositionCss = (elem, loopIndexes) => {
    let result = ''

    result += `width: ${view.resolve(elem.width, loopIndexes)}px;
`
    result += `height: ${view.resolve(elem.height, loopIndexes)}px;
`

    if ( elem.left || elem.left == 0 ) {
        result += `left: ${view.resolve(elem.left, loopIndexes)}px;
`
    } else {
        result += `right: ${view.resolve(elem.right, loopIndexes)}px;
`
    }

    if ( elem.top || elem.top == 0 ) {
        result += `top: ${view.resolve(elem.top, loopIndexes)}px;
`
    } else {
        result += `bottom: ${view.resolve(elem.bottom, loopIndexes)}px;
`
    }

    return result
}

onload = async () => {
    // Прочитать из заначки индекс скина и кол-во строк и столбцов
    view.currentSkinIndex = localStorage.getItem('CurrentSkinIndex') || 0
    game.numberOfColumns = localStorage.getItem('numberOfColumns')
        || game.DEFAULT_NUMBER_OF_ROWS
    game.numberOfRows = localStorage.getItem('numberOfRows')
        || game.DEFAULT_NUMBER_OF_ROWS

    let { skins } = await import('./skins/skins.js')
    view.skinsRef = skins

    await view.repaint()
}

onresize = async () => {
    clearTimeout(view.twitchWhenResizeEliminationTimerId)
    view.twitchWhenResizeEliminationTimerId = setTimeout(async () =>{
        document.body.innerHTML = ""
        await view.repaint()
    }, view.twitchWhenResizeEliminationTiming)
}

view.repaint = async () => {
    // Определить размеры экрана и ориентацию
    const PORTRAIT = 0
    const LANDSCAPE = 1

    view.clientWidth = document.documentElement.clientWidth
    view.clientHeight = document.documentElement.clientHeight
    view.orientation = view.clientWidth > view.clientHeight ? LANDSCAPE : PORTRAIT

    if ( !view.skinsRef[ view.currentSkinIndex ].orientation[ view.orientation ].url ) {
        // Toggle orientation:
        view.orientation = 1 - view.orientation
    }

    view.skinUrl = './skins/'
        + view.skinsRef[ view.currentSkinIndex ].orientation[ view.orientation ].url
        + '/'

    let { skin } = await import(view.skinUrl + 'skin.js')

    view.skin = skin

    let xScale = view.clientWidth / view.resolve(skin.frame.width)
    let yScale = view.clientHeight / view.resolve(skin.frame.height)
    view.scale = xScale < yScale ? xScale : yScale

    view.rescaleSkin()

    view.gameBoard = new GameBoard()
}

class GameBoard {

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

