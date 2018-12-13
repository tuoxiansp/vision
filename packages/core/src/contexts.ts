import * as React from 'react'
import { ViewContextType, EditorContextType } from './Types'

export const ViewContext = React.createContext<ViewContextType>({ childMap: {} })

export const EditorContext = React.createContext<EditorContextType>({
    readonly: true,
    operations: {},
    operate: () => {},
})
