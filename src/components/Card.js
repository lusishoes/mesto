export class Card {
    constructor(data, { handleCardClick }, deleteCard, setLike, deleteLike, templateSelector) {
        this._dataLike = data.likes;
        this._ownerId = data.owner._id;
        this._cardId = data.userWhoOwnThis;
        this.userId = data._id;
        this._name = data.name;
        this._link = data.link;
        this._alt = data.name;
        this.daleteCardHandler = deleteCard;
        this._setLike = setLike;
        this._deleteLike = deleteLike;
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

    checkCardLike() {
        return Boolean(this._dataLike.find((elem) => elem._id === this._cardId))
    }

    // объект с установленным мною лайком
    // либо убраным лайком 
    setCurrentLikesNumber(element) {
        // устанавливаю количество лайков на карточке
        this._dataLike  = element.likes; 
        if (this._dataLike.length === 0) {
            this._likesCounter.textContent = '0';
        } else {
            this._likesCounter.textContent = this._dataLike.length;
        }
        // проверяю есть ли мой лайк
        if(this.checkCardLike()) {
            // если да добавляю сердечко
            this._iconElement.classList.add('elements__icon_active');
            //console.log('active');
        } else {
            // если нет убираю
            this._iconElement.classList.remove('elements__icon_active');
            //console.log('not active');
        }     
    }


    // при клике на седце вызывается этот метод
    toggleLike() {
        // если есть мой лайк 
        if (this.checkCardLike()) {
            // то лайк удаляется с карты у которой этот айдишник
            this._deleteLike(this.userId);
        } else {
            // лайк ставится 
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
        return this._element;
    }
}