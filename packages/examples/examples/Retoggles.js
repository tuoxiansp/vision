import React, { Component } from 'react'
import { View, Registry } from '@visionjs/core'
import Text from '../renderers/Text'
import Editor from '../common/Editor'
import initCompositor from '../compositors/Compositor'
import { setKnob, removeKnob } from 'retoggle'

class Label extends Component {
    componentDidUpdate(prevProps) {
        if (prevProps.focused !== this.props.focused) {
            if (this.props.focused) {
                setKnob({
                    name: 'Label',
                    type: 'text',
                    value: this.props.label,
                    onChange: (value: boolean) => {
                        this.props.requestUpdateProps({
                            label: value,
                        })
                    },
                })
            } else {
                removeKnob('Label')
            }
        }
    }

    render() {
        return <div>{this.props.label || 'default'}</div>
    }
}

const r = new Registry()
r.register('text', Text)
r.register('label', Label)

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
