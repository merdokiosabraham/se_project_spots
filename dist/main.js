/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/index.js"
/*!**************************!*\
  !*** ./scripts/index.js ***!
  \**************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\nconst initialCards = [\n  {\n    name: \"Val Thorens\",\n    link: \"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg\",\n  },\n  {\n    name: \"Restaurant terrace\",\n    link: \"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg\",\n  },\n  {\n    name: \"An outdoor cafe\",\n    link: \"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg\",\n  },\n  {\n    name: \"A very long bridge, over the forest and through the trees\",\n    link: \"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg\",\n  },\n  {\n    name: \"Tunnel with morning light\",\n    link: \"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg\",\n  },\n  {\n    name: \"Mountain house\",\n    link: \"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg\",\n  },\n];\n\nconst profileEditButton = document.querySelector(\".profile__edit-btn\");\nconst profileName = document.querySelector(\".profile__name\");\nconst profileDescription = document.querySelector(\".profile__description\");\nconst profileAddButton = document.querySelector(\".profile__add-btn\");\n\nconst editModal = document.querySelector(\"#edit-modal\");\nconst editFormElement = editModal.querySelector(\".modal__form\");\nconst editModalCloseBtn = editModal.querySelector(\".modal__close-btn\");\n\nconst editModalNameInput = editModal.querySelector(\"#profile-name-input\");\nconst editModalDescriptionInput = editModal.querySelector(\n  \"#profile-description-input\"\n);\n\nconst cardModal = document.querySelector(\"#add-card-modal\");\nconst cardForm = cardModal.querySelector(\".modal__form\");\nconst cardModalCloseBtn = cardModal.querySelector(\".modal__close-btn\");\nconst cardFormSubmitButton = cardModal.querySelector(\".modal__submit-btn\");\nconst cardNameInput = document.querySelector(\"#add-card-caption-input\");\nconst cardLinkInput = document.querySelector(\"#add-card-link-input\");\n\nconst cardTemplate = document.querySelector(\"#card-template\").content;\nconst cardsList = document.querySelector(\".cards__list\");\n\nconst imagePreviewModal = document.querySelector(\"#image-preview-modal\");\nconst imagePreviewCaption = imagePreviewModal.querySelector(\".modal__preview-caption\");\nconst imagePreviewElement = imagePreviewModal.querySelector(\".modal__preview-image\");\nconst imagePreviewCloseBtn = imagePreviewModal.querySelector(\".modal__close-btn\");\n\nfunction openModal(modal) {\n  modal.classList.add(\"modal_opened\");\n  document.addEventListener(\"keydown\", handleEscapeKey);\n  modal.addEventListener(\"click\", handleOverlayClick);\n}\n\nfunction closeModal(modal) {\n  modal.classList.remove(\"modal_opened\");\n  document.removeEventListener(\"keydown\", handleEscapeKey);\n  modal.removeEventListener(\"click\", handleOverlayClick);\n}\n\nfunction handleEscapeKey(evt) {\n  if (evt.key === \"Escape\") {\n    const openedModal = document.querySelector(\".modal_opened\");\n    if (openedModal) closeModal(openedModal);\n  }\n}\n\nfunction handleOverlayClick(evt) {\n  if (evt.target.classList.contains(\"modal\")) {\n    closeModal(evt.target);\n  }\n}\n\nprofileEditButton.addEventListener(\"click\", () => {\n  editModalNameInput.value = profileName.textContent;\n  editModalDescriptionInput.value = profileDescription.textContent;\n  resetValidation(editFormElement, config);\n  openModal(editModal);\n});\n\neditModalCloseBtn.addEventListener(\"click\", () => {\n  closeModal(editModal);\n});\n\nprofileAddButton.addEventListener(\"click\", () => {\n  openModal(cardModal);\n});\n\ncardModalCloseBtn.addEventListener(\"click\", () => {\n  closeModal(cardModal);\n});\n\ncardForm.addEventListener(\"submit\", (evt) => {\n  evt.preventDefault();\n  const cardData = {\n    name: cardNameInput.value,\n    link: cardLinkInput.value,\n  };\n  const cardElement = getCardElement(cardData);\n  cardsList.prepend(cardElement);\n  closeModal(cardModal);\n  cardForm.reset();\n  toggleButtonState([cardNameInput, cardLinkInput], cardFormSubmitButton, config);\n});\n\neditFormElement.addEventListener(\"submit\", (evt) => {\n  evt.preventDefault();\n  profileName.textContent = editModalNameInput.value;\n  profileDescription.textContent = editModalDescriptionInput.value;\n  closeModal(editModal);\n});\n\nfunction openImagePreview(src, alt) {\n  imagePreviewElement.src = src;\n  imagePreviewElement.alt = alt;\n  imagePreviewCaption.textContent = alt;\n  openModal(imagePreviewModal);\n}\n\nimagePreviewCloseBtn.addEventListener(\"click\", () => {\n  closeModal(imagePreviewModal);\n});\n\nfunction getCardElement(data) {\n  const cardElement = cardTemplate.cloneNode(true).querySelector(\".card\");\n  const cardImage = cardElement.querySelector(\".card__image\");\n  const cardTitle = cardElement.querySelector(\".card__title\");\n  const likeButton = cardElement.querySelector(\".card__like-btn\");\n  const deleteButton = cardElement.querySelector(\".card__delete-btn\");\n\n  cardImage.src = data.link;\n  cardImage.alt = data.name;\n  cardTitle.textContent = data.name;\n\n  likeButton.addEventListener(\"click\", () => {\n    likeButton.classList.toggle(\"card__like-btn_liked\");\n  });\n\n  deleteButton.addEventListener(\"click\", () => {\n    cardElement.remove();\n  });\n\n  cardImage.addEventListener(\"click\", () => {\n    openImagePreview(data.link, data.name);\n  });\n\n  return cardElement;\n}\n\ninitialCards.forEach((cardData) => {\n  const cardElement = getCardElement(cardData);\n  cardsList.append(cardElement);\n});\n\n//# sourceURL=webpack://project-3-spots/./scripts/index.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./scripts/index.js"](0,__webpack_exports__,__webpack_require__);
/******/ 	
/******/ })()
;