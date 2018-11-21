import React, { Component } from 'react'
import { View } from 'core'
import Text from '../renderers/Text'
import Editor from '../common/Editor'
import { defaultProps } from 'recompose'

const Upper = () => (
    <div>
        upper:
        <div>
            <View key="upper-text-4" id="upper-text-4" defaultRenderer={Text} />
        </div>
    </div>
)

const Under = () => (
    <div>
        under:
        <div>
            <View key="under-text-3" id="under-text-3" defaultRenderer={Text} />
        </div>
    </div>
)

const Inside = () => (
    <div>
        text1:
        <View key="text1" id="text1" defaultRenderer={Text} />
        <div>
            <div>
                text2:
                <View key="text2" id="text2" defaultRenderer={defaultProps({ content: 'default' })(Text)} />
            </div>
        </div>
        <Upper />
        <Under />
        {/* <View key="upper" id="upper" defaultRenderer={Upper} />
            <View key="under" id="under" defaultRenderer={Under} /> */}
    </div>
)

export default () => (
    <Editor>
        <Inside />
    </Editor>
)
