import React, { Component } from 'react'
import { View } from '@visionjs/core'
import Text from '../renderers/Text'
import Editor from '../common/Editor'
import { defaultProps } from 'recompose'

const Defaulted = defaultProps({ content: 'default 12345678' })(Text)

export default () => (
    <Editor>
        <div>
            text1:
            <View id="text1" propsListener={(props) => console.log(props)} defaultRenderer={Text} />
            <div>
                <div>
                    text2 (default):
                    <View id="text2" defaultRenderer={Defaulted} />
                </div>
            </div>
        </div>
    </Editor>
)
