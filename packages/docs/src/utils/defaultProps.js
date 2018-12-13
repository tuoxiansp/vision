const defaultProps = (params) => (renderer) => ({ readonly, requestUpdateProps, props }) =>
    renderer({ readonly, requestUpdateProps, props: { ...params, ...props } })

export default defaultProps
