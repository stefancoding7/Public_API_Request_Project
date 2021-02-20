const randomUrl = 'https://randomuser.me/api/?results=12';

dom.searchContainer.appendChild(dom.createForm('GET'));

dom.getElement('form').appendChild(dom.createInput('search', 'search-input', 'search-input', 'Search...'))

dom.getElement('form').appendChild(dom.createInput('submit', 'search-submit', 'search-submit'))

dom.getElement('#search-submit').value = 'Search';



// dom.gallery.appendChild(dom.createElement('div', 'card'));

// dom.getElement('.card').appendChild(dom.createElement('div', 'card-img-container'));





// createElement(el, classname, text)
// createInput(type, id, classname, obj, value)
// createImg(classname, src, alt)

// body: document.getElementsByTagName('body'),
// searchContainer: document.querySelector('.search-container'),
// gallery: document.querySelector('#gallery'),

//dom.getElement('.card-img-container').appendChild(dom.createImg('card-img', data.results[2].picture.medium, 'gf' ))




async function fetchData(url){
   return await fetch(url)
        .then(resp => resp.json())
        .catch(error => console.log('Some problem. Cant resole the request', error))
}


fetchData(randomUrl)
    .then(data => {
        addImgToCard(data)
    } )
    
    


function addImgToCard(data) {
    const cardImg = data.results.map(user => {


        const image = (dom.createImg('card-img', user.picture.large, `${user.picture.large}` ))
        const imgContainer = dom.createElement('div', 'card-img-container');
        const card = dom.createElement('div', 'card');

        imgContainer.appendChild(image);
        card.appendChild(imgContainer);
        dom.gallery.appendChild(card);


        const cardInfoContainer = dom.createElement('div', 'card-info-container');
        const name = dom.createElement('h3', 'card-name', `${user.name.first} ${user.name.last}`);
        name.id = 'name';
        const email = dom.createElement('p', 'card-text', `${user.email}`);
        const city = dom.createElement('p', 'card-text', `${user.location.city}`);
        cardInfoContainer.appendChild(name);
        cardInfoContainer.appendChild(email);
        cardInfoContainer.appendChild(city);


        imgContainer.after(cardInfoContainer);
        

        card.addEventListener('click', (e) => {
            
            modal(user);
            
        })
    })
}



function modal(user) {
    
    dom.gallery.after(dom.createElement('div', 'modal-container'));
    
    dom.getElement('.modal-container').appendChild(dom.createElement('div', 'modal'))
   
    dom.getElement('.modal').appendChild(dom.createElement('button', 'modal-close-btn'));
    let button = dom.getElement('.modal-close-btn');
    button.appendChild(dom.createElement('strong', '', 'X'));
    button.id = 'modal-close-btn';
    button.addEventListener('click', () => {
        removeModal()
    });

    button.after(dom.createElement('div', 'modal-info-container'));
    const modalInfoContainer = dom.getElement('.modal-info-container');
    const image = dom.createImg('modal-img', user.picture.large, `${user.picture.large}`)
    const name = dom.createElement('h3', 'modal-name cap', `${user.name.first} ${user.name.last}`)
    name.id = 'name';
    const email = dom.createElement('p', 'modal-text', `${user.email}`);
    const city = dom.createElement('p', 'card-text', `${user.location.city}`);
    
    const hr = document.createElement('hr');
    
    const phone = dom.createElement('p', 'modal-text', `${formatingPhone(user.phone)}`);
    const location = dom.createElement('p', 'card-text', `${user.location.street.number} ${user.location.street.name} ${user.location.city}`);
    const birthday = dom.createElement('p', 'card-text', `${formatingBirthday(user.dob.date)}`);
    modalInfoContainer.appendChild(image);
    modalInfoContainer.appendChild(name);
    modalInfoContainer.appendChild(email);
    modalInfoContainer.appendChild(city);
    modalInfoContainer.appendChild(hr);
    modalInfoContainer.appendChild(phone);
    modalInfoContainer.appendChild(location);
    modalInfoContainer.appendChild(birthday);
}

function removeModal() {
    dom.getElement('.modal-container').remove();
}

function formatingPhone(number) {
    
    let phone = number.toString().replace(/[^\d]/g,'');
    phone = phone.replace(/^([0-9]{3})([0-9]{3})([0-9]{1,})$/,'($1) $2-$3');
    console.log(phone);
    return phone
}

function formatingBirthday(string) {
    let st;

    if(string.length > 10) {
        st = string.substring(0,10);
    }
    st = st.split("").reverse().join("")
    st = st.replace(/[^\d]/g, '/');

    
    return st;
}
