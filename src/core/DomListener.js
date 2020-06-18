import { getEventMethod } from "@core/utils/getEventMethod";
export class DomListener{
    constructor($root, listeners = []){
        if(!$root) throw new Error("$root is absent for DomListener")
        this.$root = $root
        this.listeners = listeners
    }

    addDomListener(){
        this.listeners.forEach(listener => {
            const method = getEventMethod(listener)
            if(!this[method]) throw new Error(`Method ${method} is not implemented in ${this.name}`)

            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }
    removeDomListener(){
        this.listeners.forEach(listener => {
            const method = getEventMethod(listener)
            this.$root.off(listener, this[method])
        })
    }
}