export class Card {
    constructor(data, { handleCardClick }, deleteCard, setLike, deleteLike, templateSelector) {
       // this._userId =  userId; // айдишник карточек которые нам прислали 
       // this._cardId = data._id; // айдишник нашей карточки созданной 
        this._ownerId = data.owner._id;
        this._cardId = data.userWhoOwnThis;
        //console.log('this._userId :', this._userId);
        this.userId = data._id;
        this._name = data.name;
        this._link = data.link;
        this._alt = data.name;
        this._likes = data.likes;
        this.daleteCardHandler = deleteCard;
      //  console.log('this._myCardId :', this._myCardId);
        this._setLike = setLike;
        this._deleteLike = deleteLike;

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

    setCurrentLikesNumber(data) {
        this._likesNumber = data.likes.length;
        this._likesCounter.textContent  = this._likesNumber;
    }

    _toggleLike() {
        if(this._iconElement.classList.contains('elements__icon_active')){
            this._iconElement.classList.remove('elements__icon_active');
            this._deleteLike(this.userId);
        } else {
            this._iconElement.classList.add('elements__icon_active');
            this._setLike(this.userId);
        }
    }

    deleteCard() {
        this._element.closest('.elements__card').remove();
    }

    _setEventListeners() {
        this._iconElement.addEventListener('click', () => {
            this._toggleLike();
        });

        this._cardBucket.addEventListener('click', () => {
            this.daleteCardHandler(this.userId);
        });

        this._cardImage.addEventListener('click', (e) => {
            this._handleCardClick(e);
        });
    }


    // наполняю карточку свойствами 
    generateCard() {
        this._element = this._getTemplate();

        this._likesCounter = this._element.querySelector('.elements__like-counter');
        this._iconElement = this._element.querySelector('.elements__icon');
        this._cardImage = this._element.querySelector('.elements__card-image');
        this._cardBucket = this._element.querySelector('.elements__card-bucket');
        this._cardText = this._element.querySelector('.elements__text');
        this._setEventListeners();
        
        
        if (this._cardId !== this._ownerId) {
            this._element.querySelector('.elements__card-bucket').classList.add('elements__card-bucket_type-disabled');
          } else {
            this._element.querySelector('.elements__card-bucket').classList.remove('elements__card-bucket_type-disabled');
        }

        
        this._cardText.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._alt;
        this._likesCounter.textContent = this._likes.length;
        //console.log(this._element);
        return this._element;
    }
}