import { setKnob, removeKnob } from 'retoggle'

export default function useBooleanKnob(name, initialValue = false) {
    const [ value, setValue ] = useState(initialValue)
    useEffect(
        () => {
            setKnob({
                name,
                type: 'boolean',
                value,
                onChange: (value: boolean) => {
                    setValue(value)
                },
            })
        },
        [ value ]
    )

    useEffect(() => {
        return () => removeKnob(name)
    }, [])
    return [ value, setValue ]
}
