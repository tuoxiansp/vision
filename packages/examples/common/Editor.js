import React, { Component } from 'react'
import { Editor, Data } from 'core'

export default class ExampleEditor extends Component {
    state = {
        data: new Data(),
        readonly: false,
        showData: true,
    }

    render() {
        return (
            <Editor
                data={this.state.data}
                onChange={(data) => {
                    this.setState({ data })
                }}
                readonly={this.state.readonly}
            >
                <div
                    style={{
                        padding: 20,
                    }}
                >
                    <div>
                        <button
                            disabled={!this.state.data.undoable}
                            onClick={() => {
                                const data = this.state.data.undo()
                                this.setState({ data })
                            }}
                        >
                            undo
                        </button>
                        <button
                            disabled={!this.state.data.redoable}
                            onClick={() => {
                                const data = this.state.data.redo()
                                this.setState({ data })
                            }}
                        >
                            redo
                        </button>
                        <button
                            onClick={() => {
                                this.setState({ readonly: !this.state.readonly })
                            }}
                        >
                            {this.state.readonly ? '!readonly' : 'readonly'}
                        </button>
                        <button
                            onClick={() => {
                                this.setState({ showData: !this.state.showData })
                            }}
                        >{`${this.state.showData ? 'hide' : 'show'} data`}</button>
                    </div>
                    {this.state.showData ? <div>{JSON.stringify(this.state.data.value)}</div> : null}
                </div>
                {this.props.children}
            </Editor>
        )
    }
}
