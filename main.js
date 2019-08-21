import { view } from './view.js'
import { game } from './game.js'

'use strict'

onload = async () => {
    window.view = view

    view.currentSkinIndex = localStorage.getItem('CurrentSkinIndex') || 0
    game.numberOfColumns = localStorage.getItem('numberOfColumns')
        || game.DEFAULT_NUMBER_OF_COLUMNS
    game.numberOfRows = localStorage.getItem('numberOfRows')
        || game.DEFAULT_NUMBER_OF_ROWS

    let { skins } = await import('./skins/skins.js')
    view.skinsRef = skins

    await view.repaint()
}

onclick = (event) => {
    const clickEventName = 'onClick' + toPascal(event.target.id)

    handling(clickEventName)
}

const handling = (clickEventName) => {
    if ( clickEventName.slice(0,'onClickChip'.length) == 'onClickChip' ) {
        handlers.onClickChip(clickEventName.slice('onClickChip'.length))
        return
    }

    if ( handlers[clickEventName] ) {
        handlers[clickEventName]()
    }
}

const handlers = {
    onClickAddRow: () => {
        if ( view.addRowElement.disabled ) {
            return
        }
        game.numberOfRows++
        view.repaint()
    },
    onClickRemoveRow: () => {
        if ( view.removeRowElement.disabled ) {
            return
        }
        game.numberOfRows--
        view.repaint()
    },
    onClickAddColumn: () => {
        if ( view.addColumnElement.disabled ) {
            return
        }
        game.numberOfColumns++
        view.repaint()
    },
    onClickRemoveColumn: () => {
        if ( view.removeColumnElement.disabled ) {
            return
        }
        game.numberOfColumns--
        view.repaint()
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
