const randomUrl = 'https://randomuser.me/api/?results=12';

dom.searchContainer.appendChild(dom.createForm('GET'));

dom.getElement('form').appendChild(dom.createInput('search', 'search-input', 'search-input', 'Search...'))

dom.getElement('form').appendChild(dom.createInput('submit', 'search-submit', 'search-submit'))

dom.getElement('#search-submit').value = 'Search';

dom.gallery.after(dom.createElement('div', '"modal-container'));

// dom.gallery.appendChild(dom.createElement('div', 'card'));

// dom.getElement('.card').appendChild(dom.createElement('div', 'card-img-container'));





// createElement(el, classname, text)
// createInput(type, id, classname, obj, value)
// createImg(classname, src, alt)

// body: document.getElementsByTagName('body'),
// searchContainer: document.querySelector('.search-container'),
// gallery: document.querySelector('#gallery'),

//dom.getElement('.card-img-container').appendChild(dom.createImg('card-img', data.results[2].picture.medium, 'gf' ))




function fetchData(url){
   return fetch(url)
        .then(resp => resp.json())
}


fetchData(randomUrl)
    .then(data => {
        addImgToCard(data)
    } )


function addImgToCard(data) {
    const cardImg = data.results.map(user => {


        let image = (dom.createImg('card-img', user.picture.large, `${user.picture.large}` ))
        let imgContainer = dom.createElement('div', 'card-img-container');
        let card = dom.createElement('div', 'card');

        imgContainer.appendChild(image);
        card.appendChild(imgContainer);
        dom.gallery.appendChild(card);


        let cardInfoContainer = dom.createElement('div', 'card-info-container');
        let firstLastNames = dom.createElement('h3', 'card-name', `${user.name.first} ${user.name.last}`);
        let email = dom.createElement('p', 'card-text', `${user.email}`);
        let city = dom.createElement('p', 'card-text', `${user.location.city}`);
        cardInfoContainer.appendChild(firstLastNames);
        cardInfoContainer.appendChild(email);
        cardInfoContainer.appendChild(city);


        imgContainer.after(cardInfoContainer);
        
    })
}

function modal(data) {
    
}

