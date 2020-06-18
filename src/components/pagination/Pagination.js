import { SearchComponent } from "@core/SearchComponent";
import { SET_REPOS, SET_CURRENT_PAGE, SET_PAGINATION_RANGE, SET_VALUE } from "../../store/types";
import { $ } from "@core/dom";
import {getDataset} from "@core/utils/getDataset"

export class Pagination extends SearchComponent{
    static className = "pagination"
    static tagName = "section"

    constructor($root, options){
        super($root, {
            name: "Pagination",
            listeners: ["click"],
            ...options
        })
        this.paginationCount = 0
    }

    onClick(event){
        const page = event.target.dataset.page
        if(page){
            this.currentBtnIndex = +event.target.dataset.index
            this.$dispatch(SET_CURRENT_PAGE, +page)
        }
        if(getDataset(event, "pagination__array", "direction")){
            const direction = getDataset(event, "pagination__array", "direction")
            if(direction === "left"){
                debugger
                this.getPaginationRange(1, () => {
                    const paginationRange = []
                    for (let index = 0; index < this.$getState().paginationRangeLength; index++) {
                        paginationRange.push(index+1)
                    }
                    return paginationRange
                })
            }else{
                console.log(direction);
                
                this.getPaginationRange(100, () => {
                    const paginationRange = []
                    for(let index = 6; index >= 0; index--){
                        paginationRange.push(this.paginationCount - index)
                    }
                    return paginationRange
                })
            }
        }
    }

    getPaginationRange(currentPage, callback){
        this.$dispatch(SET_CURRENT_PAGE, currentPage)

        const paginationRange = callback()

        this.$dispatch(SET_PAGINATION_RANGE, paginationRange)
    }
    canMakeStep(){
        return this.$getState().currentPage !== 1 && this.$getState().currentPage !== 100
    }

    makeStep(paginationRange, item){
        if(this.canMakeStep()) paginationRange = paginationRange.map(elem => elem + item)
        this.$dispatch(SET_PAGINATION_RANGE, paginationRange)
    }

    setPaginationCount(reposCount){
        const count = parseInt(reposCount / 10) + 1
        this.paginationCount = count > 100 ? 100 : count
    }

    setPaginationRange(paginationRange){
        if(this.currentBtnIndex === paginationRange.length - 1){
            this.makeStep(paginationRange, 1)
        }else if(this.currentBtnIndex === 0){
            this.makeStep(paginationRange, -1)
        }
    }

    renderList(){
        const paginationWrapper = this.$root.find(".pagination__wrapper")
        if(!this.paginationCount || this.paginationCount === 1) {
            paginationWrapper.innerHTML = ""
            return
        }

        const paginationList = $.createHTML("pagination__list", "ul")
        const {currentPage} = this.$getState()

        this.$getState().paginationRange.forEach((elem, index) => {

            const classes = ["pagination__btn"]
            if(currentPage === elem) classes.push("pagination__btn_active")

            const paginationBtn = $.createHTML(classes, "li")

            paginationBtn.textContent = elem
            paginationBtn.dataset.page = elem
            paginationBtn.dataset.index = index
            paginationList.append(paginationBtn)
        })

        paginationWrapper.innerHTML = paginationList.outerHTML

        if(this.paginationCount > 10){
            let arrayLeft = $.createHTML("pagination__array", "div")
            arrayLeft.dataset.direction = "left"
            let arrayItem = $.createHTML("material-icons", "span")
            arrayItem.textContent = "keyboard_arrow_left"

            arrayLeft.innerHTML = arrayItem.outerHTML

            paginationWrapper.insertAdjacentHTML("afterbegin", arrayLeft.outerHTML)

            arrayLeft = $.createHTML("pagination__array", "div")
            arrayLeft.dataset.direction = "right"
            arrayItem = $.createHTML("material-icons", "span")
            arrayItem.textContent = "keyboard_arrow_right"
            arrayLeft.innerHTML = arrayItem.outerHTML
            paginationWrapper.insertAdjacentHTML("beforeend", arrayLeft.outerHTML)

        }
     }

    init(){
        super.init()
        this.$subscribe(SET_REPOS, ()=> {
            const {reposCount, paginationRange} = this.$getState()

            this.setPaginationCount(reposCount)
            this.setPaginationRange(paginationRange)
            this.renderList()
        })
        this.$subscribe(SET_PAGINATION_RANGE, () => this.renderList())
        this.$subscribe(SET_VALUE, () => this.getPaginationRange(1, () => {
            const paginationRange = []
            for (let index = 0; index < this.$getState().paginationRangeLength; index++) {
                paginationRange.push(index+1)
            }
            return paginationRange
        }))
    }
    toHTML(){
        return `<div class="pagination__wrapper"></div>`
    }
}