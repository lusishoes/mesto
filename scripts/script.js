'use strict'

const editBtn = document.querySelector('.profile__edit-button');
const formPopup = document.querySelector('.popup__form_theme_edit-profile');
const nameInput = document.querySelector('.profile__title');
const occupationInput = document.querySelector('.profile__occupation');
const popupWrapBtn = document.querySelector('.profile__add-button-wrap');
const cardTemplate = document.querySelector('.elements__card-template').content;
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
    const target = evt.target;
    target.classList.toggle('elements__icon_active');
};

const deleteCard = (evt) => {
    evt.target.closest('.elements__card').remove();
};

const openImagePopup = (evt) => {
    openPopup(popupImageSection);
    const targetSource = evt.target; 
    popupImageSignature.textContent = targetSource.alt;
    popupImageBlock.src = targetSource.src;
    popupImageBlock.alt = targetSource.alt;
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}
  
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});
    
popupWrapBtn.addEventListener('click', function() {
    openPopup(popupAddCardSection);
});

editBtn.addEventListener('click', function() {
    openPopup(popupProfileSection);
    popupInputName.value = nameInput.textContent;
    popupInputOccupation.value = occupationInput.textContent;
});

formPopup.addEventListener('submit', function(e) {
    e.preventDefault();
    const nameInputValue = popupInputName.value;
    const occupationInputValue = popupInputOccupation.value;
    if (nameInputValue !== '' && occupationInputValue !== '') {
        nameInput.textContent = nameInputValue;
        occupationInput.textContent = occupationInputValue;
    }
    closePopup(popupProfileSection);
});

popupAddCardSection.addEventListener('submit', function(e) {
    e.preventDefault();
    const cardItem = {
        link: popupInputImageLink.value,
        name: popupInputPlaceName.value
    }
    cardsList.prepend(createCard(cardItem));
    closePopup(popupAddCardSection);
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



