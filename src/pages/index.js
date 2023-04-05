'use strict'

  import { Card } from "../components/Card.js";
  import { confiValidation, initialCards } from "../utils/constants.js";
  import { FormValidator } from "../components/FormValidator.js";
  import { Section } from "../components/Section.js";
  import { PopupWithImage }  from "../components/PicturePopup.js";
  import { PopupWithForm } from "../components/PopupWishForm.js";
  import { UserInfo } from "../components/UserInfo.js";
  import {
      editBtn,
      popupFormProfile,
      popupFormAddCard,
      popupWrapBtn,
      formValidators,
  } from "../utils/constants.js";
  import '../pages/index.css';

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
        const card = new Card(item, {
            handleCardClick: () => {
                pictureElement.setEventListeners();
                pictureElement.open(item);
            }
        }, '.elements__card-template', );
        const cardElement = card.generateCard();
        return cardElement;
    }
    // создаем дефолтные 6 карточек
const cardSectionBlock = new Section({
    data: initialCards,
    renderer: (item) => {
        cardSectionBlock.addItem(createCard(item));
    }
}, '.elements');

// вызываем функцию добавления карточек
cardSectionBlock.renderItems();

// создается экземпляр формы 
const popupFormCard = new PopupWithForm('.popup_theme_add-card', {
    handleFormSubmit: ({
        imageLink,
        placeName
    }) => {
        const data = {
            link: imageLink,
            name: placeName,
        }
        cardSectionBlock.addItem(createCard(data));
    }
});

const userInfoElement = new UserInfo({
    userName: '.profile__title',
    userOccupation: '.profile__occupation',
});

const popupFormUserInfo = new PopupWithForm('.popup_theme_edit-profile', {
    handleFormSubmit: (item) => {
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
    popupFormCard.open();
    formValidators[popupFormAddCard.getAttribute('name')].checkValidation();
});

// тут слушатель на кнопке редактирования пользователя 
editBtn.addEventListener('click', function() {
    popupFormUserInfo.open();
    popupFormUserInfo.addInputValues(userInfoElement.getUserInfo())
    formValidators[popupFormProfile.getAttribute('name')].checkValidation();
});

