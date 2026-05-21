import "../pages/index.css";
import Api from "./Api.js";
import { enableValidation, resetValidation, toggleButtonState, config } from "./validation.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3c82b12d-fc7d-4800-aa85-212f245cfbe6",
    "Content-Type": "application/json"
  }
});

const profileEditButton = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAddButton = document.querySelector(".profile__add-btn");
const profileAvatar = document.querySelector(".profile__avatar");
const profileAvatarBtn = document.querySelector(".profile__avatar-btn");

const editModal = document.querySelector("#edit-modal");
const editFormElement = editModal.querySelector(".modal__form");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalSubmitBtn = editModal.querySelector(".modal__submit-btn");

const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const cardFormSubmitButton = cardModal.querySelector(".modal__submit-btn");
const cardNameInput = document.querySelector("#add-card-caption-input");
const cardLinkInput = document.querySelector("#add-card-link-input");

const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".cards__list");

const imagePreviewModal = document.querySelector("#image-preview-modal");
const imagePreviewCaption = imagePreviewModal.querySelector(".modal__preview-caption");
const imagePreviewElement = imagePreviewModal.querySelector(".modal__preview-image");
const imagePreviewCloseBtn = imagePreviewModal.querySelector(".modal__close-btn");

const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarForm = editAvatarModal.querySelector(".modal__form");
const editAvatarCloseBtn = editAvatarModal.querySelector(".modal__close-btn");
const editAvatarSubmitBtn = editAvatarModal.querySelector(".modal__submit-btn");
const avatarLinkInput = editAvatarModal.querySelector("#avatar-link-input");

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-btn");
const deleteCancelBtn = deleteModal.querySelector(".modal__cancel-btn");
const deleteSubmitBtn = deleteModal.querySelector(".modal__submit-btn");

let selectedCard = null;
let selectedCardId = null;

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey);
  modal.addEventListener("click", handleOverlayClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
  modal.removeEventListener("click", handleOverlayClick);
}

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) closeModal(openedModal);
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function setButtonLoading(button, isLoading, defaultText = "Save") {
  button.textContent = isLoading ? "Saving..." : defaultText;
}

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(editFormElement, config);
  openModal(editModal);
});

editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

profileAvatarBtn.addEventListener("click", () => {
  editAvatarForm.reset();
  openModal(editAvatarModal);
});

editAvatarCloseBtn.addEventListener("click", () => {
  closeModal(editAvatarModal);
});

editAvatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  setButtonLoading(editAvatarSubmitBtn, true);
  api.updateAvatar({ avatar: avatarLinkInput.value })
    .then((userData) => {
      profileAvatar.src = userData.avatar;
      closeModal(editAvatarModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonLoading(editAvatarSubmitBtn, false);
    });
});

profileAddButton.addEventListener("click", () => {
  openModal(cardModal);
});

cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});

cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  setButtonLoading(cardFormSubmitButton, true);
  api.addCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  })
  .then((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsList.prepend(cardElement);
    closeModal(cardModal);
    cardForm.reset();
    toggleButtonState([cardNameInput, cardLinkInput], cardFormSubmitButton, config);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    setButtonLoading(cardFormSubmitButton, false);
  });
});

editFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  setButtonLoading(editModalSubmitBtn, true);
  api.editUserInfo({
    name: editModalNameInput.value,
    about: editModalDescriptionInput.value,
  })
  .then((userData) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    closeModal(editModal);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    setButtonLoading(editModalSubmitBtn, false);
  });
});

deleteModalCloseBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteCancelBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  setButtonLoading(deleteSubmitBtn, true, "Yes, delete");
  api.removeCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonLoading(deleteSubmitBtn, false, "Yes, delete");
    });
});

function openImagePreview(src, alt) {
  imagePreviewElement.src = src;
  imagePreviewElement.alt = alt;
  imagePreviewCaption.textContent = alt;
  openModal(imagePreviewModal);
}

imagePreviewCloseBtn.addEventListener("click", () => {
  closeModal(imagePreviewModal);
});

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true).querySelector(".card");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-btn");
  const deleteButton = cardElement.querySelector(".card__delete-btn");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  if (data.isLiked) {
    likeButton.classList.add("card__like-btn_liked");
  }

  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains("card__like-btn_liked");
    const likeAction = isLiked ? api.dislikeCard(data._id) : api.likeCard(data._id);
    likeAction
      .then(() => {
        likeButton.classList.toggle("card__like-btn_liked");
      })
      .catch((err) => {
        console.error(err);
      });
  });

  deleteButton.addEventListener("click", () => {
    selectedCard = cardElement;
    selectedCardId = data._id;
    openModal(deleteModal);
  });

  cardImage.addEventListener("click", () => {
    openImagePreview(data.link, data.name);
  });

  return cardElement;
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.src = userData.avatar;

    cards.forEach((cardData) => {
      const cardElement = getCardElement(cardData);
      cardsList.append(cardElement);
    });
  })
  .catch((err) => {
    console.error(err);
  });

enableValidation(config);