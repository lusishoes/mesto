
// блок где я сделал объект с классами формы, инпута, ошибки интпута, кнопки
confiValidation = { //formValidationConfig
    formSelector : '.popup__form', //formSelector
    inputSelector: '.popup__input', // inputSelector
    submitButtonSelector : '.popup__button', // buttonSelector
    inactiveButtonClass : 'popup__button_type_disabled', // buttonDisabledClass
    inputErrorClass : 'popup__input_type_error', // errorClass
    errorClass : 'popup__input-error_type_active', // spanErrorActive
};

function enableValidation (config) {  
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      setEventsListener(formElement, config);
    });
  };

  function setEventsListener(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            toggleButtonState(inputList, buttonElement, config);
            handleFormInput(inputElement, config);
        });
    });
}

  function handleFormInput(inputElement, config) {
        // const input = event.target;
        const inputId = inputElement.id;
        const errorElement = document.querySelector(`#${inputId}-error`);
        if (inputElement.validity.valid) {
            handleValidForm(inputElement, config, errorElement);
        } else {
            handleInvalidForm(inputElement, config, errorElement);
        }
    }

  function handleInvalidForm(inputElement, config, errorElement) {
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
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(config.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(config.inactiveButtonClass);
    }
  };

  enableValidation(confiValidation);



// function setEventsListener(config) {
//     const formList = Array.from(document.querySelectorAll(config.formSelector));

//     formList.forEach((form) => {
//         form.addEventListener('input', () => {
//             toggleButton(form, config);
//         });
//         addInputListeners(form, config);
//         toggleButton(form, config);
//     });
// }
// // проверка валидности инпута
// function handleFormInput(event, config) {
//     const input = event.target;
//     const inputId = input.id;
//     const errorElement = document.querySelector(`#${inputId}-error`);
//     if (input.validity.valid) {
//         handleValidForm(input, config, errorElement);
//     } else {
//         handleInvalidForm(input, config, errorElement);
//     }
// }
// // св-а не валидна 
// function handleInvalidForm(input, config, errorElement) {
//     input.classList.add(config.inputErrorClass);
//     errorElement.classList.add(config.errorClass);
//     errorElement.textContent = input.validationMessage;
// }
// // св-а валидна 
// function handleValidForm(input, config, errorElement) {
//     input.classList.remove(config.inputErrorClass);
//     errorElement.classList.remove(config.errorClass);
//     errorElement.textContent = '';
// }
// // переключение кнопки
// function toggleButton(form, config) {
//     const buttonSubmit = form.querySelector(config.submitButtonSelector);
//     const isFormValid = form.checkValidity();
//     buttonSubmit.disabled = !isFormValid;
//     buttonSubmit.classList.toggle(config.inactiveButtonClass, !isFormValid); // 'popup__button_type_disabled'
// }

// function addInputListeners(form, config) {
//     const inputLists = Array.from(form.querySelectorAll(config.inputSelector));
//     inputLists.forEach((item) => {
//         item.addEventListener('input', (event) => {
//             handleFormInput(event, config)
//         });
//     });
// }













// // слушатель на инпуты 
// function setEventsListener(config) {

//     const inputList = Array.from(document.querySelectorAll(config.inputSelector));
//     const buttonSubmit = form.querySelector(config.submitButtonSelector);
//     // каждой форме 
//     inputList.forEach((inputElement) => {
//         // form.addEventListener('submit', disableSubmit);
//         // валидируем по мере ввода 
//         inputElement.addEventListener('input', () => {
//             // вызываем функцию которой передаем объект с классами и конкретную форму 
//             handleFormInput(inputElement, config)
//             toggleButton(form, config);
//         });
//         addInputListeners(form, config);
//         toggleButton(form, config);
//     });
// }
// // ВЫВОДИМ СООБЩЕНИЕ ОБ ОШИБКЕ ДЛЯ ИНПУТОВ И СПАНОВ
// function handleFormInput(event, config) {
//     // принимаем объект инпут
//     const input = event.target;
//     // находим айди
//     const inputId = input.id;
//     // находим span по айди
//     const errorElement = document.querySelector(`#${inputId}-error`);
//     // если инпут валиден
//     if (input.validity.valid) {
//         // если валиден удаляем класс подсветки инпута что ошибка
//         handleValidForm(input, config, errorElement);
//     } else {
//         // если не валиден
//         // добавляем подсветку инпута что ошибка
//         handleInvalidForm(input, config, errorElement);
//     }
// }
// // стили не для валидного 
// function handleInvalidForm(input, config, errorElement) {
//     input.classList.add(config.inputErrorClass);
//     // подсветка span что ошибка
//     errorElement.classList.add(config.errorClass);
//     // присваиваем текст ошибки span-у 
//     errorElement.textContent = input.validationMessage;
// }
// // стили для валидного 
// function handleValidForm(input, config, errorElement) {
//     input.classList.remove(config.inputErrorClass);
//     errorElement.classList.remove(config.errorClass);
//     // очищаем текст ошибки
//     errorElement.textContent = '';
// }

