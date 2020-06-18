import { SET_REPOS, SET_VALUE, SET_CURRENT_PAGE, SET_PAGINATION_RANGE, INIT } from "./types"

const handlers = {
    [INIT]: (state) => {
        const paginationRange = []
        for (let index = 0; index < state.paginationRangeLength; index++) {
            paginationRange.push(index+1)
        }
        return {...state, paginationRange}
    },
    [SET_REPOS]: (state, action) => {
        return {...state, repos: action.payload.items, reposCount: action.payload.total_count}
    },
    [SET_VALUE]: (state, action) => ({...state, searchValue: action.payload}),
    [SET_CURRENT_PAGE]: (state, action) => ({...state, prevPage: state.currentPage, currentPage: action.payload}),
    [SET_PAGINATION_RANGE]: (state, action) => ({...state, paginationRange: action.payload}),
    DEFAULT: state => state
}

export function rootReducer(state, action){
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}