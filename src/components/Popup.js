 
export default class Popup {
    constructor(popupElement) {
    this._popupElement = document.querySelector(popupElement);
    this._buttonClose = this._popupElement.querySelector('.popup__close-icon');     
    }
  
    open() {
      this._popupElement.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
      this._popupElement.addEventListener('click', this._handleClickClose);
    }
  
    close() {
      this._popupElement.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
      this._popupElement.removeEventListener('click', this._handleClickClose);
    }
  
    _handleEscClose = (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    };
  
    _handleClickClose = (e) => {
      if (e.target === this._popupElement) {
        this.close();
        console.log(e.target );
      }
    };
  
    setEventListeners() {
      this._buttonClose.addEventListener('click', this.close.bind(this)); 
    }
  }
  