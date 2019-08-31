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

onclick = (event) => {
    const clickEventName = 'onClick' + toPascal(event.target.id)

    clickHandling(clickEventName)
}

const clickHandling = (clickEventName) => {
    if ( clickEventName.slice(0,'onClickChip'.length) == 'onClickChip' ) {
        clickHandlers.onClickChip(clickEventName.slice('onClickChip'.length))
        return
    }

    if ( clickHandlers[clickEventName] ) {
        clickHandlers[clickEventName]()
    }
}

const clickHandlers = {
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
    onClickChip() {

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
