export class CurrentRoute {
    static get path(){
        return window.location.hash.slice(1)
    }
    static get param(){
        return CurrentRoute.path.split("/")
    }
}