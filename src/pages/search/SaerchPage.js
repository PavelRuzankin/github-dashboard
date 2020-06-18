import { $ } from "@core/dom"
import { createStore } from '@core/createStore';
import { rootReducer } from '@/store/rootReducer';
import { SearchLine } from '@/components/searchLine/SearchLine';
import { SearchList } from '@/components/resultList/ResultList';
import { Pagination } from '@/components/pagination/Pagination';
import { Page } from "@core/Page";
import { Search } from "@/components/search/Search";

export class SearchPage extends Page{
    getRoot(){
        const initialState = {
            searchValue: "",
            currentPage: 1,
            reposCount: 0,
            repos: [],
            paginationRangeLength: 6
        }

        const store = createStore(rootReducer, initialState)

        this.search = new Search( {components: [SearchLine, SearchList, Pagination], store, switch: this.switch})


        return this.search.getRoot()
    }

    afterRender(){
        this.search.init()
    }

    destroy(){
        this.search.destroy()
    }
}