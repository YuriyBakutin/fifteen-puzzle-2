export const skin = {
    backgroundColor: 'rgb(31, 26, 22)',
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
            top: 'view.skin.chip.size * yPlaceIndex',
        },
        topShadowLine: {
            url: 'top-shadow-line.svg',
            width: 'view.skin.chip.size',
            height: 'view.skin.chip.size',
            left: 'view.skin.chip.size * xPlaceIndex',
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
            left: 'view.skin.frame.leftLineTile.width + view.skin.chip.size * ( xPlaceIndex + 1 )',
            top: 0
        },
        rightLineTile: {
            url: 'frame-right.svg',
            width: 100,
            height: 'view.skin.chip.size',
            right: 0,
            top: 'view.skin.frame.topLineTile.height + view.skin.chip.size * ( yPlaceIndex + 1 )',
        },
        bottomLineTile: {
            url: 'frame-bottom.svg',
            width: 'view.skin.chip.size * ( game.numberOfColumns - 2 )',
            width: 'view.skin.chip.size',
            height: 100,
            left: 'view.skin.frame.leftLineTile.width + view.skin.chip.size * ( xPlaceIndex + 1 )',
            bottom: 0
        },
        leftLineTile: {
            url: 'frame-left.svg',
            width: 100,
            height: 'view.skin.chip.size',
            left: 0,
            top: 'view.skin.frame.topLineTile.height + view.skin.chip.size * ( yPlaceIndex + 1 )',
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
            addRemoveRowImage: {
                url: 'rows-symbol.svg',
                disabledUrl: 'minus-symbol-disabled.svg',
                width: 'view.skin.frame.buttons.width',
                height: 'view.skin.frame.buttons.height',
                left: 'view.skin.gameField.left + ( view.skin.gameField.width - view.skin.frame.buttons.width ) / 2',
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
            removeColumnImage: {
                url: 'columns-symbol.svg',
                width: 'view.skin.frame.buttons.width',
                height: 'view.skin.frame.buttons.height',
                left: 30,
                bottom: 'view.skin.frame.height / 3'
            },
            addColumnImage: {
                url: 'columns-symbol.svg',
                width: 'view.skin.frame.buttons.width',
                height: 'view.skin.frame.buttons.height',
                right: 'view.skin.frame.buttons.removeColumnImage.left',
                bottom: 'view.skin.frame.buttons.removeColumnImage.bottom'
            },
            removeColumn: {
                url: 'minus-symbol.svg',
                disabledUrl: 'minus-symbol-disabled.svg',
                width: 'view.skin.frame.buttons.width',
                height: 'view.skin.frame.buttons.height',
                left: 'view.skin.frame.buttons.removeColumnImage.left',
                bottom: '( view.skin.frame.height / 3 ) - view.skin.frame.buttons.height * 2'
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
                top: 'view.skin.frame.height / 3 - view.skin.frame.buttons.height * 2'
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
        left: 'view.skin.chip.size * xPlaceIndex',
        top: 'view.skin.chip.size * yPlaceIndex',
    },
    chip: {
        size: 100,
        chipFrame: {
            width: 'view.skin.chip.size',
            height: 'view.skin.chip.size',
            left: 'view.skin.chip.size * xPlaceIndex',
            top: 'view.skin.chip.size * yPlaceIndex',
        },
        chip: {
            url: 'chip.svg'
        },
        label: {
            // Notation ??...?? for replace by actual data
            // See view.renderElement()
            svg: `
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="??width??"
                height="??height??"
                viewBox="0 0 95 95">
                <defs>
                    <style type="text/css">
                        <![CDATA[
                            @font-face {
                                font-family: Lobster;
                                src: url('??skinUrl??fonts/LobsterLat.woff2');
                            }
                        ]]>
                    </style>
                </defs>
                <text
                    style="font-family:'Lobster';text-align:center;font-size:60px;text-anchor:middle;fill:#000000;fill-opacity:0.82773108"
                    x="47.5"
                    y="70">??text??</text>
            </svg>` + '\n'
        },
        shadow: {
            url: 'chip-shadow.svg',
            width: 140,
            height: 140,
            // positioned relative to gameField
            left: 'view.skin.chip.size * xPlaceIndex + ( view.skin.chip.size - view.skin.chip.shadow.width ) / 2',
            top: 'view.skin.chip.size * yPlaceIndex + ( view.skin.chip.size - view.skin.chip.shadow.width ) / 2'
        }
    },
    indicators: {
        width: 120,
        height: 70,
        board: {
            url: 'indicator.svg',
        },
        label: {
            // Notation ??...?? for replace by actual data
            // See view.renderElement()
            svg: `
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="??width??"
                height="??height??"
                viewBox="0 0 31.749999 18.520834">
                <defs>
                    <style type="text/css">
                        <![CDATA[
                            @font-face {
                                font-family: 'DejaVu Sans Condensed Bold';
                                src: url('??skinUrl??fonts/dejavu-sans-condensed-bold-webfont.woff2');
                            }
                        ]]>
                    </style>
                </defs>
                <text
                    y="11.828742"
                    x="15.880168"
                    style="font-weight:bold;font-size:7.05555534px;font-family:'DejaVu Sans Condensed Bold';text-align:center;text-anchor:middle;fill:#000000;fill-opacity:0.82773108"
                    xml:space="preserve">??text??</text>
            </svg>` + '\n'
        },
        timeCounter: {
            width: 'view.skin.indicators.width',
            height: 'view.skin.indicators.height',
            left: 90,
            top: -5
        },
        stepCounter: {
            width: 'view.skin.indicators.width',
            height: 'view.skin.indicators.height',
            right: 'view.skin.indicators.timeCounter.left',
            top: 'view.skin.indicators.timeCounter.top'
        }
    },
}
