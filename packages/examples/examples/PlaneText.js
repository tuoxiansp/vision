import React, { Component } from 'react'
import { View } from '@visionjs/core'
import Text from '../renderers/Text'
import Editor from '../common/Editor'

// const Defaulted = defaultProps({ content: 'default 12345678' })(Text)

export default () => (
    <Editor>
        <div>
            text1:
            <View id="text1" render={Text} />
            <div>
                <div>
                    text2 (default):
                    <View id="text2" render={Text} />
                </div>
            </div>
        </div>
    </Editor>
)
