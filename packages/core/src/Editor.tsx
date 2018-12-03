import * as React from 'react'
import { ChildMap, RendererMap, CompositorType, SetterType } from './Types'
import { EditorContext, ViewContext } from './contexts'
import Data from './Data'

type EditorProps = {
    readonly?: boolean
    data: ChildMap | Data
    onChange?: (data: Data) => void
    children?: React.ReactNode
    rendererMap?: RendererMap
    Compositor?: CompositorType
}

class Editor extends React.Component<EditorProps, object> {
    getSetter: () => (id: string, setter: SetterType) => void

    operate: (operation: string, value: any) => void

    constructor(props: EditorProps) {
        super(props)

        this.state = {}

        this.getSetter = () => (id: string, setter: SetterType) => {
            let { data = new Data() } = this.props
            if (!(data instanceof Data)) {
                data = new Data(data)
            }

            this.props.onChange && this.props.onChange((data as Data).produce(id, setter))
        }

        this.operate = (operation, value) => {
            this.setState({ [operation]: value })
        }
    }

    render() {
        const { readonly = false, rendererMap, children, Compositor } = this.props

        let { data = new Data() } = this.props
        if (!(data instanceof Data)) {
            data = new Data(data)
        }

        return (
            <EditorContext.Provider
                value={{
                    readonly,
                    rendererMap,
                    Compositor,
                    operations: { ...this.state },
                    operate: this.operate,
                }}
            >
                <ViewContext.Provider
                    value={{
                        childMap: data.value,
                        getSetter: this.getSetter,
                    }}
                >
                    {children}
                </ViewContext.Provider>
            </EditorContext.Provider>
        )
    }
}

export default Editor
