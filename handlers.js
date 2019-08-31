import { view } from './view.js'
import { game } from './game.js'

'use strict'

onload = async () => {

    let { skins } = await import('./skins/skins.js')
    view.skinsRef = skins

    restart()
}

const restart = async () => {
    game.randomReplace()
    await view.repaint()
}

const getChipId = (element) => {
    if ( element == document.body ) {
        return null
    }

    if ( element.id ) {
        return element.id
    }

    return getChipId(element.parentNode)
}

onmouseup = (event) => {
    const chipId = getChipId(event.target)
    if ( !chipId ) {
        return
    }
    const mouseUpEventName = 'onMouseUp' + toPascal(chipId)

    if ( mouseUpEventName.slice(0,'onMouseUpChip'.length) == 'onMouseUpChip' ) {
        mouseEventHandlers.onMouseUpChip(mouseUpEventName.slice('onMouseUpChip'.length))
        return
    }
}

onclick = (event) => {
    const clickEventName = 'onClick' + toPascal(event.target.id)

    if ( mouseEventHandlers[clickEventName] ) {
        mouseEventHandlers[clickEventName]()
    }
}

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
    onMouseUpChip(chipIndex) {
        console.log('chipIndex: ', chipIndex)
    }
}

const toPascal = (nameInCamel) => {
    if ( !nameInCamel ) {
        return ''
    }
    const firstChar = nameInCamel[0]
    return firstChar.toUpperCase() + nameInCamel.slice(1)
}

onresize = async () => {
    clearTimeout(view.twitchWhenResizeEliminationTimerId)
    view.twitchWhenResizeEliminationTimerId = setTimeout(async () =>{
        document.body.innerHTML = ""
        await view.repaint()
    }, view.twitchWhenResizeEliminationTiming)
}
