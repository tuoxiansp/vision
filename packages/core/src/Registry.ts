import { Renderer } from './Types'

export default class Registry {
    map: object = {}

    register(id: string, renderer: Renderer) {
        this.map[id] = renderer

        return id
    }
}
