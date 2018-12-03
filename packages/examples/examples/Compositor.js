import React, { Component } from 'react'
import { View, Registry } from '@visionjs/core'
import Text from '../renderers/Text'
import Editor from '../common/Editor'
import initCompositor from '../compositors/Compositor'

const r = new Registry()
r.register('text', Text)
r.register('label', () => <div>123456789</div>)

const Compositor = initCompositor([ [ 'Text', 'text' ], [ 'Label', 'label' ] ])

export default () => (
    <Editor rendererMap={r.map} Compositor={Compositor}>
        <div>
            text1:
            <View id="text1" propsListener={(props) => console.log(props)} defaultRenderer={Text} />
            <div>
                <div>
                    text2:
                    <View id="text2" defaultRenderer={Text} />
                </div>
            </div>
        </div>
    </Editor>
)
