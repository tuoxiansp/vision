import { ReactNode, ComponentClass, StatelessComponent } from 'react'

export type ChildMap = {
    [K: string]: Node | undefined
}

export type Node = {
    id: string
    type?: string | null
    props?: object
    children?: ChildMap
}

export type Renderer = (props: object, readonly: boolean, requestUpdateProps: (props: object) => void) => ReactNode

type CompositorPropType = {
    setter: SetterType
    rendererMap: RendererMap
    node: Node
    children: ReactNode
}

export type CompositorType = React.ComponentType<CompositorPropType>

export type SetterType = (node: Node) => Node

export type ViewContextType = {
    children?: ChildMap
    set?: (id: string, setter: SetterType) => void
}

export type RendererMap = {
    [K: string]: Renderer
}

export type EditorContextType = {
    readonly: boolean
    rendererMap: RendererMap
    Compositor?: CompositorType
}
