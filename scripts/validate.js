
// блок где я сделал объект с классами формы, инпута, ошибки интпута, кнопки
const formValidationConfig = {
    formSelector : '.popup__form',
    inputSelector: '.popup__input',
    errorClass : 'popup__input_type_error',
    buttonSelector : '.popup__button',
    buttonDisabledClass : 'popup__button_type_disabled',
    spanErrorActive : 'popup__input-error_type_active',
};
// вынес отмену стандартного поведения 
// function disableSubmit(e) {
//     e.preventDefault();
// }
// принимает объект 
function enableValidation(config) {
    // делает псевдомассив из форм
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    // каждой форме 
    formList.forEach((form) => {
        // form.addEventListener('submit', disableSubmit);
        // валидируем по мере ввода 
        form.addEventListener('input', () => {
            // вызываем функцию которой передаем объект с классами и конкретную форму 
            toggleButton(form, config);
        });
        addInputListeners(form, config);
        toggleButton(form, config);
    });
}

function handleFormInput(event, config) {
    // принимаем объект инпут
    const input = event.target;
    // находим айди
    const inputId = input.id;
    // находим span по айди
    const errorElement = document.querySelector(`#${inputId}-error`);
    // если инпут валиден
    if (input.validity.valid) {
        // если валиден удаляем класс подсветки инпута что ошибка
        input.classList.remove(config.errorClass);
        errorElement.classList.remove(config.spanErrorActive);
        // очищаем текст ошибки
        errorElement.textContent = '';
    } else {
        input.classList.add(config.errorClass);
        errorElement.classList.add(config.spanErrorActive);
        errorElement.textContent = input.validationMessage;
    }
}

function toggleButton(form, config) {
    const buttonSubmit = form.querySelector(config.buttonSelector);
    const isFormValid = form.checkValidity();
    
    console.log(form, isFormValid);
    buttonSubmit.disabled = !isFormValid;
    buttonSubmit.classList.toggle('popup__button_type_disabled', !isFormValid);
    console.log(buttonSubmit);
    console.log(isFormValid);
}

function addInputListeners(form, config) {
    // псевдомассив инпутов 
    const inputLists = Array.from(form.querySelectorAll(config.inputSelector));
    // для каждого инпута вешаем слушатель событий 
    inputLists.forEach((item) => {
        // слушаем ввод 
        item.addEventListener('input', (event) => {
            handleFormInput(event, config)
        });
    });
}

enableValidation(formValidationConfig);