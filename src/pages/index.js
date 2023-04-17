'use strict'

  import { Card } from "../components/Card.js";
  import { confiValidation, initialCards } from "../utils/constants.js";
  import { FormValidator } from "../components/FormValidator.js";
  import { Section } from "../components/Section.js";
  import { PopupWithImage }  from "../components/PicturePopup.js";
  import { PopupWithForm } from "../components/PopupWishForm.js";
  import { UserInfo } from "../components/UserInfo.js";
  import { Api } from "../components/Api.js";
  import '../pages/index.css';

const editBtn = document.querySelector('.profile__edit-button');
const popupFormProfile = document.querySelector('.popup__form_theme_edit-profile');
const popupFormAddCard = document.querySelector('.popup__form_theme_add-card');
const popupFormChangePersonImage = document.querySelector('.popup__form_theme_change-image');
const popupWrapBtn = document.querySelector('.profile__add-button-wrap');
const popupProfileChangeImage = document.querySelector('.profile__image-change-button');
const userImage = document.querySelector('.profile__image');
const userName = document.querySelector('.profile__title');
const userOccupation = document.querySelector('.profile__occupation');
const popupCloseIcon = document.querySelector('.popup__close-icon');
const formValidators = {};

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

    const userInfoElement = new UserInfo({
        userName: '.profile__title',
        userOccupation: '.profile__occupation',
    });

    const api = new Api({
        baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
        headers: {
        authorization: '9ed4e7b7-8680-4f86-8c38-42efc846be5c',
        'Content-Type': 'application/json'
        }
    });

    // функция создания карточки 
    const createCard = (item) => {
            const card = new Card(item, {
                handleCardClick: () => {
                    pictureElement.open(item);
                }
            }, '.elements__card-template', );
            const cardElement = card.generateCard();
            console.log(cardElement);
            return cardElement;
        }

    // получаю данные пользователя    
    api.getUserData()
        .then((res) => {
           // console.log(res); // добавить эту строку
            setUserData(res);
        });

    // устанавливаю эти данные на страницу
    const setUserData = (data) => {
       // console.log(data); // добавить эту строку
        userImage.src = data.avatar;
        userName.textContent = data.name;
        userOccupation.textContent = data.about;
    }

    const cardSectionBlock = new Section({
        // тот объект по которому проходимся 
        // функция принимающая каждый из объектов data 
        renderer: (item) => {
            // добавляет их в elements
            console.log(item);
            cardSectionBlock.addItem(createCard(item));
        }
    }, '.elements');

// вызываем функцию добавления карточек
    
    
    api.getInitialCards()
        .then((res) => {
           cardSectionBlock.renderItems(res)
        }).catch((err) => {
            console.log(err);
        })
    
        

    // Форма добавления новой карточки
    const popupFormCard = new PopupWithForm('.popup_theme_add-card', {
        handleFormSubmit: (value) => {
            console.log(value);
            const data = {
                link: value.imageLink,
                name: value.placeName,
            }
            api.getCreatedCard(data)
                .then((res) => {
                    cardSectionBlock.addItem(createCard(res));
                })
            }
        });
    
    // Форма изменения данных пользователя 
    const popupFormUserInfo = new PopupWithForm('.popup_theme_edit-profile', {
        handleFormSubmit: (item) => {
            const data = {
                userName: item.userName,
                userOccupation: item.userOccupation,
            }
            userInfoElement.setUserInfo(data);
            //{userName: data.userName, userOccupation: data.userOccupation}
            api.setUserInfo(data);
        }
    });

    //заготовка формы изменения картинки 
    const popupChangeProfileImage = new PopupWithForm('.popup_theme_change-image', {
        handleFormSubmit: (item) => {
            const data = {
                link: item.imageLink,
            }
           api.setUserProfileImage(data.link);
            userImage.src = data.link;
        }
        
    })

    // обработчик редактирования данных пользователя 
    const hanlePopupFormEditUserData = () => { 
        popupFormUserInfo.open(); 
        popupFormUserInfo.addInputValues(userInfoElement.getUserInfo()) 
        formValidators[popupFormProfile.getAttribute('name')].checkValidation(); 
    };

    // обработчик добавления новой карточки
    const handlePopupFormAddCard = () => {
        popupFormCard.open(); 
        formValidators[popupFormAddCard.getAttribute('name')].checkValidation(); 
    }

    const handlePopupProfileImage = () => {
        popupChangeProfileImage.open();
        formValidators[popupFormChangePersonImage.getAttribute('name')].checkValidation(); 
    }

    // тут слушатель на кнопке редактирования пользователя  
    editBtn.addEventListener('click', hanlePopupFormEditUserData);

    // тут слушатель на кнопке добавления карточки
    popupWrapBtn.addEventListener('click', handlePopupFormAddCard); 

    // слушатель на кнопке изменения аватара
    popupProfileChangeImage.addEventListener('click', handlePopupProfileImage)

    pictureElement.setEventListeners();
    popupFormCard.setEventListeners();
    popupFormUserInfo.setEventListeners();
    popupChangeProfileImage.setEventListeners();