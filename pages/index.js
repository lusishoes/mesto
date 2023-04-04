'use strict'

import { Card } from "../components/Card.js";
import { confiValidation, initialCards } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import  Popup  from "../components/Popup.js";
import  Section  from "../components/Section.js";
import  PopupWithImage  from "../components/PicturePopup.js";
import PopupWithForm from "../components/PopupWishForm.js";


const editBtn = document.querySelector('.profile__edit-button');
const popupFormProfile = document.querySelector('.popup__form_theme_edit-profile');
const popupFormAddCard = document.querySelector('.popup__form_theme_add-card');
const nameInput = document.querySelector('.profile__title');
const occupationInput = document.querySelector('.profile__occupation');
const popupWrapBtn = document.querySelector('.profile__add-button-wrap');
const cardSection = document.querySelector('.elements');
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
const formValidators = {};

/**
 * 1. Отрисовать с помощью section карточки 
 */

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


const pictureElement = new PopupWithImage('.popup_theme_open-image');

const createCard = (item) => {
    const card = new Card(
      item,
      {
      handleCardClick: () => {
          pictureElement.setEventListeners();
          pictureElement.open(item);
          }
      },
       '.elements__card-template', 
      );
    const cardElement = card.generateCard(); 
    return cardElement;
}

const cardSectionBlock = new Section(
  {
      data: initialCards,
      renderer: (item) => {
        cardSectionBlock.addItem(createCard(item));
      }
  }, 
  '.elements'
  );

cardSectionBlock.renderItems();

  const popupFormCard = new PopupWithForm(
     '.popup_theme_add-card', 
     {
    handleFormSubmit: 
    ({imageLink, placeName}) => {
     const data ={
        link: imageLink,
        name: placeName,
      }
      console.log(data);
      cardSectionBlock.addItem(createCard(data));
    }
    });

    popupFormCard.setEventListeners();
// рендерю лист дефолтных карточек
// const cardsList = new Section({
//     data: initialCards,
//     renderer: (item) => {
//       const card = new Card({
//         data: item,
//         handleCardClick: () => {
//           const pictureElement = new PopupWithImage(popupImageSection, item);
//           pictureElement.setEventListeners();
//           pictureElement.open();
//         }
//       }, '.elements__card-template');
//       const cardElement = card.generateCard();
//       cardsList.addItem(cardElement); // вызываем метод addItem после создания элемента карточки
//     }
//   }, '.elements');
  
//   cardsList.renderItems();

// // рендерю форму с карточками 
//   const popupFormCard = new PopupWithForm(
//      '.popup_theme_add-card', {
//     handleFormSubmit: (item) => {
//       const card = new Card({
//         data: item,
//         handleCardClick: () => {
//           const pictureElement = new PopupWithImage(popupImageSection, item);
//           pictureElement.setEventListeners();
//           pictureElement.open();
//         }
//       }, '.elements__card-template');
//       const cardElement = card.generateCard();
//       cardsList.addItem(cardElement);
//     },
//   });

 /*сюда до */
   
 // тут слушатель на кнопке добавления карточки
popupWrapBtn.addEventListener('click', function() {
    // openPopup(popupAddCardSection);
    popupFormCard.open();
    formValidators[popupFormAddCard.getAttribute('name')].checkValidation(); 
});
// тут слушатель на кнопке редактирования пользователя 
editBtn.addEventListener('click', function() {
    openPopup(popupProfileSection);
    popupInputName.value = nameInput.textContent;
    popupInputOccupation.value = occupationInput.textContent;
    formValidators[popupFormProfile.getAttribute('name')].checkValidation();
});

// слушайтель сабмита редактирования пользователя 
popupFormProfile.addEventListener('submit', function(e) {
    e.preventDefault(); 
    nameInput.textContent =popupInputName.value;
    occupationInput.textContent = popupInputOccupation.value;
    closePopup(popupProfileSection);
});





// слушатель сабмита добавления карточки 
// popupAddCardSection.addEventListener('submit', function(e) {
//     e.preventDefault();
//     const cardItem = {
//         link: popupInputImageLink.value,
//         name: popupInputPlaceName.value
//     }
//     const newCard = createCard(cardItem);
//     cardSection.prepend(newCard);
//     closePopup(popupAddCardSection);
//     e.target.reset();
// });


// function openImagePopup (evt) {
//     openPopup(popupImageSection);
//     const targetSource = evt.target; 
//     popupImageSignature.textContent = targetSource.alt;
//     popupImageBlock.src = targetSource.src;
//     popupImageBlock.alt = targetSource.alt;
// }


  // const form = new PopupWithForm({
  //   selector: '.popup_theme_add-card',
  //   handleFormSubmit: (formData) => {
  //       const cardElement = new 
  //   }
  // });

  // /* Создание карточки  */
// function createCard(item) {
//     const card = new Card(item, '.elements__card-template', openImagePopup);
//     const cardElement = card.generateCard(); 
//     return cardElement;
// }
//  /* проходится по каждому элементу из массива объектов создает карточку и добавляет ее в  блок с карточками*/
// initialCards.forEach((item) => {
//     const cardElement = createCard(item);
//     cardSection.append(cardElement);
// });


/* отсюда  Должно быть перенесено в popup.js */
// function openPopup(popupElement) {
//     popupElement.classList.add('popup_opened');
//     document.addEventListener('keydown', handleEscapeClose);
//     document.addEventListener('click', handleClickClose);
// }

// function closePopup(popupElement) {
//     popupElement.classList.remove('popup_opened');
//     document.removeEventListener('keydown', handleEscapeClose);
//     document.removeEventListener('click', handleClickClose);
// }

// function handleEscapeClose(e) {
//     if(e.key === 'Escape') {
//         const popupOpen = document.querySelector('.popup_opened');
//         closePopup(popupOpen);
//     }
// }

// function handleClickClose(e) {
//     if(e.target.classList.contains('popup_opened')) {
//         closePopup(e.target.closest('.popup'));
//     }
// }
  
// closeButtons.forEach((button) => {
//     const popup = button.closest('.popup');
//     button.addEventListener('click', () => closePopup(popup));
// });
