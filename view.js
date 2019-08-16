import { game } from './game.js' // here, game is applied by eval('…game.prop…')
import { GameBoard } from './GameBoard.js'

'use strict'

export const view = {
    BACKSIDE_Z_INDEX: 1,
    SHADOW_Z_INDEX: 2,
    GAME_Z_INDEX: 3,
    CONTROL_Z_INDEX: 4,
    clientWidth: null,
    clientHeight: null,
    orientation: null,
    skinsRef: null,
    currentSkinIndex: null,
    skinUrl: null,
    skin: null,
    scale: null,
    oldSkale: null,
    twitchWhenResizeEliminationTimerId: null,
    twitchWhenResizeEliminationTiming: 400, // ms
    gameBoard: null,
    gameBoardElement: null,

    get currentSkinIndex () {
        return localStorage['CurrentSkinIndex'] || 0
    },

    set currentSkinIndex (i) {
        localStorage['CurrentSkinIndex'] = i
    },

    rescaleSkin() {
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

    async repaint() {
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

        let xScale = (view.clientWidth - game.numberOfColumns - 1) / view.resolve(skin.frame.width)
        let yScale = (view.clientHeight - game.numberOfRows - 1) / view.resolve(skin.frame.height)
        view.scale = xScale < yScale ? xScale : yScale
        view.rescaleSkin()
        view.gameBoard = new GameBoard()
    },

    renderElement(paramObject) {

        let {
            skinElement,
            tagName,
            parentElement,
            zIndex,
            id,
            loopIndexes,
            cssPropPosition,
            top,
            left
        } = paramObject

        // default values:
        cssPropPosition = cssPropPosition || 'absolute'
        zIndex = zIndex || view.GAME_Z_INDEX
        tagName = tagName || 'img'

        const elem = document.createElement(tagName)

        if ( tagName == 'img' ) {
            elem.setAttribute('src',
                view.skinUrl + skinElement.url
            )
        }

        if ( id ) {
            elem.setAttribute('id', id)
        }

        elem.setAttribute('style', `
            ${view.getSizeAndPositionCss(
                skinElement,
                loopIndexes,
                top,
                left
            )}
            position: ${cssPropPosition};
            z-index: ${zIndex};
        `)

        if ( parentElement ) {
            parentElement.appendChild(elem)
        } else {
            this.gameBoardElement.appendChild(elem)
        }

        return elem
    },

    getSizeAndPositionCss(elem, loopIndexes, top, left) {
        let result = ''

        result += `width: ${this.resolve(elem.width, loopIndexes)}px;
`
        result += `height: ${this.resolve(elem.height, loopIndexes)}px;
`
        if ( !left ) {
            if ( elem.left || elem.left == 0 ) {
                result += `left: ${this.resolve(elem.left, loopIndexes)}px;
`
            } else {
                result += `right: ${this.resolve(elem.right, loopIndexes)}px;
`
            }
        } else {
            result += `left: ${left};
`
        }

        if ( !top ) {
            if ( elem.top || elem.top == 0 ) {
                result += `top: ${this.resolve(elem.top, loopIndexes)}px;
`
            } else {
                result += `bottom: ${this.resolve(elem.bottom, loopIndexes)}px;
`
            }
        } else {
            result += `top: ${top};
`
        }

        return result
    },

    resolve(param, loopIndexes) {
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
                expressionParts[i] = this.resolve(eval(expressionPart), loopIndexes)
            }
        })

        return eval(expressionParts.join(' '))
    }
}