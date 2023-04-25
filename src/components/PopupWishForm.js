import Popup from './Popup.js';

export class PopupWithForm extends Popup{
    constructor( popupSelector,{ handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._inputList = Array.from(this._popupElement.querySelectorAll('.popup__input'));
        this._formValues = {};
        this._submitButton = this._popupElement.querySelector('.popup__button');
        
    }

    _getInputValues() {
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
            const initialText = this._submitButton.textContent;
            this._submitButton.textContent = 'Сохранение...';
            e.preventDefault();
            console.log(this._getInputValues());
          // функция создания карточки, принимает объект с значениями инпутов
            this._handleFormSubmit(this._getInputValues())
                // .then(() => console.log('все ок'))
                .then(() => console.log('все ок')) //this.close()
                .catch((err) => console.log(`все не ок, ошибка: ${err}`))
                .finally(() => {
                  this._submitButton.textContent = initialText;
                })
        });
    }
}
