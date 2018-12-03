import React, { Component } from 'react'
import { View } from '@visionjs/core'
import Text from '../renderers/Text'
import Editor from '../common/Editor'
import { defaultProps } from 'recompose'

export default () => (
    <Editor>
        <div>
            text1:
            <View id="text1" defaultRenderer={Text} />
            <div>
                <div>
                    text2:
                    <View id="text2" defaultRenderer={defaultProps({ content: 'default' })(Text)} />
                </div>
            </div>
        </div>
    </Editor>
)
