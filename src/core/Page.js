export class Page{
    constructor(params, switchPage){
        this.switch = switchPage 
        this.params = params
    }

    getRoot(){
        throw new Error("Method 'getRoot' should be implemented") 
    }

    afterRender(){

    }

    destroy(){

    }
}