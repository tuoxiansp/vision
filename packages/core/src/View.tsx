import * as React from 'react'
import { Renderer, SetterType } from './Types'
import { ViewContext, EditorContext } from './contexts'

type Props = { id: string; defaultRenderer: Renderer }

export default class View extends React.Component<Props> {
    render() {
        const { id, defaultRenderer } = this.props
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

                                if (!node || node.type === undefined) {
                                    const props = (node && node.props) || {}

                                    element = <Comp {...props} readonly={readonly} requestUpdateProps={setProps} />
                                } else if (node.type !== null) {
                                    element = rendererMap[node.type](node.props || {}, readonly, setProps)
                                } else {
                                }

                                if (!readonly && Compositor) {
                                    element = (
                                        <Compositor
                                            setter={set.bind(null, id)}
                                            rendererMap={rendererMap}
                                            node={node || { id }}
                                        >
                                            {element}
                                        </Compositor>
                                    )
                                }

                                return (
                                    <ViewContext.Provider value={{ children: node && node.children, set: lens }}>
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
