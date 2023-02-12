'use strict'

let popupEdit = document.querySelector('.popup');
let editBtn = document.querySelector('.profile__edit-button');
let closeBtn = document.querySelector('.popup__close-icon');
let formPopup = document.querySelector('.popup__form') ;
let nameInput = document.querySelector('.profile__title');
let occupationInput = document.querySelector('.profile__occupation');
let cardTemplate = document.querySelector('.elements__card-template').content;
let cardsList = document.querySelector('.elements');
let popupContainter = document.querySelector('.popup__container');
let popupadd = document.querySelector('.popup__add');
let popupwrapbtn = document.querySelector('.profile__add-button-wrap');
let popupChangeName = document.querySelector('.popup__edit');
let closePopupEdit = document.querySelector('.popup__close-icon_edit');
let closePopupAdd = document.querySelector('.popup__close-icon_add');


// функция открытия попапа редактирования
editBtn.addEventListener('click', function() {
    openPopup(popupChangeName);
    formPopup.querySelector('.popup__input_type_name').value = nameInput.textContent;
    formPopup.querySelector('.popup__input_type_occupation').value = occupationInput.textContent;  
});

// функция открытия любого попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}
// функция закрытия любого попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

// ивент листенер меняющий имя и деятельность
formPopup.addEventListener('submit', function(e){
    e.preventDefault();
        let nameInputValue = formPopup.querySelector('.popup__input_type_name').value;
        let occupationInputValue = formPopup.querySelector('.popup__input_type_occupation').value;
    if(nameInputValue !== '' && occupationInputValue !== '') {
        nameInput.textContent = nameInputValue;
        occupationInput.textContent = occupationInputValue;
    }
    closePopup(popupChangeName);   
});

// ивент лисенер для добавления карточки
popupwrapbtn.addEventListener('click', function() {
  openPopup(popupadd);
});

closePopupEdit.addEventListener('click', function() {
  closePopup(popupChangeName);
});

closePopupAdd.addEventListener('click', function() {
  closePopup(popupadd);
});

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

  // вывод карточек
  initialCards.forEach((e) => {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.elements__card-image').src = e.link;  
    cardElement.querySelector('.elements__text').textContent = e.name;
    
    cardsList.append(cardElement);
  });
// добавление/убирание лайка
  const addheartIcon = (evt) => {
    let target = evt.target;
    target.classList.toggle('elements__icon_active');
  };
 // удаление карточки
  const handleDelete = (evt) => {
    evt.target.closest('.elements__card').remove();
  };
// определяем блок где был клик либо по сердечку либо корзине -> вызываем функции выше
  cardsList.addEventListener('click', (evt) => {
    console.log(evt.target);
    if (evt.target.classList.contains('elements__icon')) {
      addheartIcon(evt);
    } else if (evt.target.classList.contains('elements__card-bucket')) {
      handleDelete(evt);
    }
});
