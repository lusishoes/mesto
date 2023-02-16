'use strict'

const editBtn = document.querySelector('.profile__edit-button');
const formPopup = document.querySelector('.popup__form_theme_edit-profile');
const nameInput = document.querySelector('.profile__title');
const occupationInput = document.querySelector('.profile__occupation');
const cardTemplate = document.querySelector('.elements__card-template').content;
const cardsList = document.querySelector('.elements');
const popupWrapBtn = document.querySelector('.profile__add-button-wrap');

const popupProfileСloseIcon = document.querySelector('.popup__close-icon_theme_edit-profile');
const popupCardCloseIcon = document.querySelector('.popup__close-icon_theme_add-card');
const popupImageCloseIcon = document.querySelector('.popup__close-icon_theme_open-image');

const popupProfileSection = document.querySelector('.popup_theme_edit-profile');
const popupAddCardSection = document.querySelector('.popup_theme_add-card');
const popupImageSection = document.querySelector('.popup_theme_open-image');

const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputOccupation = document.querySelector('.popup__input_type_occupation');
const popupInputPlaceName = document.querySelector('.popup__input_type_place-name');
const popupInputImageLink = document.querySelector('.popup__input_type_image-link');
const popupImageSignature = document.querySelector('.popup__image-signature');
const popupImageBlock = document.querySelector('.popup__image-block');

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

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

initialCards.forEach((e) => {
    cardsList.append(createCard(e));
});

function createCard(item) {
    const cardElements = cardTemplate.cloneNode(true);
    cardElements.querySelector('.elements__text').textContent = item.name;
    cardElements.querySelector('.elements__card-image').src = item.link;
    cardElements.querySelector('.elements__card-image').alt = item.name;
    return cardElements;
}

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
    popupImageSignature.textContent = targetSource.alt;
    popupImageBlock.src = targetSource.src;
    popupImageBlock.alt = targetSource.alt;
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
    popupInputName.value = nameInput.textContent;
    popupInputOccupation.value = occupationInput.textContent;
});

formPopup.addEventListener('submit', function(e) {
    e.preventDefault();
    let nameInputValue = popupInputName.value;
    let occupationInputValue = popupInputOccupation.value;
    if (nameInputValue !== '' && occupationInputValue !== '') {
        nameInput.textContent = nameInputValue;
        occupationInput.textContent = occupationInputValue;
    }
    closePopup(popupProfileSection);
});

popupAddCardSection.addEventListener('submit', function(e) {
    e.preventDefault();
    e.link = popupInputImageLink.value;
    e.name = popupInputPlaceName.value;
    
    cardsList.prepend(createCard(e));
    closePopup(popupAddCardSection);
    e.target.value.remove();
    
    popupInputImageLink.value = '';
    popupInputPlaceName.value = '';
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