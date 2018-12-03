import * as React from 'react'
import { SetterType, Anchor, Renderer } from './Types'
import { ViewContext, EditorContext } from './contexts'

type Props = { id: string; defaultRenderer: Renderer; propsListener: (props: object) => void }

export default class View extends React.Component<Props> {
    render() {
        const { id, defaultRenderer, propsListener } = this.props

        const createEmptyAnchor = (): Anchor => ({ id, nodes: [ {} ] })

        return (
            <EditorContext.Consumer>
                {({ readonly, rendererMap, Compositor }) => {
                    return (
                        <ViewContext.Consumer>
                            {({ children, set = () => {} }) => {
                                const anchor = (children && children[id]) || createEmptyAnchor()
                                function getElements(operations: object[]) {
                                    const elements = anchor.nodes.map((node, index): React.ReactNode => {
                                        const setProps = !readonly
                                            ? (props: object) => {
                                                  set(id, (anchor = createEmptyAnchor()) => {
                                                      const localNode = anchor.nodes[index] || { ...node }
                                                      if (!localNode.props) {
                                                          localNode.props = {}
                                                      }

                                                      Object.keys(props).forEach((key) => {
                                                          return ((localNode.props as object)[key] = props[key])
                                                      })

                                                      anchor.nodes[index] = localNode

                                                      return anchor
                                                  })
                                              }
                                            : () => {}

                                        const lens = (childId: string, childSetter: SetterType): void => {
                                            set(id, (anchor = createEmptyAnchor()) => {
                                                const localNode = anchor.nodes[index] || { ...node }

                                                if (!localNode.anchors) {
                                                    localNode.anchors = {}
                                                }

                                                localNode.anchors[childId] = childSetter(localNode.anchors[childId])
                                                anchor.nodes[index] = localNode

                                                return anchor
                                            })
                                        }

                                        let element = null

                                        const operation = operations[index] || {}

                                        const props = { ...node.props || {}, ...operation }

                                        if (typeof propsListener === 'function') {
                                            propsListener(props)
                                        }

                                        if (!node.type && defaultRenderer) {
                                            const Comp = defaultRenderer
                                            element = (
                                                <Comp {...props} readonly={readonly} requestUpdateProps={setProps} />
                                            )
                                        } else if (node.type) {
                                            const Comp = rendererMap[node.type]
                                            if (!Comp) {
                                                throw new Error('Can not find renderer of ' + node.type)
                                            }
                                            element = (
                                                <Comp {...props} readonly={readonly} requestUpdateProps={setProps} />
                                            )
                                        } else {
                                            console.warn('Something is wrong. Node.type should not be null')
                                            element = null
                                        }

                                        return (
                                            <ViewContext.Provider value={{ children: node.anchors, set: lens }}>
                                                {element}
                                            </ViewContext.Provider>
                                        )
                                    })

                                    return elements
                                }
                                if (!readonly && Compositor) {
                                    return (
                                        <Compositor
                                            set={(setter) => {
                                                set(id, (anchor = createEmptyAnchor()) => {
                                                    anchor.nodes = setter(anchor.nodes)

                                                    return anchor
                                                })
                                            }}
                                            rendererMap={rendererMap}
                                            nodes={anchor.nodes}
                                        >
                                            {(operations) => {
                                                return getElements(operations)
                                            }}
                                        </Compositor>
                                    )
                                }

                                return getElements([])
                            }}
                        </ViewContext.Consumer>
                    )
                }}
            </EditorContext.Consumer>
        )
    }
}
