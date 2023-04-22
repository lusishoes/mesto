import Popup from './Popup.js';

export class PopupWishConfirmation extends Popup {
    constructor(popupElement) {
        super(popupElement);
    }

    setSubmit(handler) {
        this._submitElement = handler;
    } 

    setEventListeners() {
        super.setEventListeners();
        this._formElement = this._popupElement.querySelector('.popup__container');
        this._formElement.addEventListener('submit', (e) => {
            
            e.preventDefault();
            this._submitElement();
            this.close();
        });
    }
}