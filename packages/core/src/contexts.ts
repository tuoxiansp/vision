import * as React from 'react'
import { ViewContextType, EditorContextType } from './Types'

export const ViewContext = React.createContext<ViewContextType>({ children: {} })

export const EditorContext = React.createContext<EditorContextType>({
    readonly: true,
})
