
class Dom {
    constructor(selector){
        this.$el = typeof selector === "string" ? document.querySelector(selector) : selector
    }

    html(node){
        this.$el.innerHTML = node instanceof Dom ? node.$el : node
        return this
    }
    clear(){
        this.html("")
        return this
    }

    text(text){
        this.$el.textContent = text
    }
    getLoader(classes){
        if(this.find("."+classes)) return

        const $loader = $.create(classes)
        for(let i = 0; i < 4; i++){
            $loader.append(document.createElement("div"))
        }
        return $loader
    }

    loading(classes, toggle){
        if(toggle, !this.find("."+classes)){
            this.append(this.getLoader(classes))
        }else{
            this.remove(classes)
        }
    }

    ibg(selector = ".ibg"){
        const block = this.find(selector)
        const image = block.querySelector("img")
        block.style.backgroundImage  = `url("${image.getAttribute("src")}")`
        block.innerHTML = ""
     }

    append(node){
        if(node instanceof Dom){
            this.$el.append(node.$el)
        }else{
            this.$el.append(node)
        }
    }

    remove(selector){
        this.$el.querySelector("." + selector).remove()
    }

    addClass(classes){
        this.$el.classList.add(classes)
    }

    removeClass(classes){
        this.$el.classList.remove(classes)
    }

    on(event, callback){
        this.$el.addEventListener(event, callback)
    }

    off(){
        this.$el.removeEventListener(event, callback)
    }
    find(selector){
        return this.$el.querySelector(selector)
    }
}

export function $(selector){
    return new Dom(selector)
}

$.create = ( classes = "", tagName = "div") => {
    const $el = $(document.createElement(tagName))
    if(Array.isArray(classes)) {
        classes.forEach(cls => $el.addClass(cls))
    }else{
        if(classes){
            $el.addClass(classes)
        }
    }
    return $el
}

$.createHTML = ( classes = "", tagName = "div") => {
    const $el = document.createElement(tagName)
    if(Array.isArray(classes)) {
        classes.forEach(cls => $el.classList.add(cls))
    }else{
        if(classes){
            $el.classList.add(classes)
        }
    }
    return $el
}