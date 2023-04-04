import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImageSignature = this._popupElement.querySelector('.popup__image-signature');
        this._popupImageBlock = this._popupElement.querySelector('.popup__image-block');
    }

    open(item) {
        super.open();
        this._popupImageSignature.textContent = item.name;
        this._popupImageBlock.src = item.link;
        this._popupImageBlock.alt = item.name;
    }
}
