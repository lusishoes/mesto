export const editBtn = document.querySelector('.profile__edit-button');
export const popupFormProfile = document.querySelector('.popup__form_theme_edit-profile');
export const popupFormAddCard = document.querySelector('.popup__form_theme_add-card');
export const popupWrapBtn = document.querySelector('.profile__add-button-wrap');
export const formValidators = {};


export const confiValidation = { 
    formSelector : '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector : '.popup__button', 
    inactiveButtonClass : 'popup__button_type_disabled',
    inputErrorClass : 'popup__input_type_error', 
    errorClass : 'popup__input-error_type_active',
};

export const initialCards = [
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
