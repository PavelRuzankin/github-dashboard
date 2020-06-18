import { DomListener } from "@core/DomListener";

export class SearchComponent extends DomListener{
    constructor($root, options = {}){
        super($root, options.listeners)
        this.name = options.name || "component"
        this.emitter = options.emitter
        this.store = options.store
        this.unsubs = []
    }

    $dispatch(type, payload){
        this.store.dispatch({type, payload})
    }

    $subscribe(event, fn){
        this.unsubs.push(this.store.subscribe(event, fn))
    }

    $getState(){
        return this.store.getState()
    }

    init(){
        this.addDomListener()
    }

    destroy(){
        this.removeDomListener()
        this.unsubs.forEach(unsub => unsub())
    }

    toHTML(){
        return ""
    }
}