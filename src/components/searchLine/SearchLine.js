import { SearchComponent } from "@core/SearchComponent";
import { request } from "@core/utils/request";
import { SET_REPOS, SET_VALUE, SET_CURRENT_PAGE } from "@/store/types";
import { scroll } from "@core/utils/scrollToStart";

export class SearchLine extends SearchComponent{
    static className = ["search-line", "container"]
    static tagName = "section"
    static CLIENT_ID = "34ac496b3663e4df3adf"
    static SECRET_ID = "bc8b4b1f8f09c160d74a284343de70f3f6731e8f"
    constructor($root, options){
        super($root, {
            name: "SearchLine",
            listeners: ["input", "click"],
            ...options
        })
    }

    url(value, page){
        return `https://api.github.com/search/repositories?q=${value}&per_page=10&page=${page}&sort=stars&order=desc&client_id=${SearchLine.CLIENT_ID}&client_secret=${SearchLine.SECRET_ID}`
    }

    async getReposFromServer(value, page){
        scroll()
        try{
            this.$root.loading("loader", true)
            const response = await request(this.url(value, page))
            this.$dispatch(SET_REPOS, response)
            this.$root.loading("loader", false)
        }catch(err){
            console.log(err);
            this.$root.loading("loader", false)
        }
    }

    onInput(event){
        const value = event.target.value.trim()
        this.$dispatch(SET_VALUE, value)
    }

    onClick(){

    }

    init(){
        super.init()
        this.$subscribe(SET_CURRENT_PAGE, () => {
            const {searchValue: value, currentPage: page} = this.$getState()
            this.getReposFromServer(value, page)
        })
    }

    toHTML(){
        return `
                <form class="search-line__form">
                    <input placeholder="Что искать?" type="text" class="search-line__input">
                    <button class="search-line__btn">
                        <i class="material-icons">search</i>
                    </button>
                </form>
        `
    }
}