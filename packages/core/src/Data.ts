import { produce, applyPatches, PatchListener } from 'immer'
import { ChildMap, SetterType } from './Types'

export default class Data {
    value: ChildMap
    patchListener: PatchListener = (patches: any, inversePatches: any) => {
        this.patchesStack.slice(this.patchesStack.length - this.hadInversedPatchesStack.length)
        this.hadInversedPatchesStack = []
        this.patchesStack.unshift(patches)
        this.inversePatchesStack.unshift(inversePatches)
    }
    patchesStack: any[] = []
    inversePatchesStack: any[] = []
    hadInversedPatchesStack: any[] = []

    constructor(data: ChildMap = {}) {
        this.value = data
    }

    produce(id: string, setter: SetterType) {
        this.value = produce(
            this.value,
            (data) => {
                data[id] = setter(data[id] || { id })
            },
            this.patchListener
        )

        return this
    }

    convert(value: any) {
        this.value = produce(this.value, () => value, this.patchListener)

        return this
    }

    undo() {
        const patches = this.inversePatchesStack.shift()
        this.hadInversedPatchesStack.unshift(patches)
        this.value = applyPatches(this.value, patches)

        return this
    }

    get undoable() {
        return this.inversePatchesStack.length > 0
    }

    redo() {
        const patches = this.patchesStack[this.hadInversedPatchesStack.length - 1]
        this.inversePatchesStack.unshift(this.hadInversedPatchesStack.shift())
        this.value = applyPatches(this.value, patches)

        return this
    }

    get redoable() {
        return this.hadInversedPatchesStack.length > 0
    }
}