// // ПРОВЕРКА КНОПКИ 
// // принимаем конкретнкую форму и объект 
// function toggleButton(form, config) {
//     // находим кнопку из формы 
   
//     // проверяем валидность всей формы 
//     const isFormValid = form.checkValidity();

//     buttonSubmit.disabled = !isFormValid;
//     buttonSubmit.classList.toggle(config.inactiveButtonClass, !isFormValid); // 'popup__button_type_disabled'
// }

// function addInputListeners(form, config) {
//         // псевдомассив инпутов 
//         const inputLists = Array.from(form.querySelectorAll(config.inputSelector));
//         // для каждого инпута вешаем слушатель событий 
//         inputLists.forEach((item) => {
//             // слушаем ввод 
//             item.addEventListener('input', (event) => {
//                 handleFormInput(event, config)
//             });
//         });
//     }

///////////////////////////////////////////////////////////////////////////




// // принимает объект 
// function setEventsListener(config) {
//     // делает псевдомассив из форм
//     const formList = Array.from(document.querySelectorAll(config.formSelector));
//     // каждой форме 
//     formList.forEach((form) => {
//         // form.addEventListener('submit', disableSubmit);
//         // валидируем по мере ввода 
//         form.addEventListener('input', () => {
//             // вызываем функцию которой передаем объект с классами и конкретную форму 
//             toggleButton(form, config);
//         });
//         addInputListeners(form, config);
//         toggleButton(form, config);
//     });
// }
// // ВЫВОДИМ СООБЩЕНИЕ ОБ ОШИБКЕ ДЛЯ ИНПУТОВ И СПАНОВ
// function handleFormInput(event, config) {
//     // принимаем объект инпут
//     const input = event.target;
//     // находим айди
//     const inputId = input.id;
//     // находим span по айди
//     const errorElement = document.querySelector(`#${inputId}-error`);
//     // если инпут валиден
//     if (input.validity.valid) {
//         // если валиден удаляем класс подсветки инпута что ошибка
//         handleValidForm(input, config, errorElement);
//     } else {
//         // если не валиден
//         // добавляем подсветку инпута что ошибка
//         handleInvalidForm(input, config, errorElement);
//     }
// }
// function handleInvalidForm(input, config, errorElement) {
//     input.classList.add(config.inputErrorClass);
//     // подсветка span что ошибка
//     errorElement.classList.add(config.errorClass);
//     // присваиваем текст ошибки span-у 
//     errorElement.textContent = input.validationMessage;
// }

// function handleValidForm(input, config, errorElement) {
//     input.classList.remove(config.inputErrorClass);
//     errorElement.classList.remove(config.errorClass);
//     // очищаем текст ошибки
//     errorElement.textContent = '';
// }

// // ПРОВЕРКА КНОПКИ 
// // принимаем конкретнкую форму и объект 
// function toggleButton(form, config) {
//     // находим кнопку из формы 
//     const buttonSubmit = form.querySelector(config.submitButtonSelector);
//     // проверяем валидность всей формы 
//     const isFormValid = form.checkValidity();

//     buttonSubmit.disabled = !isFormValid;
//     buttonSubmit.classList.toggle(config.inactiveButtonClass, !isFormValid); // 'popup__button_type_disabled'
// }
// // ВЕШАЕМ СЛУШАТЕЛЕЙ НА КАЖДЫЙ ИНПУТ 
// function addInputListeners(form, config) {
//     // псевдомассив инпутов 
//     const inputLists = Array.from(form.querySelectorAll(config.inputSelector));
//     // для каждого инпута вешаем слушатель событий 
//     inputLists.forEach((item) => {
//         // слушаем ввод 
//         item.addEventListener('input', (event) => {
//             handleFormInput(event, config)
//         });
//     });
// }

// setEventsListener(confiValidation);
