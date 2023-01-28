'use strict'

let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.profile__edit-button');
let closeBtn = document.querySelector('.popup__close-icon');

const handleAboutButtonClick = () => { 
    popup.classList.add('popup_opened');
    formPopup.querySelector('.input__text_type_name').value = nameInput.textContent;
    formPopup.querySelector('.input__text_type_occupation').value = occupationInput.textContent;
}

const handleCloseButtonClick = () => { 
    popup.classList.remove('popup_opened');
}

editBtn.addEventListener('click', handleAboutButtonClick);
closeBtn.addEventListener('click', handleCloseButtonClick);

let formPopup = document.querySelector('.popup__container') ;
let nameInput = document.querySelector('.profile__title');
let occupationInput = document.querySelector('.profile__occupation');

formPopup.addEventListener('submit', function(e){
    e.preventDefault();
        let nameInputValue = formPopup.querySelector('.input__text_type_name').value;
        let occupationInputValue = formPopup.querySelector('.input__text_type_occupation').value;
    if(nameInputValue !== '' && occupationInputValue !== '') {
        nameInput.textContent = nameInputValue;
        occupationInput.textContent = occupationInputValue;
    }
    handleCloseButtonClick();   
});