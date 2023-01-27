let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.profile__edit-button');
let closeBtn = document.querySelector('.popup__close-icon');

const handleAboutButtonClick = () => { 
    popup.classList.add('popup_opened');
}

const handleCloseButtonClick = () => { 
    popup.classList.remove('popup_opened');
}

editBtn.addEventListener('click', handleAboutButtonClick);
closeBtn.addEventListener('click', handleCloseButtonClick);
/*Имя чела на странице*/
let nameInput = document.querySelector('.profile__title');
/*деятельность чела на странице*/
let occupationInput = document.querySelector('.profile__occupation');
console.log(nameInput, occupationInput);
/*Кнопка submit */
let submitButton = document.querySelector('.popup__button');

function takesmth(evt) {
    evt.preventDefault();
    /*имя чела через инпут */
    let nameInputValue = document.querySelector('.input__text_type_name').value;
    /*деятельность чела через инпут*/ 
    let occupationInputValue = document.querySelector('.input__text_type_occupation').value;
    if(((nameInputValue && occupationInputValue)!== '') || ((nameInputValue || occupationInputValue)!== '')) {
        nameInput.textContent = nameInputValue;
        console.log(nameInput);
        occupationInput.textContent = occupationInputValue;
        console.log(occupationInput);
    }
    handleCloseButtonClick();
}

submitButton.addEventListener('click', takesmth);

