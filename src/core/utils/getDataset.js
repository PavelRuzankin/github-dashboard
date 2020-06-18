export function getDataset(event, selector, dataset){
    return event.target.dataset[dataset] || event.target.closest(`.${selector}`).dataset[dataset]
}
