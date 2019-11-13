import { view } from './view.mjs'

'use strict'

export class Indicator {

    constructor(argsObject) {
        let {skinElement, text} = argsObject

        this.frameElement_ = view.renderElement({
            skinElement,
            tagName: 'div',
            zIndex: view.CONTROL_Z_INDEX
        })

        view.renderElement({
            skinElement: view.skin.indicators.board,
            parentElement: this.frameElement_,
        })

        this.labelElement = view.renderElement({
            skinElement: view.skin.indicators.label,
            parentElement: this.frameElement_,
            text
        })
    }

    textUpdate(text) {
        this.labelElement.remove()
        this.labelElement = view.renderElement({
            skinElement: view.skin.indicators.label,
            parentElement: this.frameElement_,
            text
        })
    }
}
