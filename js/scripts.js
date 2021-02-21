// randoms user JSON
const randomUrl = 'https://randomuser.me/api/?results=12&nat=GB,US';

//add search input end get input and button and save to the variable
dom.addSearchInput();
const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-submit');

//empty array for all fetched users
let userDatas = [];

// fetch data function to get data end show arror if something wrong with the request
async function fetchData(url){
   return await fetch(url)
        .then(resp => resp.json())
        .then(data => data.results)
        .catch(error => console.log('Some problem. Cant resole the request', error))
}

// display all fetched users
function showUsers(user){
        
    let element = '';
        
    //set gallery div to empty every time when function is called
        dom.gallery.innerHTML = '';
        
        //loop over the users
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

            // get card element and set it listen for click event
            let card = document.querySelectorAll('.card');
            card[i].addEventListener('click', () => {
                
                /* call modal function when is clicked and pass 3 arguments
                * @user[i] - clicked user
                * @ user - all user object
                * @i - index of user in object
                */
                modal(user[i], user, i)
                
            });
    
        }  
        
}    


/**
 * modal function show clicked user in modal
 *
 * @param {object} user - current clicked user
 * @param {array, object} allusers - All users in page
 * @param {integer} userIndex - current index in object
 *
 */
function modal(user, allusers, userIndex) {
    
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

  

  //remove modal with event listener
  dom.getElement('#modal-close-btn').addEventListener('click', removeModal);
  
  // call function to show prev and next users in modal
  modalBtnFunc(allusers, userIndex);
}


/**
 * modalBtnFunc show prev and next users in modal.
 *
 * @param {object} allusers - Pass all users in object
 * @param {integer} userIndex - get current user in index
 *
 */
function modalBtnFunc(allusers, userIndex){
    // get buttons prev, next
    const prevButton = document.querySelector('#modal-prev');
    const nextButton = document.querySelector('#modal-next');

   prevButton.addEventListener('click', (e) => {
       // remove modal
        removeModal();
        
        //if user index is 0 than set userobject length to userindex, this is for if userIndex is 0 will start again
        if (userIndex === 0) { 
            userIndex = allusers.length; 
        }

        //subtract -1 every time when button is clicked
        userIndex = userIndex - 1;
        
        //build new modal with arguments
        modal(allusers[userIndex], allusers, userIndex);
       
    });

    nextButton.addEventListener('click', (e) => {
        // remove modal
        removeModal();

         //add +1 to user index every time when button "next" btn is clicked
         userIndex = userIndex + 1;
         userIndex = userIndex % allusers.length;

         //build new modal with arguments
         modal(allusers[userIndex], allusers, userIndex);
       
    });

    

}

// search users, not given any arguments.
function searchUsers(){
    
    
    searchInput.addEventListener('keyup', (e) => {
    // save typed value to the "user" variable
    let user = e.target.value;

    //set typed value tu lowecase
    user.toLowerCase();

    //for matched users
    let findedUser = [];

    // moa over users
    userDatas.map(datas => {

        //set user names to lowercase
        let firstName = datas.name.first.toLowerCase();
        let lastName = datas.name.last.toLowerCase();

        // if eny  charactes includes first or last name push it to the array
        if(firstName.includes(user) || lastName.includes(user)) {  

            findedUser.push(datas);

        }

        // if input is empty call showusers function
        if(user === '') {
            showUsers(userDatas);  
        }
        
        // call showUsers function with matched users
        showUsers(findedUser); 

        //if user not found create elemnt h1 and add text user not found
        if(findedUser.length === 0) {
            const h1 = document.createElement('h1');
            h1.textContent = 'Sorry user not found'
            dom.gallery.appendChild(h1);
        }
    });
       
    });
    
    
}


//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//--------------------H-E-L-P-E-R------F-U-N-C-T-I-O-N-S-------------------------
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------


// remove modal function
function removeModal() {
    dom.getElement('.modal-container').remove();
}


// format telephone number parameter is integer
function formatingPhone(number) {
    
    // replace any no digital character with empty string
    let phone = number.toString().replace(/[^\d]/g,'');

    //foramt the phone number like this: (079) 301-65
    phone = phone.replace(/^([0-9]{3})([0-9]{3})([0-9]{1,})$/,'($1) $2-$3');
    
    // return formated phone number
    return phone
}

//format birthday function to this: 01/07/1972
function formatingBirthday(string) {
    let st; // cuurent DOB
    let year;
    let month;
    let day;
    let stA = [];

    //get first 10 strings
    if(string.length > 10) {
        st = string.substring(0,10);

        //replace any no digit characters to empty string
        st = st.replace(/[^\d]/g, '');
       
        //push first 4 characters to year variable
        year = st.substring(0, 4);
        stA.push(year);

        //push 4-6 characters to month variable
        month = st.substring(4, 6);
        stA.push(month);

        //push 6-8 characters to day variable
        day = st.substring(6, 8);
        stA.push(day);

        //reverse all 3 array and add "/" character between
        st = stA.reverse().toString();
        st = st.replace(/[^\d]/g, '/');

        
    }
    
    // return formated DOB
    return st;
}

// put all functions in start function
const start = () => {

    // fetch on random URL to get random users
    fetchData(randomUrl)
    .then(data => {

        // psuh all users to "userDatas" array
        data.map(datas => userDatas.push(datas))

        // call showUsers function with all fetched users
        showUsers(userDatas);

        //call serach function
       searchUsers();

       // make searching input working on click
       searchBtn.addEventListener('click', (e) => {
           e.preventDefault();
           searchUsers(userDatas);
       })
    })
    
}

//start the app
start();