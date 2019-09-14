import { view } from './view.mjs'
import { game } from './game.mjs'

'use strict'

onload = async () => {

    let { skins } = await import('./skins/skins.mjs')
    view.skinsRef = skins

    document.addEventListener('gameOver', onGameOver)

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

onmousedown = (event) => {
    const chipId = getChipId(event.target)
    if ( !chipId ) {
        return
    }

    mouseDownPoint.x = event.clientX
    mouseDownPoint.y = event.clientY

    const mouseDownEventName = 'onMouseDown' + toPascalCase(chipId)

    if ( mouseDownEventName.slice(0,'onMouseDownChip'.length) == 'onMouseDownChip' ) {
        mouseEventHandlers.onMouseDownChip(
            mouseDownEventName.slice('onMouseDownChip'.length)
        )
        return
    }
}

onmousemove = (event) => {
    if ( !chipPickedIndex ) {
        return
    }

    let mouseMoveShift = {
        x: event.clientX - mouseDownPoint.x,
        y: event.clientY - mouseDownPoint.y
    }

    mouseEventHandlers.onMouseMove(mouseMoveShift)
}

onmouseup = () => {
    mouseEventHandlers.onMouseUp()
}

onclick = (event) => {
    const clickEventName = 'onClick' + toPascalCase(event.target.id)

    if ( mouseEventHandlers[clickEventName] ) {
        mouseEventHandlers[clickEventName]()
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

const mouseEventHandlers = {
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

    onMouseDownChip(chipIndex) {
        if ( Number.isNaN(+chipIndex) || gamePaused == true || gameOver == true ) {
            return
        }

        chipPickedIndex = chipIndex

        hasNextPosition = game.setNextPosition(chipIndex)

        if ( hasNextPosition ) {
            view.defineMovingElements(chipPickedIndex)
        }
    },

    onMouseUp() {
        if ( !hasNextPosition ) {
            return
        }

        chipPickedIndex = null
        view.moveChipByGame()
    },

    onMouseMove(mouseMoveShift) {
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
