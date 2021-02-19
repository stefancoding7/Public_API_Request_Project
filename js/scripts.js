const randomUrl = 'https://randomuser.me/api/?results=12';

// createElement(el, classname, idname, src)

// body: document.getElementsByTagName('body'),
// searchContainer: document.querySelector('.search-container'),
// gallery: document.querySelector('#gallery'),




function fetchData(url){
   return fetch(url)
        .then(resp => resp.json())
}


