export function scroll(){
    const coordinate = 0
    let scrolled = window.pageYOffset

    const scrollToTop = () => {
        if(scrolled > coordinate){
            window.scrollTo(0, scrolled)
            scrolled = scrolled - 30
            setTimeout(scrollToTop, 9);
        }else{
            window.scrollTo(0, coordinate)
        }
    }

    scrollToTop()
}