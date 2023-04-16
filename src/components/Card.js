export class Card {
    constructor(data, { handleCardClick }, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._alt = data.name;
        this._likes = data.likes;
        //
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        
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

    _toggleLike() {
        this._iconElement.classList.toggle('elements__icon_active');
    }

    _deleteCard() {
        this._element.closest('.elements__card').remove();
    }

    _setEventListeners() {
        this._iconElement.addEventListener('click', () => {
            this._toggleLike();
        });

        this._cardBucket.addEventListener('click', () => {
            this._deleteCard();
        });

        this._cardImage.addEventListener('click', (e) => {
            this._handleCardClick(e);
        });
    };

    // наполняю карточку свойствами 
    generateCard() {
        this._element = this._getTemplate();

        this.likesCounter = this._element.querySelector('.elements__like-counter');
        this._iconElement = this._element.querySelector('.elements__icon');
        this._cardImage = this._element.querySelector('.elements__card-image');
        this._cardBucket = this._element.querySelector('.elements__card-bucket');
        this._cardText = this._element.querySelector('.elements__text');
        this._setEventListeners();
        
        this._cardText.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._alt;
        this.likesCounter.textContent = this._likes.length;

        return this._element;
    }
}


  