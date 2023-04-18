export class Card {
    constructor(data, { handleCardClick }, templateSelector) {
       // this._userId =  userId; // айдишник карточек которые нам прислали 
       // this._cardId = data._id; // айдишник нашей карточки созданной 
        this._ownerId = data.owner._id;
        this._cardId = data.userWhoOwnThis;
        //console.log('this._userId :', this._userId);
        this._name = data.name;
        this._link = data.link;
        this._alt = data.name;
        this._likes = data.likes;
        
      //  console.log('this._myCardId :', this._myCardId);

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
    }


    // наполняю карточку свойствами 
    generateCard() {
        this._element = this._getTemplate();

        this.likesCounter = this._element.querySelector('.elements__like-counter');
        this._iconElement = this._element.querySelector('.elements__icon');
        this._cardImage = this._element.querySelector('.elements__card-image');
        this._cardBucket = this._element.querySelector('.elements__card-bucket');
        this._cardText = this._element.querySelector('.elements__text');
        this._setEventListeners();
        
        
        if (this._cardId !== this._ownerId) {
            this._element.querySelector('.elements__card-bucket').classList.add('elements__card-bucket_type-disabled');
          }else{
            this._element.querySelector('.elements__card-bucket').classList.remove('elements__card-bucket_type-disabled');
          }

        
        this._cardText.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._alt;
        this.likesCounter.textContent = this._likes.length;
        console.log(this._element);
        return this._element;
    }
}