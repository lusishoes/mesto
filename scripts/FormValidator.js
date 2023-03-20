export class FormValidator {
    constructor(confiValidation, formElement) {
        this._formSelector = confiValidation.formSelector;
        this._inputSelector = confiValidation.inputSelector;
        this._submitButtonSelector = confiValidation.submitButtonSelector;
        this._inactiveButtonClass  = confiValidation.inactiveButtonClass;
        this._inputErrorClass = confiValidation.inputErrorClass; 
        this._errorClass = confiValidation.errorClass;
        this._formElement = formElement; 
    }

    enableValidation() {  
        this._setEventsListener(this._formElement);
    };

    _setEventsListener(formElement) {
      const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
      const buttonElement = formElement.querySelector(this._submitButtonSelector);
      this._toggleButtonState(inputList, buttonElement);
      inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
              this._toggleButtonState(inputList, buttonElement);
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

    _hasInvalidInput = (inputList) => {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    };
  
    _toggleButtonState(inputList, buttonElement){
      if (this._hasInvalidInput(inputList)) {
        this._toggleButtonDisabled(buttonElement);
      } else {
        this._toggleButtonActive(buttonElement);
      }
    };

    checkValidation(formElement){
      const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
      const buttonElement =  formElement.querySelector('.popup__button');
      this._toggleButtonState(inputList, buttonElement);
  
      inputList.forEach((inputElement) => {
        const errorElement = document.querySelector(`#${inputElement.id}-error`);
        this._handleValidForm(inputElement, errorElement);
      });
    };
  
    _toggleButtonDisabled(buttonElement) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(this._inactiveButtonClass);
    }    
  
    _toggleButtonActive(buttonElement) {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
}


