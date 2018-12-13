import React, { Component } from 'react'

class View extends Component {
    shouldComponentUpdate() {
        return false
    }

    render() {
        console.log('render', 2222)
        return this.props.children
    }
}

const Context = React.createContext(1)

export default class Comp extends Component {
    static contextType = Context

    constructor(...args) {
        super(...args)

        setInterval(() => {
            this.setState({ aaa: Math.random() })
        }, 1000)
    }

    // shouldComponentUpdate() {
    //     return false
    // }

    render() {
        console.log('render', 1111)
        const { Provider } = Context

        return (
            <Provider>
                <View>view</View>
            </Provider>
        )
    }
}
