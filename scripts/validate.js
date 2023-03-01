function enableValidation (config) {  
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      setEventsListener(formElement, config);
    });
  };

  function setEventsListener(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            toggleButtonState(inputList, buttonElement, config);
            checkInputValidity(inputElement, config);
        });
    });
  }   

function checkInputValidity(inputElement, config) {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  if (inputElement.validity.valid) {
      handleValidForm(inputElement, config, errorElement);
  } else {
      handleNotValidForm(inputElement, config, errorElement);
  }
}  

  function handleNotValidForm(inputElement, config, errorElement) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
}

 function handleValidForm(inputElement, config, errorElement) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
      toggleButtonDisabled(buttonElement, config);
    } else {
      toggleButtonActive(buttonElement, config);
    }
  };

  const checkValidation = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement =  formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
      const errorElement = document.querySelector(`#${inputElement.id}-error`);
      handleValidForm(inputElement, config, errorElement);
    });
  };

  function toggleButtonDisabled(buttonElement, config) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(config.inactiveButtonClass);
  }    

  function toggleButtonActive(buttonElement, config) {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(config.inactiveButtonClass);
  }

const confiValidation = { 
    formSelector : '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector : '.popup__button', 
    inactiveButtonClass : 'popup__button_type_disabled',
    inputErrorClass : 'popup__input_type_error', 
    errorClass : 'popup__input-error_type_active',
};

  enableValidation(confiValidation);

