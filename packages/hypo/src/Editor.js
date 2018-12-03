import React, { useState } from 'react'
import { Editor as VisionEditor, Data } from '@visionjs/core'
import { useBooleanKnob, useLog } from '@visionjs/inspector'
import initCompositor from './lib/compositor/Compositor'
import Layout from './Layout'

const Compositor = initCompositor([])

function Editor() {
    const [ data, setData ] = useState(new Data())
    const [ readonly ] = useBooleanKnob('Readonly', false)

    useLog('Data', data.value)

    return (
        <VisionEditor
            data={new Data()}
            onChange={setData}
            readonly={true}
            operations={[ 'focused' ]}
            Compositor={Compositor}
        >
            <Layout />
        </VisionEditor>
    )
}

export default Editor
