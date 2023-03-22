'use strict'

import { Card } from "./Card.js";
import { confiValidation, initialCards } from "./utility.js";
import { FormValidator } from "./FormValidator.js"

const editBtn = document.querySelector('.profile__edit-button');
const popupFormProfile = document.querySelector('.popup__form_theme_edit-profile');
const popupFormAddCard = document.querySelector('.popup__form_theme_add-card');
const nameInput = document.querySelector('.profile__title');
const occupationInput = document.querySelector('.profile__occupation');
const popupWrapBtn = document.querySelector('.profile__add-button-wrap');
const cardsList = document.querySelector('.elements');
const popupProfileSection = document.querySelector('.popup_theme_edit-profile');
const popupAddCardSection = document.querySelector('.popup_theme_add-card');
const popupImageSection = document.querySelector('.popup_theme_open-image');
const closeButtons = document.querySelectorAll('.popup__close-icon');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputOccupation = document.querySelector('.popup__input_type_occupation');
const popupInputPlaceName = document.querySelector('.popup__input_type_place-name');
const popupInputImageLink = document.querySelector('.popup__input_type_image-link');
const popupImageSignature = document.querySelector('.popup__image-signature');
const popupImageBlock = document.querySelector('.popup__image-block');
const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(confiValidation);

function openImagePopup (evt) {
    openPopup(popupImageSection);
    const targetSource = evt.target; 
    popupImageSignature.textContent = targetSource.alt;
    popupImageBlock.src = targetSource.src;
    popupImageBlock.alt = targetSource.alt;
}

function createCard(item) {
    const card = new Card(item, '.elements__card-template', openImagePopup);
    const cardElement = card.generateCard(); 
    return cardElement;
}
 
initialCards.forEach((item) => {
    const cardElement = createCard(item);
    cardsList.append(cardElement);
});

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscapeClose);
    document.addEventListener('click', handleClickClose);
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscapeClose);
    document.removeEventListener('click', handleClickClose);
}

function handleEscapeClose(e) {
    if(e.key === 'Escape') {
        const popupOpen = document.querySelector('.popup_opened');
        closePopup(popupOpen);
    }
}

function handleClickClose(e) {
    if(e.target.classList.contains('popup_opened')) {
        closePopup(e.target.closest('.popup'));
    }
}
  
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});
    
popupWrapBtn.addEventListener('click', function() {
    openPopup(popupAddCardSection);
    formValidators[popupFormAddCard.getAttribute('name')].checkValidation(); 
});

editBtn.addEventListener('click', function() {
    openPopup(popupProfileSection);
    popupInputName.value = nameInput.textContent;
    popupInputOccupation.value = occupationInput.textContent;
    formValidators[popupFormProfile.getAttribute('name')].checkValidation();
});

popupFormProfile.addEventListener('submit', function(e) {
    e.preventDefault(); 
    nameInput.textContent =popupInputName.value;
    occupationInput.textContent = popupInputOccupation.value;
    closePopup(popupProfileSection);
});

popupAddCardSection.addEventListener('submit', function(e) {
    e.preventDefault();
    const cardItem = {
        link: popupInputImageLink.value,
        name: popupInputPlaceName.value
    }
    const newCard = createCard(cardItem);
    cardsList.prepend(newCard);
    closePopup(popupAddCardSection);
    e.target.reset();
});


