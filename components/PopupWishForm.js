import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor( popupSelector,{ handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
      //  console.log(this._handleFormSubmit);
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._inputList = Array.from(this._popupElement.querySelectorAll('.popup__input'));
      
    }

    _getInputValues() {
        
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
    
        return this._formValues;
    }

    addInputValues(userData) {
      this._inputList.forEach((inputElement, num) => {
        const inputName = inputElement.getAttribute('name');
        if (inputName === Object.keys(userData)[num]) {
          inputElement.value = userData[inputName].textContent;
        }
      })
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
          //  console.log(this._getInputValues());
          // функция создания карточки, принимает объект с значениями инпутов
            this._handleFormSubmit(this._getInputValues());
            
            this.close();
        });
    }
}
