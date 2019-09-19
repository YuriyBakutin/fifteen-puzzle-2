import { view } from './view.mjs'
import { game } from './game.mjs'

'use strict'

onload = async () => {

    let { skins } = await import('./skins/skins.mjs')
    view.skinsRef = skins

    document.addEventListener('gameOver', onGameOver)

    document.body.addEventListener('touchstart', ontouchstart)
    document.body.addEventListener('touchmove', ontouchmove)
    document.body.addEventListener('touchend', ontouchend)

    restart()
}

let gamePaused = false
let gameOver = true

const onGameOver = () => {
    console.log('Game over!')
    gameOver = true
}

const restart = async () => {
    gamePaused = false
    gameOver = false
    game.stepCounter = 0
    game.randomReplace()
    await view.repaint()
}

const getChipId = (element) => {
    if ( !element || element == document.body ) {
        return null
    }

    if ( element.id ) {
        return element.id
    }

    return getChipId(element.parentNode)
}

let chipPickedIndex
let mouseDownPoint = {}

const ontouchstart = (event) => {
    let firstTouchPointEvent = event.changedTouches[0]
    onPickStart(firstTouchPointEvent)
}

onmousedown = (event) => {
    event.preventDefault()
    onPickStart(event)
}

const onPickStart = (event) => {

    const chipId = getChipId(event.target)

    if ( !chipId || !chipId.startsWith('chip') ) {
        return
    }

    mouseDownPoint.x = +event.clientX
    mouseDownPoint.y = +event.clientY

    userEventHandlers.onPickChipStart(
        chipId.slice('chip'.length)
    )
}

const ontouchmove = (event) => {
    let firstTouchPointEvent = event.changedTouches[0]
    onPickMove(firstTouchPointEvent)
}

onmousemove = (event) => {
    event.preventDefault()
    onPickMove(event)
}

const onPickMove = (event) => {
    if ( !chipPickedIndex ) {
        return
    }

    let mouseMoveShift = {
        x: event.clientX - mouseDownPoint.x,
        y: event.clientY - mouseDownPoint.y
    }

    userEventHandlers.onPickChipMove(mouseMoveShift)
}

const ontouchend = (event) => {
    userEventHandlers.onPickChipEnd()
}

onmouseup = (event) => {
    event.preventDefault()
    userEventHandlers.onPickChipEnd()
}

onclick = (event) => {
    const clickEventName = 'onClick' + toPascalCase(event.target.id)

    if ( userEventHandlers[clickEventName] ) {
        userEventHandlers[clickEventName]()
    }
}

const toPascalCase = (nameInCamelCase) => {
    if ( !nameInCamelCase ) {
        return ''
    }
    const firstChar = nameInCamelCase[0]
    return firstChar.toUpperCase() + nameInCamelCase.slice(1)
}

let hasNextPosition = false

const userEventHandlers = {
    onClickAddRow() {
        if ( view.addRowElement.disabled ) {
            return
        }
        game.numberOfRows++
        restart()
    },

    onClickRemoveRow() {
        if ( view.removeRowElement.disabled ) {
            return
        }
        game.numberOfRows--
        restart()
    },

    onClickAddColumn() {
        if ( view.addColumnElement.disabled ) {
            return
        }
        game.numberOfColumns++
        restart()
    },

    onClickRemoveColumn() {
        if ( view.removeColumnElement.disabled ) {
            return
        }
        game.numberOfColumns--
        restart()
    },

    onClickNextSkin() {
        view.currentSkinIndex++
        if ( view.currentSkinIndex == view.skinsRef.length ) {
            view.currentSkinIndex = 0
        }
        view.skinUpdate()
        view.repaint()
    },

    onClickPreviousSkin() {
        view.currentSkinIndex--
        if ( view.currentSkinIndex < 0 ) {
            view.currentSkinIndex = view.skinsRef.length - 1
        }
        view.skinUpdate()
        view.repaint()
    },

    onClickRestart() {
        restart()
    },

    onClickStartAndPause() {
        // restart()
    },

    onPickChipStart(chipIndex) {
        if ( Number.isNaN(+chipIndex) || gamePaused == true || gameOver == true ) {
            return
        }

        chipPickedIndex = chipIndex

        hasNextPosition = game.setNextPosition(chipIndex)

        if ( hasNextPosition ) {
            game.stepCounter++
            view.updateStepCounter()
            view.defineMovingElements(chipPickedIndex)
        }
    },

    onPickChipEnd() {
        if ( !hasNextPosition ) {
            return
        }

        chipPickedIndex = null
        view.moveChipByGame()
    },

    onPickChipMove(mouseMoveShift) {
        if ( !hasNextPosition ) {
            return
        }

        view.moveChipByUser(mouseMoveShift)
    }
}

onresize = async () => {
    clearTimeout(view.twitchWhenResizeEliminationTimerId)
    view.twitchWhenResizeEliminationTimerId = setTimeout(async () =>{
        document.body.innerHTML = ""
        await view.repaint()
    }, view.twitchWhenResizeEliminationTiming)
}
