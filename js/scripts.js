const randomUrl = 'https://randomuser.me/api/?results=12';

dom.addSearchInput();
const searchInput = document.querySelector('#search-input');


let userDatas = [];

async function fetchData(url){
   return await fetch(url)
        .then(resp => resp.json())
        .then(data => data.results)
        .catch(error => console.log('Some problem. Cant resole the request', error))
}



    
    function showUsers(user){
    
        let element;
        
        for(let i = 0; user.length > i; i++){
            element = `<div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${user[i].picture.large}" alt="${user[i].picture.large}">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user[i].name.first} ${user[i].name.last}</h3>
                <p class="card-text">${user[i].email}</p>
                <p class="card-text cap">${user[i].location.city}, ${user[i].location.state}</p>
                </div>
            </div>`;
            dom.gallery.insertAdjacentHTML('beforeend', element);

            let card = document.querySelectorAll('.card');
            card[i].addEventListener('click', () => {
                modal(user[i])
            })
       
        }  

        

  
    }    



function modal(user) {
    
    let element;

    element = `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${user.picture.large}" alt="${user.picture.large}">
                <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.location.city}</p>
                <hr>
                <p class="modal-text">${formatingPhone(user.phone)}</p>
                <p class="modal-text">${user.location.street.number}, ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.postcode}</p>
                <p class="modal-text">Birthday: ${formatingBirthday(user.dob.date)}</p>
            </div>
        </div>

    
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
    </div>`;

  

  dom.body[0].insertAdjacentHTML('beforeend', element);

  dom.getElement('#modal-close-btn').addEventListener('click', removeModal);  
}


function searchUsers(){

    searchInput.addEventListener('keyup', (e) => {
    let user = e.target.value;
    user.toLowerCase();
    let findedUser = [];
    userDatas.map(datas => {
        let firstName = datas.name.first.toLowerCase();
        let lastName = datas.name.last.toLowerCase();
        if(firstName.includes(user) || lastName.includes(user)) {
            const card = document.querySelectorAll('.card');
            card.style.display = 'none';
            findedUser.push(datas)
        }
        if(user === '') {
            findedUser = []
        }
        showUsers(findedUser);   
    })
       
    console.log(findedUser)  
        
   
    })

    // searchInput.addEventListener('keydown', (e) => {
    //     if(e.target.value == '') {
    //         findedUser = []
    //     }
           
    //   });
   
     
}


//Helper functions --------------------------------------------------------------

function removeModal() {
    dom.getElement('.modal-container').remove();
}

function formatingPhone(number) {
    
    let phone = number.toString().replace(/[^\d]/g,'');
    phone = phone.replace(/^([0-9]{3})([0-9]{3})([0-9]{1,})$/,'($1) $2-$3');
    
    return phone
}

function formatingBirthday(string) {
    let st; // cuurent DOB
    let year;
    let month;
    let day;
    let stA = [];
    if(string.length > 10) {
        st = string.substring(0,10);
        st = st.replace(/[^\d]/g, '');
       
        year = st.substring(0, 4);
        stA.push(year);

        month = st.substring(4, 6);
        stA.push(month);

        day = st.substring(6, 8);
        stA.push(day);

        st = stA.reverse().toString();
        st = st.replace(/[^\d]/g, '/');

        
    }
    
    return st;
}


const start = () => {
    fetchData(randomUrl)
    .then(data => {

        data.map(datas => userDatas.push(datas))
        showUsers(userDatas);
        searchUsers(userDatas)
    })
    
}

start();