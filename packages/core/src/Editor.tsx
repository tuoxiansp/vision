import * as React from 'react'
import { ChildMap, RendererMap, CompositorType } from './Types'
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

class Editor extends React.Component<EditorProps> {
    setter: any

    constructor(props: any) {
        super(props)

        this.setter = () => (id: string, setter: any) => {
            const data: Data = !(this.props.data instanceof Data) ? new Data(this.props.data) : this.props.data

            if (this.props.onChange) {
                this.props.onChange((data as Data).produce(id, setter))
            }
        }
    }

    render() {
        const { readonly = false, rendererMap, data = {}, children, Compositor }: EditorProps = this.props

        let d = data

        if (!(data instanceof Data)) {
            d = new Data(data)
        }

        return (
            <EditorContext.Provider
                value={{
                    readonly,
                    rendererMap,
                    Compositor,
                }}
            >
                <ViewContext.Provider
                    value={{
                        children: (d as Data).value,
                        setter: this.setter,
                    }}
                >
                    {children}
                </ViewContext.Provider>
            </EditorContext.Provider>
        )
    }
}

export default Editor
