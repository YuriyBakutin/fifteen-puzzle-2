import { view } from './view.js'
import { game } from './game.js'

'use strict'

onload = async () => {
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
