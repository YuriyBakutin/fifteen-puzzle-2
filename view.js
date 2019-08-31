import { game } from './game.js' // here, game is applied by eval('…game.prop…')
import { GameBoard } from './GameBoard.js'
import { Chip } from './Chip.js'

'use strict'

export const view = {
    DEFAULT_SKIN_INDEX: 0,
    BACKSIDE_Z_INDEX: 1,
    SHADOW_Z_INDEX: 2,
    GAMEBOARD_Z_INDEX: 3,
    CHIP_POOL_Z_INDEX: 4,
    CONTROL_Z_INDEX: 5,
    TEXT_Z_INDEX: 6,
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

        let { skin } = await import(view.skinUrl + 'skin.js')

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
            disabled
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
    }
}