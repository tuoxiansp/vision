import * as React from 'react'
import { Renderer, SetterType, Node } from './Types'
import { ViewContext, EditorContext } from './contexts'

type Props = {
    id: string
    defaultRenderer: Renderer
    propsListener?: (props: object, ...rest: any[]) => void
}

export default class View extends React.Component<Props> {
    static contextType = ViewContext
    lastNode: Node | undefined
    getLens: () => any

    constructor(props: Props) {
        super(props)

        console.log('initial')

        this.getLens = () => {
            const { id } = this.props
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

        // setInterval(() => {
        //     this.setState({ abc: Math.random() })
        // }, 1000)
    }

    componentWillUpdate() {
        console.log('update', this.props.id)
    }

    componentDidMount() {
        // console.log('mount', this.props.id)
    }

    componentDidUpdate() {
        // console.log('updated', this.props.id)
    }

    componentWillReceiveProps() {
        // console.log('receive', this.props.id)
    }

    shouldComponentUpdate() {
        console.log(1111111112222, this.props.id)
        return false
        // const { id } = this.props
        // const { children } = this.context

        // const node = children && children[id]
        // const res = node === this.lastNode

        // console.log(res, id, 222222222222)

        // this.lastNode = node

        // return !res
    }

    render() {
        const { id, defaultRenderer, propsListener } = this.props
        const { children, setter } = this.context
        const Comp = defaultRenderer as any

        console.log('render:', id)

        return (
            <EditorContext.Consumer>
                {({ readonly, rendererMap, Compositor }) => {
                    console.log('context render:', id)

                    const node = (children && children[id]) || { id }

                    const setProps = !readonly
                        ? (props: object) => {
                              setter()(id, (node: Node = { id }) => {
                                  node.props = { ...node.props, ...props }

                                  return node
                              })
                          }
                        : () => {}

                    // const lens = (childId: string, childSetter: SetterType): void => {
                    //     set(id, (node = { id }) => {
                    //         if (!node.children) {
                    //             node.children = {}
                    //         }

                    //         node.children[childId] = childSetter(node.children[childId] || { id })

                    //         return node
                    //     })
                    // }

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
                }}
            </EditorContext.Consumer>
        )
    }
}
