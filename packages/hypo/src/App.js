import React, { Fragment } from 'react'
import { Inspector } from 'retoggle'
import Editor from './Editor'

import './App.css'

function App() {
    return (
        <Fragment>
            <Inspector usePortal />
            <Editor />
        </Fragment>
    )
}

export default App
