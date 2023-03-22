export class FormValidator {
    constructor(confiValidation, formElement) {
        this._formSelector = confiValidation.formSelector;
        this._inputSelector = confiValidation.inputSelector;
        this._submitButtonSelector = confiValidation.submitButtonSelector;
        this._inactiveButtonClass  = confiValidation.inactiveButtonClass;
        this._inputErrorClass = confiValidation.inputErrorClass; 
        this._errorClass = confiValidation.errorClass;
        this._formElement = formElement; 
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    enableValidation() {  
        this._setEventsListener();
    };

    _setEventsListener() {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
              this._toggleButtonState();
              this._checkInputValidity(inputElement);
          });
      });
    };

    _checkInputValidity(inputElement) {
      const errorElement = document.querySelector(`#${inputElement.id}-error`);
      if (inputElement.validity.valid) {
        this._handleValidForm(inputElement, errorElement);
      } else {
        this._handleNotValidForm(inputElement, errorElement);
      }
    };
    
    _handleNotValidForm(inputElement, errorElement) {
      inputElement.classList.add(this._inputErrorClass);
      errorElement.classList.add(this._errorClass);
      errorElement.textContent = inputElement.validationMessage;
    };
  
    _handleValidForm(inputElement, errorElement) {
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
    };

    _hasInvalidInput = () => {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    };
  
    _toggleButtonState(){
      if (this._hasInvalidInput()) {
        this._disableButton();
      } else {
        this._activateButton();
      }
    };

    checkValidation(){
      this._toggleButtonState();
  
      this._inputList.forEach((inputElement) => {
        const errorElement = document.querySelector(`#${inputElement.id}-error`); 
        this._handleValidForm(inputElement, errorElement);
      });
    };
  
    _disableButton() {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._inactiveButtonClass);
    }    
  
    _activateButton() {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
}


