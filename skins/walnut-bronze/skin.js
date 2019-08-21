export const skin = {
    backgroundColor: 'saddlebrown',
    gameField: {
        width: 'view.skin.chip.size * game.numberOfColumns',
        height: 'view.skin.chip.size * game.numberOfRows',
        left: 'view.skin.frame.leftLineTile.width',
        top: 'view.skin.frame.topLineTile.height',
        topLeftShadowCorner: {
            url: 'top-left-shadow-corner.svg',
            width: 'view.skin.chip.size',
            height: 'view.skin.chip.size',
            left: 0,
            top: 0
        },
        leftShadowLine: {
            url: 'left-shadow-line.svg',
            width: 'view.skin.chip.size',
            height: 'view.skin.chip.size',
            left: 0,
            top: 'view.skin.chip.size * yLoopIndex',
        },
        topShadowLine: {
            url: 'top-shadow-line.svg',
            width: 'view.skin.chip.size',
            height: 'view.skin.chip.size',
            left: 'view.skin.chip.size * xLoopIndex',
            top: 0
        }
    },
    frame: {
        width: 'view.skin.frame.topLineTile.width + view.skin.chip.size * game.numberOfColumns + view.skin.frame.rightLineTile.width',
        height: 'view.skin.frame.topLineTile.height + view.skin.chip.size * game.numberOfRows + view.skin.frame.bottomLineTile.height',
        left: '( view.clientWidth - view.skin.frame.width ) / 2',
        top: '( view.clientHeight - view.skin.frame.height ) / 2',
        topLineTile: {
            url: 'frame-top.svg',
            width: 'view.skin.chip.size',
            height: 100,
            left: 'view.skin.frame.leftLineTile.width + view.skin.chip.size * ( xLoopIndex + 1 )',
            top: 0
        },
        rightLineTile: {
            url: 'frame-right.svg',
            width: 100,
            height: 'view.skin.chip.size',
            right: 0,
            top: 'view.skin.frame.topLineTile.height + view.skin.chip.size * ( yLoopIndex + 1 )',
        },
        bottomLineTile: {
            url: 'frame-bottom.svg',
            width: 'view.skin.chip.size * ( game.numberOfColumns - 2 )',
            width: 'view.skin.chip.size',
            height: 100,
            left: 'view.skin.frame.leftLineTile.width + view.skin.chip.size * ( xLoopIndex + 1 )',
            bottom: 0
        },
        leftLineTile: {
            url: 'frame-left.svg',
            width: 100,
            height: 'view.skin.chip.size',
            left: 0,
            top: 'view.skin.frame.topLineTile.height + view.skin.chip.size * ( yLoopIndex + 1 )',
        },
        topLeftCorner: {
            url: 'frame-top-left-corner.svg',
            width: 'view.skin.frame.leftLineTile.width + view.skin.chip.size',
            height: 'view.skin.frame.topLineTile.height + view.skin.chip.size',
            left: 0,
            top: 0
        },
        topRightCorner: {
            url: 'frame-top-right-corner.svg',
            width: 'view.skin.frame.rightLineTile.width + view.skin.chip.size',
            height: 'view.skin.frame.topLineTile.height + view.skin.chip.size',
            right: 0,
            top: 0
        },
        bottomRightCorner: {
            url: 'frame-bottom-right-corner.svg',
            width: 'view.skin.frame.rightLineTile.width + view.skin.chip.size',
            height: 'view.skin.frame.bottomLineTile.height + view.skin.chip.size',
            right: 0,
            bottom: 0
        },
        bottomLeftCorner: {
            url: 'frame-bottom-left-corner.svg',
            width: 'view.skin.frame.rightLineTile.width + view.skin.chip.size',
            height: 'view.skin.frame.bottomLineTile.height + view.skin.chip.size',
            left: 0,
            bottom: 0
        },
        buttons: {
            width: 21,
            height: 21,
            startAndPause: {
                url: 'play-symbol.svg',
                startUrl: 'play-symbol.svg',
                pauseUrl: 'pause-symbol.svg',
                width: 'view.skin.frame.buttons.width',
                height: 'view.skin.frame.buttons.height',
                left: 100,
                bottom: 30
            },
            restart: {
                url: 'restart-symbol.svg',
                width: 'view.skin.frame.buttons.width',
                height: 'view.skin.frame.buttons.height',
                right: 'view.skin.frame.buttons.startAndPause.left',
                bottom: 'view.skin.frame.buttons.startAndPause.bottom'
            },
            removeRow: {
                url: 'minus-symbol.svg',
                disabledUrl: 'minus-symbol-disabled.svg',
                width: 'view.skin.frame.buttons.width',
                height: 'view.skin.frame.buttons.height',
                left: '( view.skin.frame.buttons.startAndPause.left + view.skin.gameField.width ) / 2',
                bottom: 'view.skin.frame.buttons.startAndPause.bottom'
            },
            addRow: {
                url: 'plus-symbol.svg',
                disabledUrl: 'plus-symbol-disabled.svg',
                width: 'view.skin.frame.buttons.width',
                height: 'view.skin.frame.buttons.height',
                right: 'view.skin.frame.buttons.removeRow.left',
                bottom: 'view.skin.frame.buttons.startAndPause.bottom'
            },
            removeColumn: {
                url: 'minus-symbol.svg',
                disabledUrl: 'minus-symbol-disabled.svg',
                width: 'view.skin.frame.buttons.width',
                height: 'view.skin.frame.buttons.height',
                left: 30,
                bottom: 'view.skin.frame.height / 3'
            },
            addColumn: {
                url: 'plus-symbol.svg',
                disabledUrl: 'plus-symbol-disabled.svg',
                width: 'view.skin.frame.buttons.width',
                height: 'view.skin.frame.buttons.height',
                right: 'view.skin.frame.buttons.removeColumn.left',
                bottom: 'view.skin.frame.buttons.removeColumn.bottom'
            },
            previousSkinImage: {
                url: 'skin-symbol.svg',
                width: 'view.skin.frame.buttons.width',
                height: 'view.skin.frame.buttons.height',
                left: 'view.skin.frame.buttons.removeColumn.left',
                top: 'view.skin.frame.height / 3 - 30'
            },
            nextSkinImage: {
                url: 'skin-symbol.svg',
                width: 'view.skin.frame.buttons.width',
                height: 'view.skin.frame.buttons.height',
                right: 'view.skin.frame.buttons.removeColumn.left',
                top: 'view.skin.frame.buttons.previousSkinImage.top'
            },
            previousSkin: {
                url: 'previous-skin-symbol.svg',
                disabledUrl: 'previous-skin-symbol-disabled.svg',
                width: 'view.skin.frame.buttons.width',
                height: 'view.skin.frame.buttons.height',
                left: 'view.skin.frame.buttons.removeColumn.left',
                top: 'view.skin.frame.height / 3'
            },
            nextSkin: {
                url: 'next-skin-symbol.svg',
                disabledUrl: 'next-skin-symbol-disabled.svg',
                width: 'view.skin.frame.buttons.width',
                height: 'view.skin.frame.buttons.height',
                right: 'view.skin.frame.buttons.removeColumn.left',
                top: 'view.skin.frame.buttons.previousSkin.top'
            }
        }
    },
    backsideBackgroundTile: {
        url: 'backside-tile.svg',
        width: 'view.skin.chip.size',
        height: 'view.skin.chip.size',
        left: 'view.skin.chip.size * xLoopIndex',
        top: 'view.skin.chip.size * yLoopIndex',
    },
    chip: {
        url: 'chip.png',
        size: 100,
        label: {
            fontUrl: 'fonts/LobsterLat.woff2',
            fontFamily: 'Lobster',
            fontSize: 70,
            opacity: 0.86160713,
            left: 'view.skin.frame.chip.size / 2',
            top: '( view.skin.frame.chip.size - view.skin.frame.chip.label.fontSize ) / 2'
        },
        shadow: {
            url: 'chip-shadow.svg',
            width: 140,
            height: 140,
            left: '( view.skin.frame.chip.size - view.skin.frame.chip.shadow.width ) / 2',
            top: '( view.skin.frame.chip.size - view.skin.frame.chip.shadow.width ) / 2'
        }
    },
    indicators: {
        width: 256,
        height: 100,
        label: {
            left: 'view.skin.frame.indicators.width / 2',
            top: '( view.skin.frame.indicators.height - view.skin.frame.indicators.font.fontSize ) / 2'
        },
        font: {
            fontUrl: 'fonts/source-code-pro-bold.woff2',
            fontFamily: 'Source Code Pro',
            fontSize: 70,
            opacity: 1
        },
        stepCounter: {
            url: 'step-counter.png',
            width: 'view.skin.frame.width',
            height: 'view.skin.frame.height',
            left: 154,
            top: 6,
            label: {
                left: 'view.skin.frame.indicators.width / 2',
                bottom: '( view.skin.frame.indicators.height + view.skin.frame.indicators.font.fontSize ) / 2'
            }
        },
        timeCounter: {
            url: 'time-counter.png',
            width: 'view.skin.frame.width',
            height: 'view.skin.frame.height',
            right: 'view.skin.frame.indicators.stepCounter.left',
            top: 'view.skin.frame.indicators.stepCounter.top',
            label: {
                left: 'view.skin.frame.indicators.width / 2',
                bottom: '( view.skin.frame.indicators.height + view.skin.frame.indicators.font.fontSize ) / 2'
            }
        }
    }
}
