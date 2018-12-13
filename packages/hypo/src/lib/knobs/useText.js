import { setKnob, removeKnob } from 'retoggle'
import { useEffect } from 'react'

export default function useText(name, key, props) {
    function handleKnob() {
        if (props.focused) {
            setKnob({
                name,
                type: 'text',
                value: props[key],
                onChange: (value) => {
                    props.requestUpdateProps({ [key]: value })
                },
            })
        } else {
            removeKnob(name)
        }
    }

    useEffect(
        () => {
            handleKnob()

            return handleKnob
        },
        [ props.focused ]
    )

    return [
        props[key],
        (value) => {
            props.requestUpdateProps({ [key]: value })
        },
    ]
}
