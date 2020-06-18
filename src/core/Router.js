import { $ } from "./dom"
import { CurrentRoute } from "./CurrentRoute"

export class Router{
    constructor(selector, routes){
        if(!selector) throw new Error(`${selector} is not provided in Router`)
        this.$placeholder = $(selector)
        this.routes = routes
        this.changePageHandler = this.changePageHandler.bind(this)
        this.init()
    }

    switchPage(url){
        location.hash = `card/${url}`
    }

    changePageHandler(){
        this.$placeholder.clear()
        if(this.page) this.page.destroy()
        const Page = CurrentRoute.path.includes("card") ? this.routes.card : this.routes.search

        this.switchPage = this.switchPage.bind(this)
        this.page = new Page(CurrentRoute.param, this.switchPage)
        this.$placeholder.append(this.page.getRoot())
        this.page.afterRender()
    }

    init(){
        window.addEventListener("hashchange", this.changePageHandler)
        this.changePageHandler()
    }

    destroy(){
        window.removeEventListener("hashchange", this.changePageHandler)
    }

}