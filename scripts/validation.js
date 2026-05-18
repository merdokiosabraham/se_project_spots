// Function to show input error
const showInputError = (formEl, inputEl, errorMsg, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  errorMsgEl.classList.add(config.errorClass);
  inputEl.classList.add(config.inputErrorClass);
};

// Function to hide input error
const hideInputError = (formEl, inputEl, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  errorMsgEl.classList.remove(config.errorClass);
  inputEl.classList.remove(config.inputErrorClass);
};

// Function to check input validity
const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};

// Function to toggle the submit button based on input validity
const toggleButtonState = (inputList, buttonElement, config) => {
  const hasInvalidInput = inputList.some((inputEl) => !inputEl.validity.valid);
  if (hasInvalidInput) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
    ``;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// Declare a resetValidation(formEl, inputList, config) menthod
//   iterate through the inputList.forEach((inputEl) => {
//  })
//     call hideInputError for each input

// Function to set event listeners on form inputs
const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config); // Set initial state

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputList, buttonElement, config); // Check button state on each input
    });
  });
};

// Function to enable validation for all forms
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault(); // Prevent default form submission
    });

    setEventListeners(formEl, config);
  });
};

const resetValidation = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  inputList.forEach((inputEl) => {
    checkInputValidity(formEl, inputEl, config);
  });
};

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Calling enableValidation with configuration object
enableValidation(config);
