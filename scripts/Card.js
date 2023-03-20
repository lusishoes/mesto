export class Card {
    constructor(data, templateSelector, openImagePopup) {
        this._name = data.name;
        this._link = data.link;
        this._alt = data.name;
        this._templateSelector = templateSelector;
        this._openImagePopup = openImagePopup;
    }
    // клонирую структуру template элемента 
    _getTemplate() {
        const cardElement = document
          .querySelector(this._templateSelector)
          .content
          .querySelector('.elements__card')
          .cloneNode(true);
    
        return cardElement;
    }

    _addheartIcon() {
        this._element.querySelector('.elements__icon').classList.toggle('elements__icon_active');
    }

    _deleteCard() {
        this._element.closest('.elements__card').remove();
    }

    _setEventListeners() {
        this._element.querySelector('.elements__icon').addEventListener('click', () => {
            this._addheartIcon();
        });

        this._element.querySelector('.elements__card-bucket').addEventListener('click', () => {
            this._deleteCard();
        });

        this._element.querySelector('.elements__card-image').addEventListener('click', (e) => {
            this._openImagePopup(e);
        });
    };

    // наполняю карточку свойствами 
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.elements__text').textContent = this._name;
        this._element.querySelector('.elements__card-image').src = this._link;
        this._element.querySelector('.elements__card-image').alt = this._alt;
    
        return this._element;
    }
}


  