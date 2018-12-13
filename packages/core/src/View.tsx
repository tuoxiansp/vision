import * as React from 'react'
import { SetterType, Anchor, Renderer, ViewContextType, EditorContextType } from './Types'
import { ViewContext, EditorContext } from './contexts'

type Props = { id: string; render: Renderer }

const emptyGetSetter = () => () => {}

const shallowDiffers = (a: object, b: object) => {
    for (let i in a) if (!(i in b)) return true
    for (let i in b) if (a[i] !== b[i]) return true
    return false
}

type VProps = ViewContextType & EditorContextType & Props

type LensGetter = (index: number) => () => ((childId: string, childSetter: SetterType) => void)

class V extends React.Component<VProps> {
    getLens: LensGetter
    createEmptyAnchor: () => Anchor
    cache: object = {}
    memorize(f: Function): Function {
        return (arg: any) => {
            if (!this.cache[arg]) {
                this.cache[arg] = f.call(this, arg)
            }

            return this.cache[arg]
        }
    }

    constructor(props: any) {
        super(props)

        const createEmptyAnchor = (): Anchor => ({ id: this.props.id, nodes: [ {} ] })
        this.createEmptyAnchor = createEmptyAnchor

        this.getLens = this.memorize((index: number) => () => {
            const { id, getSetter = emptyGetSetter } = this.props

            return (childId: string, childSetter: SetterType): void => {
                getSetter()(id, (anchor = createEmptyAnchor()) => {
                    const node = anchor.nodes[index]

                    if (!node.anchors) {
                        node.anchors = {}
                    }

                    node.anchors[childId] = childSetter(node.anchors[childId])
                    anchor.nodes[index] = node

                    return anchor
                })
            }
        }) as LensGetter
    }

    shouldComponentUpdate(prevProps: VProps) {
        const prev = {
            ...prevProps,
            childMap: prevProps.childMap && prevProps.childMap[prevProps.id],
            operations: undefined,
        }
        const props = this.props
        const curr = { ...props, childMap: props.childMap && props.childMap[props.id], operations: undefined }

        return shallowDiffers(prev, curr) || shallowDiffers(prevProps.operations, props.operations)
    }

    render() {
        const { id, render, childMap, getSetter = emptyGetSetter, readonly, rendererMap = {}, Compositor } = this.props

        const anchor = (childMap && childMap[id]) || this.createEmptyAnchor()
        const getElements = (operations: object[]) => {
            const elements = anchor.nodes.map((node, index): React.ReactNode => {
                const setProps = !readonly
                    ? (props: object) => {
                          getSetter()(id, (anchor = this.createEmptyAnchor()) => {
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

                let element = null

                const operation = operations[index] || {}

                const props = { ...node.props || {}, ...operation }

                if (!node.type && render) {
                    element = render({ props, readonly, requestUpdateProps: setProps })
                } else if (node.type) {
                    const render = rendererMap[node.type]
                    if (!render) {
                        throw new Error('Can not find renderer of ' + node.type)
                    }
                    element = render({ props, readonly, requestUpdateProps: setProps })
                } else {
                    console.error('Something is wrong. Node.type should not be null')
                    element = null
                }

                return (
                    <ViewContext.Provider
                        key={index}
                        value={{ childMap: node.anchors, getSetter: this.getLens(index) }}
                    >
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
                        getSetter()(id, (anchor = this.createEmptyAnchor()) => {
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
    }
}

const ViewWrapper: React.FunctionComponent<Props> = (props) => (
    <EditorContext.Consumer>
        {(editorContext) => (
            <ViewContext.Consumer>
                {(viewContext) => <V {...{ ...editorContext, ...viewContext, ...props }} />}
            </ViewContext.Consumer>
        )}
    </EditorContext.Consumer>
)

export default ViewWrapper
