'use strict'

  import { Card } from "../components/Card.js";
  import { confiValidation } from "../utils/constants.js";
  import { FormValidator } from "../components/FormValidator.js";
  import { Section } from "../components/Section.js";
  import { PopupWithImage }  from "../components/PicturePopup.js";
  import { PopupWithForm } from "../components/PopupWishForm.js";
  import { UserInfo } from "../components/UserInfo.js";
  import { Api } from "../components/Api.js";
  import { PopupWishConfirmation } from "../components/PopupWithConfirmation.js"
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

    const popupDeleteCard = new PopupWishConfirmation('.popup_theme_delete-card');
    popupDeleteCard.setEventListeners();

    const userInfoElement = new UserInfo({
        userName: '.profile__title',
        userOccupation: '.profile__occupation',
        userAvatar: '.profile__image',
    });

    const api = new Api({
        baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
        headers: {
        authorization: '9ed4e7b7-8680-4f86-8c38-42efc846be5c',
        'Content-Type': 'application/json'
        }
    });

    const userId = {};

    // функция создания карточки 
    const createCard = (item) => {
        const card = new Card(item, {
            handleCardClick: () => {
                pictureElement.open(item);
            },
        }, deleteCard, setLike , deleteLike, '.elements__card-template');
        const cardElement = card.generateCard();
        return cardElement;

        function deleteCard(item) {
            popupDeleteCard.setSubmit(() => {
              api.deleteCard(item)
                .then((res) => {
                    console.log(res);
                    card.deleteCard();
                    popupDeleteCard.close();
                })
                .catch((err) => console.log(err));
            });
            popupDeleteCard.open();
        }
        // 4 получаем айдишник карточки и отправляем его на сервер
        function setLike(item) {
           api.addLike(item)
           // приходит ответ от сервера 
            .then((res) => {
                console.log(res);
                //card.checkCardLike();
                card.setCurrentLikesNumber(res);
            }).catch((err) => {
                console.log(err);
            })
        }
        // 4 получаем айдишник карточки и отправляем его на сервер
        function deleteLike(item) {
            api.daleteLike(item)
            // приходит ответ от сервера 
                .then((res) => {
                 console.log(res);
                    card.setCurrentLikesNumber(res);    
                }).catch((err) => {
                    console.log(err);
                })
        }
    }

    Promise.all([api.getUserData(), api.getInitialCards()])
            .then(([userResponse, cardsResponse]) => {
                setUserData(userResponse);
                cardsResponse.forEach((card) => {
                    userId.id = userResponse._id;
                    card.userWhoOwnThis = userResponse._id;
                })
                cardSectionBlock.renderItems(cardsResponse);
                }).catch((err) => {
                    console.log(err);
                });

    // устанавливаю эти данные на страницу
    const setUserData = (data) => {  
        userInfoElement.setUserInfo(data);
        userInfoElement.setUserAvatar(data);
    }
    
    const cardSectionBlock = new Section({
        // тот объект по которому проходимся 
        // функция принимающая каждый из объектов data 
        renderer: (item) => {
            // добавляет их в elements
            cardSectionBlock.addItem(createCard(item));
        }
    }, '.elements');

    // Форма добавления новой карточки
    const popupFormCard = new PopupWithForm('.popup_theme_add-card', {
        handleFormSubmit: (value) => {
            const data = {
                link: value.imageLink,
                name: value.placeName,
            }
        return api.getCreatedCard(data)
                .then((res) => {
                    console.log(res);
                    // полчаю объект с айди моим 
                    // тут приходит айдишник карточек созданных нами -> идет в item и потом 
                    res.userWhoOwnThis = userId.id;
                    cardSectionBlock.addItem(createCard(res));
                    popupFormCard.close();
                }).catch((err) => {
                    console.log(err);
                })
            }
        });
    
    // Форма изменения данных пользователя 
    const popupFormUserInfo = new PopupWithForm('.popup_theme_edit-profile', {
        handleFormSubmit: (item) => {
            console.log(item);
            const data = {
                // userName: item.userName,
                // userOccupation: item.userOccupation,
                name: item.userName,
                about: item.userOccupation,
            }
            //userInfoElement.setUserInfo(data);
                return api.setUserInfo(data)
                    .then((res) => {
                        console.log(res);
                        userInfoElement.setUserInfo(data);
                        popupFormUserInfo.close();
                    }).catch((err) => {
                        console.log(err)
                    }) 
        }
    });
    
    //заготовка формы изменения картинки 
    const popupChangeProfileImage = new PopupWithForm('.popup_theme_change-image', {
        handleFormSubmit: (item) => {
            const data = {
                link: item.imageLink,
            }
            console.log(data)
           //changeUserImage(data);
           return api.setUserProfileImage(data.link) 
                .then(() => {
                    console.log('привет');
                        changeUserImage(data);                        
                        popupChangeProfileImage.close();
                    }).catch((err) => {
                        console.log(err);
                    })     
                }
            });

    const changeUserImage = (data) => {
        console.log(data);
        const info = {
            avatar: data.link,
        }
       // userImage.src = data.link
        userInfoElement.setUserAvatar(info);
    }

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