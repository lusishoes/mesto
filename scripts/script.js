'use strict'

const editBtn = document.querySelector('.profile__edit-button');
const formPopup = document.querySelector('.popup__form');
let nameInput = document.querySelector('.profile__title');
let occupationInput = document.querySelector('.profile__occupation');
let cardTemplate = document.querySelector('.elements__card-template').content;
let cardsList = document.querySelector('.elements');
const popupWrapBtn = document.querySelector('.profile__add-button-wrap');
let formPopupCard = document.querySelector('.popup__form-card');

const popupProfileСloseIcon = document.querySelector('.popup__close-icon_theme_edit-profile');
const popupCardCloseIcon = document.querySelector('.popup__close-icon_theme_add-card');
const popupImageCloseIcon = document.querySelector('.popup__close-icon_theme_open-image');

const popupProfileSection = document.querySelector('.popup_theme_edit-profile');
const popupAddCardSection = document.querySelector('.popup_theme_add-card');
const popupImageSection = document.querySelector('.popup_theme_open-image');

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

function addCard(place_name, image_link) {
    const cardElements = cardTemplate.cloneNode(true);
    cardElements.querySelector('.elements__text').textContent = place_name;
    cardElements.querySelector('.elements__card-image').src = image_link;
    cardElements.querySelector('.elements__card-image').alt = place_name;
    cardsList.prepend(cardElements);
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  }, 
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  }, 
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  }, 
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  }, 
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  }, 
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }];

initialCards.forEach((e) => {
    const cardElements = cardTemplate.cloneNode(true);
    cardElements.querySelector('.elements__card-image').src = e.link;
    cardElements.querySelector('.elements__text').textContent = e.name;
    cardElements.querySelector('.elements__card-image').alt = e.name;
    cardsList.append(cardElements);
});

const addheartIcon = (evt) => {
    let target = evt.target;
    target.classList.toggle('elements__icon_active');
};

const deleteCard = (evt) => {
    evt.target.closest('.elements__card').remove();
};
const openImagePopup = (evt) => {
    openPopup(popupImageSection);
    let targetSource = evt.target;
    document.querySelector('.popup__image-signature').textContent = targetSource.alt;
    document.querySelector('.popup__image-block').src = targetSource.src;
}
    
popupWrapBtn.addEventListener('click', function() {
    openPopup(popupAddCardSection);
});

popupProfileСloseIcon.addEventListener('click', function() {
    closePopup(popupProfileSection);
});

popupCardCloseIcon.addEventListener('click', function() {
    closePopup(popupAddCardSection);
});

popupImageCloseIcon.addEventListener('click', function() {
    closePopup(popupImageSection);
});

editBtn.addEventListener('click', function() {
    openPopup(popupProfileSection);
    formPopup.querySelector('.popup__input_type_name').value = nameInput.textContent;
    formPopup.querySelector('.popup__input_type_occupation').value = occupationInput.textContent;
});

formPopup.addEventListener('submit', function(e) {
    e.preventDefault();
    let nameInputValue = formPopup.querySelector('.popup__input_type_name').value;
    let occupationInputValue = formPopup.querySelector('.popup__input_type_occupation').value;
    if (nameInputValue !== '' && occupationInputValue !== '') {
        nameInput.textContent = nameInputValue;
        occupationInput.textContent = occupationInputValue;
    }
    closePopup(popupProfileSection);
});

formPopupCard.addEventListener('submit', function(e) {
    e.preventDefault();
    let inputPlaceName = formPopupCard.querySelector('.popup__input_type_place-name');
    let inputPlaceImage = formPopupCard.querySelector('.popup__input_type_image-link');
    addCard(inputPlaceName.value, inputPlaceImage.value);
    closePopup(popupAddCardSection);
    inputPlaceName.value = '';
    inputPlaceImage.value = '';
});

cardsList.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('elements__icon')) {
        addheartIcon(evt);
    } else if (evt.target.classList.contains('elements__card-bucket')) {
        deleteCard(evt);
    } else if (evt.target.classList.contains('elements__card-image')) {
        openImagePopup(evt);
    }
});