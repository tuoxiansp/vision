import * as React from 'react'
import { Renderer, SetterType } from './Types'
import { ViewContext, EditorContext } from './contexts'

type Props = { id: string; defaultRenderer: Renderer; propsListener: (props: object) => void }

export default class View extends React.Component<Props> {
    render() {
        const { id, defaultRenderer, propsListener } = this.props
        const Comp = defaultRenderer as any

        return (
            <EditorContext.Consumer>
                {({ readonly, rendererMap, Compositor }) => {
                    return (
                        <ViewContext.Consumer>
                            {({ children, set = () => {} }) => {
                                const node = (children && children[id]) || { id }

                                const setProps = !readonly
                                    ? (props: object) => {
                                          set(id, (node = { id }) => {
                                              node.props = props

                                              return node
                                          })
                                      }
                                    : () => {}

                                const lens = (childId: string, childSetter: SetterType): void => {
                                    set(id, (node = { id }) => {
                                        if (!node.children) {
                                            node.children = {}
                                        }

                                        node.children[childId] = childSetter(node.children[childId] || { id })

                                        return node
                                    })
                                }

                                let element = null

                                const props = node.props || {}

                                if (typeof propsListener === 'function') {
                                    propsListener(props)
                                }

                                if (node.type === undefined) {
                                    element = <Comp {...props} readonly={readonly} requestUpdateProps={setProps} />
                                } else if (node.type !== null) {
                                    element = rendererMap[node.type](node.props || {}, readonly, setProps)
                                } else {
                                    //TODO add prop: emptyRenderer
                                    element = null
                                }

                                if (!readonly && Compositor) {
                                    element = (
                                        <Compositor setter={set.bind(null, id)} rendererMap={rendererMap} node={node}>
                                            {element}
                                        </Compositor>
                                    )
                                }

                                return (
                                    <ViewContext.Provider value={{ children: node.children, set: lens }}>
                                        {element}
                                    </ViewContext.Provider>
                                )
                            }}
                        </ViewContext.Consumer>
                    )
                }}
            </EditorContext.Consumer>
        )
    }
}
