import { Editor, View, Data } from '@visionjs/core'
import React, { useState } from 'react'
import defaultProps from '../../utils/defaultProps'
import Text from '../../renderers/Text'

export const Editable = () => {
    const [ data, setData ] = useState(new Data())

    return (
        <Editor data={data} onChange={setData}>
            <h1>
                <View id="title" render={defaultProps({ content: 'title' })(Text)} />
            </h1>
            <View id="desccription" render={defaultProps({ content: 'description' })(Text)} />
        </Editor>
    )
}
