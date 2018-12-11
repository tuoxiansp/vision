import { Editor, View, Data } from '@visionjs/core'
import React, { useState } from 'react'
import { defaultProps } from 'recompose'
import Text from '../../renderers/Text'

const Title = defaultProps({ content: 'title' })(Text)
const Description = defaultProps({ content: 'description' })(Text)

export const Editable = () => {
    const [ data, setData ] = useState(new Data())

    return (
        <Editor data={data} onChange={setData}>
            <h1>
                <View id="title" renderer={Title} />
            </h1>
            <View id="desccription" renderer={Description} />
        </Editor>
    )
}
