import { game } from './game.mjs' // here, game is applied by eval('…game.prop…')
import { GameBoard } from './GameBoard.mjs'
import { Chip } from './Chip.mjs'

'use strict'

export const view = {
    DEFAULT_SKIN_INDEX: 0,
    BACKSIDE_Z_INDEX: 1,
    SHADOW_Z_INDEX: 2,
    GAMEBOARD_Z_INDEX: 3,
    CHIP_POOL_Z_INDEX: 4,
    CONTROL_Z_INDEX: 5,
    TEXT_Z_INDEX: 6,
    MOVING_BY_GAME_STEP_DURATION: 0.5,
    clientWidth: null,
    clientHeight: null,
    PORTRAIT: 0,
    LANDSCAPE: 1,
    orientation: null,
    skinsRef: null,
    currentSkinIndex: null,
    skinUrl: null,
    skin: null,
    scale: null,
    twitchWhenResizeEliminationTimerId: null,
    twitchWhenResizeEliminationTiming: 400, // ms
    gameBoard: null,
    gameBoardElement: null,
    chipElements: [],
    movingChipsParams: [],
    movingChipsShadowParams: [],
    remainingPathRatio: null,

    get currentSkinIndex () {
        return localStorage['CurrentSkinIndex'] || view.DEFAULT_SKIN_INDEX
    },

    set currentSkinIndex (i) {
        localStorage['CurrentSkinIndex'] = i
    },

    rescale() {
        let xScale = (view.clientWidth - game.numberOfColumns - 1) / view.resolve(view.skin.frame.width)
        let yScale = (view.clientHeight - game.numberOfRows - 1) / view.resolve(view.skin.frame.height)
        view.scale = xScale < yScale ? xScale : yScale

        const objectRescale = (obj) => {
            for (let key in obj) {
                if ( typeof obj[key] == 'object' ) {
                    objectRescale(obj[key])
                } else if ( typeof obj[key] == 'number' ) {
                    obj[key] = Math.round(obj[key] * this.scale)
                }
            }
        }

        objectRescale(this.skin)
    },

    async skinUpdate() {
        view.clientWidth = document.documentElement.clientWidth
        view.clientHeight = document.documentElement.clientHeight
        view.orientation = view.clientWidth > view.clientHeight
            ? view.LANDSCAPE
            : view.PORTRAIT



        if ( !view.skinsRef[ view.currentSkinIndex ].orientation[ view.orientation ].url ) {
            // Toggle orientation:
            view.orientation = 1 - view.orientation
        }

        view.skinUrl = './skins/'
            + view.skinsRef[ view.currentSkinIndex ].orientation[ view.orientation ].url
            + '/'

        let { skin } = await import(view.skinUrl + 'skin.mjs')

        view.skin = skin
    },

    async repaint() {
        await view.skinUpdate()

        view.rescale()

        if (view.gameBoardElement) {
            view.gameBoardElement.remove()
        }
        view.gameBoard = new GameBoard()

        view.renderChipPool()

    },

    renderChipPool() {
        for ( let fieldIndex = 1; fieldIndex <= game.numberOfFields; fieldIndex++ ) {
            let chipIndex = game.chipIndexes[fieldIndex]
            if ( chipIndex != game.holeIndex) {
                if ( view.chipElements[chipIndex] ) {
                    for ( const elementKey in view.chipElements[chipIndex] ) {
                        view.chipElements[chipIndex][elementKey].remove()
                    }
                }

                view.chipElements[chipIndex] = new Chip({
                    chipIndex,
                    fieldIndex
                })
            }
        }
    },

    renderElement(argsObject) {

        let {
            skinElement,
            tagName,
            parentElement,
            zIndex,
            id,
            placeIndexes,
            text,
            cssPropPosition,
            top,
            left,
            disabled,
            classCSS
        } = argsObject

        // default values:
        cssPropPosition = cssPropPosition || 'absolute'
        zIndex = zIndex || view.GAMEBOARD_Z_INDEX

        tagName = skinElement.svg ? 'div' : (tagName || 'img')

        const elem = document.createElement(tagName)

        if ( tagName == 'img' ) {
            let src = view.skinUrl + (
                disabled ? skinElement.disabledUrl : skinElement.url
            )

            elem.setAttribute('src',
                src
            )
        }

        if ( id ) {
            elem.setAttribute('id', id)
        }

        elem.setAttribute('style', `
            ${view.getSizeAndPositionCss({
                skinElement,
                parentElement,
                placeIndexes,
                top,
                left
            })}
            position: ${cssPropPosition};
            z-index: ${zIndex};` + '\n'
        )

        if ( skinElement.svg ) {
            let svgStringArray = skinElement.svg.split('??')
            let svgResolvedStringArray = svgStringArray.map(
                (svgString) => {
                    let svgResolvedString
                    switch(svgString) {
                    case 'width':
                        svgResolvedString = elem.style.width
                        break
                    case 'height':
                        svgResolvedString = elem.style.height
                        break
                    case 'text':
                        zIndex = view.TEXT_Z_INDEX
                        svgResolvedString = text
                        break
                    case 'skinUrl':
                        svgResolvedString = view.skinUrl
                        break
                    default:
                        svgResolvedString = svgString
                    }
                    return svgResolvedString
                }
            )

            elem.style.zIndex = zIndex

            elem.innerHTML = svgResolvedStringArray.join('')
        }

        if ( classCSS ) {
            elem.classList.add(classCSS)
        }

        if ( parentElement ) {
            parentElement.appendChild(elem)
        } else {
            this.gameBoardElement.appendChild(elem)
        }

        return elem
    },

    getSizeAndPositionCss(argsObject) {
        let {skinElement, parentElement, placeIndexes, top, left} = argsObject
        let result = ''

        let width = skinElement.width || parentElement.style.width
        let height = skinElement.height || parentElement.style.height

        result +=
            `width: ${this.resolve(width, placeIndexes)}px;` + '\n'
        result +=
            `height: ${this.resolve(height, placeIndexes)}px;` + '\n'

        if ( !left ) {
            if ( skinElement.left || skinElement.left == 0 ) {
                result +=
                    `left: ${this.resolve(skinElement.left, placeIndexes)}px;` + '\n'
            } else if ( skinElement.right || skinElement.right == 0 ) {
                result +=
                    `right: ${this.resolve(skinElement.right, placeIndexes)}px;` + '\n'
            } else {
                result += 'left: 0;' + '\n'
            }
        } else {
            result += `left: ${left};` + '\n'
        }

        if ( !top ) {
            if ( skinElement.top || skinElement.top == 0 ) {
                result +=
                    `top: ${this.resolve(skinElement.top, placeIndexes)}px;` + '\n'
            } else if ( skinElement.bottom || skinElement.bottom == 0 ) {
                result +=
                    `bottom: ${this.resolve(skinElement.bottom, placeIndexes)}px;` + '\n'
            } else {
                result += 'top: 0;' + '\n'
            }
        } else {
            result += `top: ${top};` + '\n'
        }

        return result
    },

    resolve(param, placeIndexes) {
        let { xPlaceIndex, yPlaceIndex } = placeIndexes || {}
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
                expressionParts[i] = this.resolve(
                    eval(expressionPart),
                    placeIndexes
                )
            }
        })

        return eval(expressionParts.join(' '))
    },

    defineMovingElements(chipPickedIndex) {
        let chipPickedElement = document.getElementById(
            'chip' + chipPickedIndex
        )

        let chipShadowPickedElement = document.getElementById(
            'chipShadow' + chipPickedIndex
        )

        view.remainingPathRatio = 1

        view.movingChipsParams = []
        view.movingChipsShadowParams = []
        for ( let movingChipIndex of game.movingChipsParams ) {
            let chipIndex = movingChipIndex.chipIndex
            let placeIndexes = {
                xPlaceIndex: Chip.getXPlaceIndex(movingChipIndex.fieldIndex),
                yPlaceIndex: Chip.getYPlaceIndex(movingChipIndex.fieldIndex)
            }

            let chipShadowElement = document.getElementById(
                    'chipShadow' + chipIndex
                )

            view.moveAnimationOff(chipShadowElement)

            let placeIndexesBeforeMoving = {
                xPlaceIndex: Chip.getXPlaceIndex(movingChipIndex.fieldIndexBeforeMoving),
                yPlaceIndex: Chip.getYPlaceIndex(movingChipIndex.fieldIndexBeforeMoving)
            }

            let leftFinishMoving = this.resolve(
                view.skin.chip.shadow.left,
                placeIndexes
            )

            let topFinishMoving = this.resolve(
                view.skin.chip.shadow.top,
                placeIndexes
            )

            let leftBeforeMoving = this.resolve(
                view.skin.chip.shadow.left,
                placeIndexesBeforeMoving
            )

            let topBeforeMoving = this.resolve(
                view.skin.chip.shadow.top,
                placeIndexesBeforeMoving
            )

            view.movingChipsShadowParams[chipIndex] = {
                element: chipShadowElement,
                leftFinishMoving,
                topFinishMoving,
                leftBeforeMoving,
                topBeforeMoving
            }

            let chipElement = document.getElementById(
                    'chip' + chipIndex
                )

            view.moveAnimationOff(chipElement)

            leftFinishMoving = this.resolve(
                view.skin.chip.chipFrame.left,
                placeIndexes
            )

            topFinishMoving = this.resolve(
                view.skin.chip.chipFrame.top,
                placeIndexes
            )

            leftBeforeMoving = this.resolve(
                view.skin.chip.chipFrame.left,
                placeIndexesBeforeMoving
            )

            topBeforeMoving = this.resolve(
                view.skin.chip.chipFrame.top,
                placeIndexesBeforeMoving
            )

            view.movingChipsParams[chipIndex] = {
                element: chipElement,
                leftFinishMoving,
                topFinishMoving,
                leftBeforeMoving,
                topBeforeMoving
            }
        }
    },

    moveAnimationOn(element) {
        element.style['transition-duration'] =
            view.MOVING_BY_GAME_STEP_DURATION * view.remainingPathRatio + 's'
    },

    moveAnimationOff(element) {
        element.style['transition-duration'] = null
    },

    moveChipByGame() { // By click (mouseup)
        for ( let movingChipIndex of game.movingChipsParams ) {
            let chipIndex = movingChipIndex.chipIndex

            let movingChipShadow = view.movingChipsShadowParams[chipIndex]
            let movingChipShadowElement = movingChipShadow.element
            view.moveAnimationOn(movingChipShadowElement)

            let leftFinishMoving = movingChipShadow.leftFinishMoving
            let topFinishMoving = movingChipShadow.topFinishMoving
            movingChipShadowElement.style.left = leftFinishMoving + 'px'
            movingChipShadowElement.style.top = topFinishMoving + 'px'

            let movingChip = view.movingChipsParams[chipIndex]
            let movingChipElement = movingChip.element
            view.moveAnimationOn(movingChipElement)

            leftFinishMoving = movingChip.leftFinishMoving
            topFinishMoving = movingChip.topFinishMoving
            movingChipElement.style.left = leftFinishMoving + 'px'
            movingChipElement.style.top = topFinishMoving + 'px'
        }
    },

    moveChipByUser(mouseMoveShift) { // Drag and drop
        let lastPathLength
        if ( game.step.x ) {
            const MIN = 0
            const MAX = 1
            let range = [ 0, -game.step.x * view.skin.chip.size ]
            range.sort((a, b) => a - b)
            if ( range[MIN] > mouseMoveShift.x ) {
                mouseMoveShift.x = range[MIN]
            } else if ( range[MAX] < mouseMoveShift.x ) {
                mouseMoveShift.x = range[MAX]
            }

            lastPathLength = Math.abs(mouseMoveShift.x)

            for ( let gameMovingChipParams of game.movingChipsParams ) {
                let movingChipParams = view.movingChipsParams[
                    gameMovingChipParams.chipIndex
                ]

                let movingChipElement = movingChipParams.element
                let leftBeforeMoving = movingChipParams.leftBeforeMoving
                let chipNewLeft = leftBeforeMoving + mouseMoveShift.x
                movingChipElement.style.left = chipNewLeft + 'px'

                let movingChipShadowParams = view.movingChipsShadowParams[
                    gameMovingChipParams.chipIndex
                ]

                let movingChipShadowElement = movingChipShadowParams.element
                let chipShadowLeftBeforeMoving = movingChipShadowParams.leftBeforeMoving
                let chipShadowNewLeft = chipShadowLeftBeforeMoving + mouseMoveShift.x
                movingChipShadowElement.style.left = chipShadowNewLeft + 'px'
            }
        }

        if ( game.step.y ) {
            const MIN = 0
            const MAX = 1
            let range = [ 0, -game.step.y * view.skin.chip.size ]
            range.sort((a, b) => a - b)
            if ( range[MIN] > mouseMoveShift.y ) {
                mouseMoveShift.y = range[MIN]
            } else if ( range[MAX] < mouseMoveShift.y ) {
                mouseMoveShift.y = range[MAX]
            }

            lastPathLength = Math.abs(mouseMoveShift.y)

            for ( let gameMovingChipParams of game.movingChipsParams ) {
                let movingChipParams = view.movingChipsParams[
                    gameMovingChipParams.chipIndex
                ]

                let movingChipElement = movingChipParams.element
                let topBeforeMoving = movingChipParams.topBeforeMoving
                let chipNewTop = topBeforeMoving + mouseMoveShift.y
                movingChipElement.style.top = chipNewTop + 'px'

                let movingChipShadowParams = view.movingChipsShadowParams[
                    gameMovingChipParams.chipIndex
                ]

                let movingChipShadowElement = movingChipShadowParams.element
                let chipShadowTopBeforeMoving = movingChipShadowParams.topBeforeMoving
                let chipShadowNewTop = chipShadowTopBeforeMoving + mouseMoveShift.y
                movingChipShadowElement.style.top = chipShadowNewTop + 'px'
            }
        }

        view.remainingPathRatio = (view.skin.chip.size - lastPathLength) / view.skin.chip.size
    }
}
