import React, { Component, Fragment } from 'react'
import { findDOMNode, createPortal } from 'react-dom'

const isInBrowser = !!document

export default class Modifier extends Component {
    calc = () => {
        const dom = this.dom
        if (dom) {
            const rect = dom.getBoundingClientRect()
            this.x = window.scrollX + rect.left
            this.y = window.scrollY + rect.top
            this.w = rect.width
            this.h = rect.height
        }
    }

    handleMouseEnter = (event) => {
        if (this.props.onMouseEnter instanceof Function) {
            this.props.onMouseEnter(event)
        }
    }

    handleMouseLeave = (event) => {
        if (this.props.onMouseLeave instanceof Function) {
            this.props.onMouseLeave(event)
        }
    }

    handleDblClick = (event) => {
        if (this.props.onMouseDown instanceof Function) {
            this.props.onMouseDown(event)
        }
    }

    componentDidMount = () => {
        this.dom = findDOMNode(this)
        this.forceUpdate()
        if (this.dom) {
            this.dom.addEventListener('mouseenter', this.handleMouseEnter)
            this.dom.addEventListener('mouseleave', this.handleMouseLeave)
            this.dom.addEventListener('dblclick', this.handleDblClick)
        }
    }

    componentWillUnmount = () => {
        if (this.dom) {
            this.dom.removeEventListener('mouseenter', this.handleMouseEnter)
            this.dom.removeEventListener('mouseleave', this.handleMouseLeave)
            this.dom.removeEventListener('dblclick', this.handleDblClick)
        }
    }

    componentDidUpdate = () => {
        const dom = findDOMNode(this)
        if (dom !== this.dom) {
            if (this.dom) {
                this.dom.removeEventListener('mouseenter', this.handleMouseEnter)
                this.dom.removeEventListener('mouseleave', this.handleMouseLeave)
                this.dom.removeEventListener('dblclick', this.handleDblClick)
            }
            this.dom = dom
            this.forceUpdate()
            if (this.dom) {
                this.dom.addEventListener('mouseenter', this.handleMouseEnter)
                this.dom.addEventListener('mouseleave', this.handleMouseLeave)
                this.dom.addEventListener('dblclick', this.handleDblClick)
            }
        }
    }

    render() {
        const { children, surface } = this.props
        if (!isInBrowser) return surface

        this.calc()

        return (
            <Fragment>
                {surface}
                {children(this.x, this.y, this.w, this.h)}
            </Fragment>
        )
    }
}
