const dom = {
    body: document.getElementsByTagName('body'),
    searchContainer: document.querySelector('.search-container'),
    gallery: document.querySelector('#gallery'),
    


    createElement(el, classname, text) {
        const element = document.createElement(el);
        element.className = classname;
        if(text) {
            element.textContent = text;
        }
        
        return element;
    },

    getElement(el) {
        const element = document.querySelector(el);
        return element;
    },

    createForm(method) {
        const element = document.createElement('form');
        element.action = '#';
        element.method = method;

        return element;
    },

    createInput(type, id, classname, placeholder) {
        const element = document.createElement('input');
        element.type = type;
        element.id = id;
        element.className = classname;
        if(placeholder) {
            element.placeholder = placeholder;
        }
        
        return element;
    },

    createImg(classname, src, alt){
        const element = document.createElement('img');
        element.className = classname;
        element.src = `${src}`;
        element.alt = alt;
        return element;
    },

    createButton(type, id, classname, textcontent){
        const element = document.createElement('button');
        element.type = type;
        element.id = id,
        element.className = classname;
        element.textContent = textcontent;

        return element;
    },

    addSearchInput() {
        

        let element = `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>`;

        dom.searchContainer.insertAdjacentHTML('beforeend', element);
    },

    
    

}






