import { $ } from "@core/dom"

export class Search{
    static classes = "search-page"
    constructor(options){
        this.components = options.components || []
        this.store = options.store
        this.switch = options.switch
    }

    getRoot(){
        const $root = $.create(Search.classes)
        const options = {emitter: this.emitter, store: this.store, switch: this.switch}

        this.components = this.components.map(Component => {
            const $el = $.create(Component.className, Component.tagName)

            const component = new Component($el, options)
            $el.html(component.toHTML())

            $root.append($el)

            return component
        })


        return $root
    }

    init(){
        this.components.forEach(component => component.init())
    }

    destroy(){
        this.components.forEach(component => component.destroy)
    }
}