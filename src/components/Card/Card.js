import { $ } from "@core/dom"
import { CurrentRoute } from "@core/CurrentRoute";
import {cardLoader} from "../loading/cardLoading"
import { request } from "@core/utils/request";
import { getTemplate } from "./card.tempate";

export class Card {
    static className = ["card", "container"]

    async getLanguages(url){
        const response = await request(url)
        return Object.keys(response)
    }
    async getContributors(url){
        const response = await request(url)

        const contributors = []
        for (let index = 0; index < response.length; index++) {
            if(index === 10) break
            contributors.push(response[index].login)
        }

        return contributors
    }

    async getData(){
        const url = CurrentRoute.path.replace("card/", "")
        const response = await request(url)
        
        const data = {
            reposName: response.name,
            reposUrl: response.html_url,
            starCount: response.stargazers_count,
            img: response.owner.avatar_url,
            reposOwner: response.owner.login,
            reposOwnerUrl: response.owner.html_url,
            description: response.description,
            languages: response.languages_url,
            contributors: response.contributors_url,
            lastCommit: response.updated_at.split("T")[0]
        }

        data.languages = await this.getLanguages(data.languages)
        data.contributors = await this.getContributors(data.contributors)
        this.setData(data)
    }

    setData(data){
        this.$root.html(getTemplate(data))
        this.$root.ibg()
    }

    getRoot(){

        this.$root = $.create(Card.className, "section")
        this.getData()
        this.$root.html(cardLoader())

        return this.$root
    }
    init(){

    }

    destroy(){

    }
}