import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor( popupSelector,{ handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
      //  console.log(this._handleFormSubmit);
        this._popupForm = this._popupElement.querySelector('.popup__form');
       // console.log(this._popupForm);
    }

    _getInputValues() {
        this._inputList = Array.from(this._popupElement.querySelectorAll('.popup__input'));
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
    
        return this._formValues;
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
    
    setEventListeners() {
        // наследуем от родителя 
        super.setEventListeners();
        // обработчик сабмита формы 
        this._popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(this._getInputValues());
          // функция создания карточки, принимает объект с значениями инпутов
            this._handleFormSubmit(this._getInputValues());
            
            this.close();
        });
    }
}
/**
 *           name="place-name" 
          required
        >
        <span id="input-place-name-error" class="popup__input-error"></span>
        <input
          id="input-image-link" 
          type="url" 
          placeholder="Ссылка на картинку" 
          class="popup__input popup__input_type_image-link" 
          name="image-link"
 * 
 */