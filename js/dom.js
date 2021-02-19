const dom = {
    body: document.getElementsByTagName('body'),
    searchContainer: document.querySelector('.search-container'),
    gallery: document.querySelector('#gallery'),

    createElement(el, classname, idname, src) {
        const element = document.createElement(el);
        element.className = classname;
        if(idname) {
            element.id = idname;
        }
        if(src) {
            element.src = src;
        }
        return element;
    },

    getElement(el) {
        const element = document.querySelector(el);
        return element;
    }


}






