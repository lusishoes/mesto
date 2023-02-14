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
let popupWrapBtn = document.querySelector('.profile__add-button-wrap');
let formPopupCard = document.querySelector('.popup__form-card');

// модификаторы кнопок
let closePopupEdit = document.querySelector('.popup__close-icon_theme_edit-profile');
let closePopupAdd = document.querySelector('.popup__close-icon_theme_add-card');
let popupCloseIconImage = document.querySelector('.popup__close-icon_theme_open-image');
// модификаторы попапов
let popupChangeName = document.querySelector('.popup_theme_edit-profile');
let popupadd = document.querySelector('.popup_theme_add-card');
let popupImageBlock = document.querySelector('.popup_theme_open-image');

// функция открытия любого попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}
// функция закрытия любого попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

// функция добавления карточки
function addCard(place_name, image_link) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.elements__text').textContent =  place_name;
  cardElement.querySelector('.elements__card-image').src = image_link;
  cardElement.querySelector('.elements__card-image').alt = place_name;
cardsList.prepend(cardElement);
}

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
    cardElement.querySelector('.elements__card-image').alt = e.name;

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

  const handleOpenImagePopup = (evt) => {
    openPopup(popupImageBlock);
    // картинка
    let target_source = evt.target;
    console.log(evt.target);
    // присваиваю описание название 
    document.querySelector('.popup__image-signature').textContent = target_source.alt;
    // ссылка на картинку
    document.querySelector('.popup__image-block').src = target_source.src;
  }

// ивент лисенер для добавления карточки
popupWrapBtn.addEventListener('click', function() {
  openPopup(popupadd);
});

closePopupEdit.addEventListener('click', function() {
  closePopup(popupChangeName);
});

closePopupAdd.addEventListener('click', function() {
  closePopup(popupadd);
});

popupCloseIconImage.addEventListener('click', function() {
  closePopup(popupImageBlock);
});

// функция открытия попапа редактирования
editBtn.addEventListener('click', function() {
  openPopup(popupChangeName);
  formPopup.querySelector('.popup__input_type_name').value = nameInput.textContent;
  formPopup.querySelector('.popup__input_type_occupation').value = occupationInput.textContent;  
});

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

// ивент добавления карточки
formPopupCard.addEventListener('submit', function(e){
  e.preventDefault();
let inputPlaceName = formPopupCard.querySelector('.popup__input_type_place-name');
let inputPlaceImage = formPopupCard.querySelector('.popup__input_type_image-link');
addCard(inputPlaceName.value, inputPlaceImage.value);

closePopup(popupadd);

inputPlaceName.value = '';
inputPlaceImage.value = '';
});

// определяем блок где был клик либо по сердечку либо корзине -> вызываем функции выше
  cardsList.addEventListener('click', (evt) => {
    console.log(evt.target);
    if (evt.target.classList.contains('elements__icon')) {
      addheartIcon(evt);
    } else if (evt.target.classList.contains('elements__card-bucket')) {
      handleDelete(evt);
    } else if (evt.target.classList.contains('elements__card-image')) {
      handleOpenImagePopup(evt);
   }
});


