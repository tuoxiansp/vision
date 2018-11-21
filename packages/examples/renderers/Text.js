import React, { Component } from 'react'
import { Editor, View } from 'core'

export default class Text extends Component {
    constructor(...args) {
        super(...args)

        this.ref = React.createRef()

        this.handler = (event) => {
            this.props.requestUpdateProps(
                {
                    content: event.target.textContent,
                },
                true
            )
        }
    }

    componentDidMount() {
        this.ref.current.addEventListener('webkitEditableContentChanged', this.handler)
    }

    componentWillUnmount() {
        this.ref.current.removeEventListener('webkitEditableContentChanged', this.handler)
    }

    render() {
        const { requestUpdateProps, content = 'input...', readonly, ...rest } = this.props
        // console.log('render text: ', content)

        let style = rest.style || {}

        style.whiteSpace = 'pre-wrap'

        return (
            <span
                suppressContentEditableWarning
                ref={this.ref}
                contentEditable={readonly ? false : 'plaintext-only'}
                {...rest}
                style={style}
            >
                {content}
            </span>
        )
    }
}
