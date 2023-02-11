'use strict'

let popupEdit = document.querySelector('.popup_type_edit');
let editBtn = document.querySelector('.profile__edit-button');
let closeBtn = document.querySelector('.popup__close-icon');
let formPopup = document.querySelector('.popup__form') ;
let nameInput = document.querySelector('.profile__title');
let occupationInput = document.querySelector('.profile__occupation');
let cardTemplate = document.querySelector('.elements__card-template').content;
let cardsList = document.querySelector('.elements');

const handleAboutButtonClick = () => { 
  popupEdit.classList.add('popup_opened');
    formPopup.querySelector('.popup__input_type_name').value = nameInput.textContent;
    formPopup.querySelector('.popup__input_type_occupation').value = occupationInput.textContent;
}

const handleCloseButtonClick = () => { 
  popupEdit.classList.remove('popup_opened');
}

formPopup.addEventListener('submit', function(e){
    e.preventDefault();
        let nameInputValue = formPopup.querySelector('.popup__input_type_name').value;
        let occupationInputValue = formPopup.querySelector('.popup__input_type_occupation').value;
    if(nameInputValue !== '' && occupationInputValue !== '') {
        nameInput.textContent = nameInputValue;
        occupationInput.textContent = occupationInputValue;
    }
    handleCloseButtonClick();   
});

editBtn.addEventListener('click', handleAboutButtonClick);
closeBtn.addEventListener('click', handleCloseButtonClick);
// добавлние на страницу из массива
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
    }
  ];

  initialCards.forEach((e) => {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.elements__card-image').src = e.link;  
    cardElement.querySelector('.elements__text').textContent = e.name;
    
    cardsList.append(cardElement);
  });

  const addheartIcon = (evt) => {
    let target = evt.target;
    target.classList.toggle('elements__icon_active');
  };

  const handleDelete = (evt) => {
    evt.target.closest('.elements__card').remove();
  };

  cardsList.addEventListener('click', (evt) => {
    console.log(evt.target);
    if (evt.target.classList.contains('elements__icon')) {
      addheartIcon(evt);
    } else if (evt.target.classList.contains('elements__card-bucket')) {
      handleDelete(evt);
    }
});