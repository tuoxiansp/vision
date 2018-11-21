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

const Editor = ({
    readonly = false,
    rendererMap = {},
    data = {},
    onChange = () => {},
    children,
    Compositor,
}: EditorProps) => {
    if (!(data instanceof Data)) {
        data = new Data(data)
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
                    children: data.value,
                    setter: () => (id, setter) => {
                        onChange((data as Data).produce(id, setter))
                    },
                }}
            >
                {children}
            </ViewContext.Provider>
        </EditorContext.Provider>
    )
}

export default Editor
