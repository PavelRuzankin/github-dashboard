export const resultRep = () => {
    const className = "result-list__card"
    const tagName = "article"
    return {
        className,
        tagName,
        toHTML(name, stars){
            return `
                <div class="result-list__name">${name}</div>
                <div class="result-list__stars">
                    <div>${stars}</div>
                    <span class="material-icons">grade</span>
                </div>
            `
        }
    }
}