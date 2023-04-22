export class Card {
    constructor(data, { handleCardClick }, deleteCard, setLike, deleteLike, templateSelector) {
       // this._userId =  userId; // айдишник карточек которые нам прислали 
        this._dataLike = data.likes;// айдишник нашей карточки созданной 
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
        //console.log(data);
        this._data = data; 

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
    // проверяем на наличие лайка
    _checkCardLike() {
        //console.log(this._dataLike);
        return this._dataLike.some(elem => elem._id === this._cardId);
        //console.log(this._data);
        //return this._dataLike.some(elem => console.log(elem));
        //  elem._id === this._cardId
    }

    setCurrentLikesNumber(element) {
       // console.log(element); // получаю массив с тем кто лайкнул карточки и инфу о карточке
        this._likesNumber  = element.likes.length; // беру из него кол-во того кто сколько раз лайкнул
        //this._likesCounter.textContent  = this._likesNumber;
        if(this._likesNumber.length === 0) {
            this._likesCounter.textContent = '0';
        } else {
            this._likesCounter.textContent = this._likesNumber ;
        }

        if(this._checkCardLike()) {
            this._iconElement.classList.add('elements__icon_active');
        } else{
            this._iconElement.classList.remove('elements__icon_active');
        }

    }

    toggleLike() {
        if(this._checkCardLike()){
           // this._iconElement.classList.remove('elements__icon_active');
          // this._iconElement.classList.remove('elements__icon_active');
            this._deleteLike(this.userId);
        } else {
           // this._iconElement.classList.add('elements__icon_active');
            this._setLike(this.userId);
        }
    }

    deleteCard() {
        this._element.closest('.elements__card').remove();
    }

    _setEventListeners() {
        this._iconElement.addEventListener('click', () => {
            this.toggleLike();
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
        this.setCurrentLikesNumber(this._data);
        

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