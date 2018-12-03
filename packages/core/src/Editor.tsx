import * as React from 'react'
import { ChildMap, RendererMap, CompositorType } from './Types'
import { EditorContext, ViewContext } from './contexts'
import Data from './Data'

type Operation =
    | string
    | {
          operation: string
          initial: any
      }

type EditorProps = {
    readonly?: boolean
    data: ChildMap | Data
    onChange?: (data: Data) => void
    children?: React.ReactNode
    rendererMap?: RendererMap
    Compositor?: CompositorType
    operations?: Operation[]
}

class Editor extends React.Component<EditorProps, object> {
    constructor(props: EditorProps) {
        super(props)

        this.state = {}

        if (this.props.operations) {
            this.props.operations.forEach((operation) => {
                if (typeof operation === 'object') {
                    this.state[operation.operation] = operation.initial
                }
            })
        }
    }

    render() {
        const {
            readonly = false,
            rendererMap = {},
            onChange = () => {},
            children,
            Compositor,
            operations = [],
        } = this.props

        console.log(this.state)

        let { data = new Data() } = this.props
        if (!(data instanceof Data)) {
            data = new Data(data)
        }

        const o = {}
        operations.forEach((operation) => {
            if (typeof operation === 'string') {
                o[operation] = [
                    this.state[operation],
                    (value: any) => {
                        this.setState({ [operation]: value })
                    },
                ]
            } else {
                o[operation.operation] = [
                    this.state[operation.operation] || operation.initial,
                    (value: any) => {
                        this.setState({ [operation.operation]: value })
                    },
                ]
            }
        })

        return (
            <EditorContext.Provider
                value={{
                    readonly,
                    rendererMap,
                    Compositor,
                    operations: o,
                }}
            >
                <ViewContext.Provider
                    value={{
                        children: data.value,
                        set: (id, setter) => {
                            onChange((data as Data).produce(id, setter))
                        },
                    }}
                >
                    {children}
                </ViewContext.Provider>
            </EditorContext.Provider>
        )
    }
}

export default Editor
