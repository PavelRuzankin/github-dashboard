function createList(list){
    const el = document.createElement("ul")
    el.innerHTML = list.map(el => `<li>${el}</li>`)
    return el.outerHTML
}

export function getTemplate(data){
    console.log(data.lastCommit.split("T"));
    
    return `
        <header class="card__header">
            <div class="card__name"><a href="${data.reposUrl}" target="_blank">${data.reposName}</a></div>
            <div class="card__stars">
            <span>${data.starCount}</span>
            <span class="material-icons">grade</span>
            </div>
        </header>
        <article class="card__article">
            <div class="card__image ibg">
            <img src=${data.img}/>
            </div>
            <div class="card__info">
                <div class="card__name"><a href="${data.reposOwnerUrl}" target="_blank">${data.reposOwner}</a></div>
                <p class="card__description">${data.description}</p>
                <div class="card__add-des">
                    <div class="card__languages ul-tabs">
                        <h3>Используемые языки:</h3>
                            ${createList(data.languages)}
                    </div>
                    <div class="card__contributors ul-tabs">
                        <h3>10 наиболее активных контрибьютеров:</h3>
                        ${createList(data.contributors)}
                    </div>
                </div>
            </div>
        </article>
        <h3>Последний коммит: ${data.lastCommit}</h3>
    `
}