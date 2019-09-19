import { view } from './view.mjs'

'use strict'

export class Indicator {

    constructor(argsObject) {
        let {skinElement, text} = argsObject

        this.stepCounterFrameElement_ = view.renderElement({
            skinElement,
            tagName: 'div',
            zIndex: view.CONTROL_Z_INDEX
        })

        view.renderElement({
            skinElement: view.skin.indicators.picture,
            parentElement: this.stepCounterFrameElement_,
        })

        this.labelElement = view.renderElement({
            skinElement: view.skin.indicators.label,
            parentElement: this.stepCounterFrameElement_,
            text
        })
    }

    textUpdate(text) {
        this.labelElement.remove()
        this.labelElement = view.renderElement({
            skinElement: view.skin.indicators.label,
            parentElement: this.stepCounterFrameElement_,
            text
        })
    }
}
