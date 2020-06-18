import { INIT } from "@/store/types"

export function createStore(rootReducer, initialState = {}){
    let state = rootReducer(initialState, {type: INIT})
    let listeners = {}

    return {
        dispatch(action){
            state = rootReducer(state, action)

            if(Array.isArray(listeners[event])) return false

            listeners[action.type].forEach(l => l())
        },

        subscribe(event, fn){
            listeners[event] = listeners[event] || []
            listeners[event].push(fn)

            return () => listeners[event] = listeners[event].filter(l !== fn)
        },

        getState(){
            return {...state}
        },
    }
}