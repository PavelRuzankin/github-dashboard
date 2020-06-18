import { SearchComponent } from "@core/SearchComponent";
import { $ } from "@core/dom";
import { resultRep } from "@/components/resultRep/resultRep";
import { SET_REPOS } from "@/store/types";
import { getDataset } from "../../core/utils/getDataset";

export class SearchList extends SearchComponent{
    static className = ["result-list", "container"]
    constructor($root, options){
        super($root,{
            name: "ResultList",
            listeners: ["click"],
            ...options
        })
        this.switch = options.switch
    }

    onClick(event){
        if(getDataset(event, "result-list__card", "url")){ // TODO
            const url = getDataset(event, "result-list__card", "url")
            this.switch(url)
        }
    }

    renderCards(repos, value){
        this.$root.clear()
        if(!value) return 

        const {reposCount} = this.$getState()
        this.showReposCount(reposCount)

        const rep = resultRep()
        repos = repos.map(elem => {
            const el = $.createHTML(rep.className, rep.tagName)
            el.innerHTML = rep.toHTML(elem.name, elem.stargazers_count)
            el.dataset.url = elem.url

            this.$root.append(el)
        })
    }

    showReposCount(count){
        const text = count ? `Найденно ${count} репозиториев` : "Ни чего не найденно"
        const $el = $.create("result-list__total-count", "h2")
        $el.text(text)
        this.$root.append($el)
    }

    init(){
        super.init()
        this.$subscribe(SET_REPOS, () =>{
            const {repos, searchValue: value} = this.$getState()
            this.renderCards(repos, value)

        })
    }
    toHTML(){
        return  ``
    }
}