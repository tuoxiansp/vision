import React, { Component, Fragment } from 'react'
import { createPortal } from 'react-dom'
import Modifier from './Modifier'
import { EditorContext } from '@visionjs/core'
import Popup from 'reactjs-popup'

const { Consumer } = EditorContext

const initCompositor = (maps = []) =>
    class Compositor extends Component {
        state = {
            hovered: -1,
            focused: -1,
            focusedIndex: -1,
        }

        render() {
            const { set, rendererMap, nodes, children, state, setState } = this.props
            const del = (index) => {
                this.setState({ focusedIndex: -1 })
                set((nodes) => {
                    nodes.splice(index, 1)

                    return nodes
                })
            }

            const copy = (index) => {
                set((nodes) => {
                    const node = nodes[index]
                    nodes.splice(index + 1, 0, node)

                    return nodes
                })
            }

            const insert = (index, type) => {
                this.setState({ focusedIndex: this.state.focusedIndex + 1 })
                set((nodes) => {
                    nodes.splice(index, 0, { type })

                    return nodes
                })
            }

            return (
                <Consumer>
                    {({ operations: { focused: [ focused = 0, focus ] } }) => {
                        const operations = []
                        if (this.state.focused === focused) {
                            operations[this.state.focusedIndex] = { focused: true }
                        }
                        const childs = children(operations)

                        return (
                            <Fragment>
                                {nodes.map((node, index) => {
                                    return (
                                        <Modifier
                                            onMouseEnter={() => {
                                                this.setState({
                                                    hovered: index,
                                                })
                                            }}
                                            onMouseLeave={() => {
                                                this.setState({
                                                    hovered: -1,
                                                })
                                            }}
                                            onMouseDown={() => {
                                                const next = focused + 1
                                                this.setState({ focused: next, focusedIndex: index })
                                                focus(next)
                                            }}
                                            surface={childs[index]}
                                        >
                                            {(x, y, w, h) => {
                                                const isFocused =
                                                    this.state.focused === focused && this.state.focusedIndex === index

                                                return (
                                                    (this.state.hovered === index || isFocused) &&
                                                    createPortal(
                                                        <div
                                                            style={{
                                                                width: w,
                                                                height: h,
                                                                position: 'absolute',
                                                                left: x,
                                                                top: y,
                                                                pointerEvents: 'none',
                                                                outline: '1px blue solid',
                                                            }}
                                                        >
                                                            {isFocused && (
                                                                <div
                                                                    style={{
                                                                        width: 'max-content',
                                                                        position: 'absolute',
                                                                        top: -20,
                                                                        pointerEvents: 'auto',
                                                                    }}
                                                                >
                                                                    <button onClick={del.bind(null, index)}>
                                                                        Delete
                                                                    </button>
                                                                    <button onClick={copy.bind(null, index)}>
                                                                        Copy
                                                                    </button>
                                                                    <Popup trigger={<button>Insert</button>}>
                                                                        {maps.map(([ text, value ]) => (
                                                                            <button
                                                                                onClick={insert.bind(
                                                                                    null,
                                                                                    index,
                                                                                    value
                                                                                )}
                                                                            >
                                                                                {text}
                                                                            </button>
                                                                        ))}
                                                                    </Popup>
                                                                </div>
                                                            )}
                                                        </div>,
                                                        document.body
                                                    )
                                                )
                                            }}
                                        </Modifier>
                                    )
                                })}
                            </Fragment>
                        )
                    }}
                </Consumer>
            )
        }
    }

export default initCompositor
