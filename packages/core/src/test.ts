import { Node, ChildMap } from './Types'

describe('TS', () => {
    it('array reduce', () => {
        const arr = [ 1, 2, 3 ]
        console.log(arr.reduce((a, b) => '' + a + b, ''))
    })
})

describe('types', () => {
    it('ChildMap', () => {
        const a: Node = {
            id: 'bbb',
        }

        const c: ChildMap = {
            a: a,
            b: {
                id: 'ccc',
            },
            1: a,
        }
    })

    it('Node', () => {
        const a: Node = {
            id: 'bbb',
        }

        const b: Node = {
            d: '111',
        }

        const c: Node = {
            id: 'bbb',
            type: undefined,
            props: undefined,
            children: { oo: 123 },
        }
    })
})
