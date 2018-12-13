import React, { useState } from 'react'
import { Editor as VisionEditor, Data } from '@visionjs/core'
import { useBooleanKnob, useLog } from 'retoggle'
import initCompositor from './lib/compositor/Compositor'
import Layout from './Layout'

const Compositor = initCompositor([])

function Editor() {
    const [ data, setData ] = useState(new Data())
    const [ readonly ] = useBooleanKnob('Readonly', false)

    useLog('Data', data.value)

    return (
        <VisionEditor data={data} onChange={setData} readonly={readonly} Compositor={Compositor}>
            <Layout />
        </VisionEditor>
    )
}

export default Editor
