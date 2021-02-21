const dom = {
    body: document.getElementsByTagName('body'),
    searchContainer: document.querySelector('.search-container'),
    gallery: document.querySelector('#gallery'),
   

    //get elemtn function. Pramapeter is element what I wanna return and retunr the selected element
    getElement(el) {
        const element = document.querySelector(el);
        return element;
    },

    //add search input before closing body tag
    addSearchInput() {
        
        let element = `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>`;

        return dom.searchContainer.insertAdjacentHTML('beforeend', element);
    }
}






