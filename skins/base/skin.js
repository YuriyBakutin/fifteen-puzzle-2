export const skin = {
    gameField: {
        width: 'view.skin.chip.size * game.numberOfColumns',
        height: 'view.skin.chip.size * game.numberOfRows',
        left: 'view.skin.frame.leftLineTile.width',
        top: 'view.skin.frame.topLineTile.height'
    },
    frame: {
        width: 'view.skin.frame.topLineTile.width + view.skin.chip.size * game.numberOfColumns + view.skin.frame.rightLineTile.width',
        height: 'view.skin.frame.topLineTile.height + view.skin.chip.size * game.numberOfRows + view.skin.frame.bottomLineTile.height',
        left: 0,
        top: 0,
        topLeftShadowCorner: {
            url: 'top-left-shadow-corner.svg',
            width: 'view.skin.chip.size',
            height: 'view.skin.chip.size',
            left: 'view.skin.frame.leftLineTile.width',
            top: 'view.skin.frame.topLineTile.height'
        },
        leftShadowLine: {
            url: 'left-shadow-line.svg',
            width: 'view.skin.chip.size',
            height: 'view.skin.chip.size',
            left: 'view.skin.frame.leftLineTile.width',
            top: 'view.skin.frame.topLineTile.height + view.skin.chip.size * ( yLoopIndex + 1 )',
        },
        topShadowLine: {
            url: 'top-shadow-line.svg',
            height: 'view.skin.chip.size',
            left: 'view.skin.frame.leftLineTile.width + view.skin.chip.size * ( xLoopIndex + 1 )',
            top: 'view.skin.frame.topLineTile.height'
        },
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
    },
    buttons: {
        width: 100,
        height: 100,
        startAndPause: {
            startUrl: 'start.png',
            pauseUrl: 'stop.png',
            width: 'view.skin.frame.buttons.width',
            height: 'view.skin.frame.buttons.height',
            left: 154,
            bottom: 6
        },
        restart: {
            url: 'restart.png',
            width: 'view.skin.frame.buttons.width',
            height: 'view.skin.frame.buttons.height',
            right: 'view.skin.frame.buttons.startAndPause.left',
            bottom: 'view.skin.frame.buttons.startAndPause.bottom'
        },
        removeRow: {
            url: 'add-row.png',
            width: 'view.skin.frame.buttons.width',
            height: 'view.skin.frame.buttons.height',
            left: 'view.skin.buttons.startAndPause.left',
            bottom: '( view.skin.frame.buttons.startAndPause.bottom * 2 + view.skin.frame.width / 2 ) / 3'
        },
        addRow: {
            url: 'add-row.png',
            width: 'view.skin.frame.buttons.width',
            height: 'view.skin.frame.buttons.height',
            right: 'view.skin.frame.buttons.removeRow.left',
            bottom: 'view.skin.frame.buttons.startAndPause.bottom'
        },
        removeColumn: {
            url: 'remove-column.png',
            width: 'view.skin.frame.buttons.width',
            height: 'view.skin.frame.buttons.height',
            left: 14,
            bottom: 'view.skin.frame.height / 3'
        },
        addColumn: {
            url: 'add-column.png',
            width: 'view.skin.frame.buttons.width',
            height: 'view.skin.frame.buttons.height',
            right: 'view.skin.frame.buttons.removeColumn.left',
            bottom: 'view.skin.frame.buttons.removeColumn.bottom'
        },
        previousSkin: {
            url: 'previous-view.skin.png',
            width: 'view.skin.frame.buttons.width',
            height: 'view.skin.frame.buttons.height',
            left: 14,
            top: 'view.skin.frame.height / 3'
        },
        nextSkin: {
            url: 'next-view.skin.png',
            width: 'view.skin.frame.buttons.width',
            height: 'view.skin.frame.buttons.height',
            right: 'view.skin.frame.buttons.removeColumn.left',
            bottom: 'view.skin.frame.buttons.removeColumn.bottom'
        }
    }
}
