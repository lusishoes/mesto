'use strict'

import { Card } from "../components/Card.js";
import { confiValidation, initialCards } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import  Section  from "../components/Section.js";
import  PopupWithImage  from "../components/PicturePopup.js";
import PopupWithForm from "../components/PopupWishForm.js";
import UserInfo from "../components/UserInfo.js";


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

/*
1. функция идущая параметром к Card принимает item -> 
   который является объектом initialCards -> 
   и на каждую карточку мы вешаем слушатель ->
   при нажатии на пикчу -> этот самый объект передаем методу open
   и из него высасываем свойства для нашего попапа

2. функция идущая в в section принимает в себя -> 
   каждый из объектов первого параметра экземпляра класса ->
   в ее теле вызывется метода addItem ->
   который принимает в себя третий параметр куда вставлять

3. PopupWithForm первым параметром указываем попап откуда будем собирать инпуты ->
   функция его принимает объект инпутов 
*/

// начинаем валидацию 
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

// функция создания карточки 
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

// создаем дефолтные 6 карточек
const cardSectionBlock = new Section(
  {
      data: initialCards,
      renderer: (item) => {
        cardSectionBlock.addItem(createCard(item));
      }
  }, 
  '.elements'
  );
// вызываем функцию добавления карточек
cardSectionBlock.renderItems();

// создается экземпляр формы 
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


  const userInfoElement = new UserInfo({
    userName: '.profile__title',
    userOccupation: '.profile__occupation',
  });


  const popupFormUserInfo = new PopupWithForm(
    '.popup_theme_edit-profile', 
    {
   handleFormSubmit: 
          (item) => {
    // вот так обозначаем значения из формы 
    const data = {
      userName: item.userName,
      userOccupation: item.userOccupation,
     }
     userInfoElement.setUserInfo(data);

   }
 });

    popupFormCard.setEventListeners();
    popupFormUserInfo.setEventListeners();
   
 // тут слушатель на кнопке добавления карточки
popupWrapBtn.addEventListener('click', function() {
    // openPopup(popupAddCardSection);
    popupFormCard.open();
    formValidators[popupFormAddCard.getAttribute('name')].checkValidation(); 
});
// тут слушатель на кнопке редактирования пользователя 
editBtn.addEventListener('click', function() {
    popupFormUserInfo.open();
    popupFormUserInfo.addInputValues(userInfoElement.getUserInfo())
    // popupInputName.value = nameInput.textContent;
    // popupInputOccupation.value = occupationInput.textContent;
    formValidators[popupFormProfile.getAttribute('name')].checkValidation();
});

// слушайтель сабмита редактирования пользователя 
// popupFormProfile.addEventListener('submit', function(e) {
//     e.preventDefault(); 
//     nameInput.textContent =popupInputName.value;
//     occupationInput.textContent = popupInputOccupation.value;
//     closePopup(popupProfileSection);
// });





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
