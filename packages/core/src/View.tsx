import * as React from 'react'
import { Renderer, SetterType, Node } from './Types'
import { ViewContext, EditorContext } from './contexts'

type Props = {
    id: string
    defaultRenderer: Renderer
    propsListener?: (props: object, ...rest: any[]) => void
}

function shallowDiffers(a: object, b: object) {
    for (let i in a) if (!(i in b)) return true
    for (let i in b) if (a[i] !== b[i]) return true
    return false
}

class V extends React.Component {
    getLens: () => any

    constructor(props: Props) {
        super(props)

        this.getLens = () => {
            const { id } = this.props as any
            const { setter } = this.context

            const lens = (childId: string, childSetter: SetterType): void => {
                setter()(id, (node: Node = { id }) => {
                    if (!node.children) {
                        node.children = {}
                    }

                    node.children[childId] = childSetter(node.children[childId] || { id })

                    return node
                })
            }

            return lens
        }
    }

    shouldComponentUpdate(prevProps: any) {
        const prev = { ...prevProps, children: prevProps.children[prevProps.id] }
        const props = this.props as any
        const curr = { ...props, children: props.children[props.id] }

        return shallowDiffers(prev, curr)
    }

    render() {
        const { id, defaultRenderer, propsListener, children, setter, readonly, rendererMap = {}, Compositor } = this
            .props as any
        const Comp = defaultRenderer as any

        console.log('render:', id)

        const node = (children && children[id]) || { id }

        const setProps = !readonly
            ? (props: object) => {
                  setter()(id, (node: Node = { id }) => {
                      node.props = { ...node.props, ...props }

                      return node
                  })
              }
            : () => {}

        let element = null
        const props = node.props || {}

        if (typeof propsListener === 'function') {
            propsListener(props, node, children)
        }

        if (node.type === undefined) {
            element = <Comp {...props} readonly={readonly} requestUpdateProps={setProps} />
        } else if (node.type !== null) {
            element = rendererMap[node.type](props, readonly, setProps)
        } else {
        }

        if (!readonly && Compositor) {
            element = (
                <Compositor setter={setter().bind(null, id)} rendererMap={rendererMap} node={node}>
                    {element}
                </Compositor>
            )
        }

        return (
            <ViewContext.Provider value={{ children: node.children, setter: this.getLens }}>
                {element}
            </ViewContext.Provider>
        )
    }
}

export const ViewWrapper: React.FunctionComponent<Props> = (props) => (
    <EditorContext.Consumer>
        {(editorContext) => (
            <ViewContext.Consumer>
                {(viewContext) => {
                    const p = {
                        ...props,
                        ...editorContext,
                        ...viewContext,
                    }

                    return <V {...p} />
                }}
            </ViewContext.Consumer>
        )}
    </EditorContext.Consumer>
)

export default ViewWrapper
