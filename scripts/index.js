const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAddButton = document.querySelector(".profile__add-btn");

const editModal = document.querySelector("#edit-modal");
const editFormElement = editModal.querySelector(".modal__form");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");

const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const cardNameInput = document.querySelector("#add-card-caption-input");
const cardLinkInput = document.querySelector("#add-card-link-input");

const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".cards__list");

// Image Preview Modal Elements
const imagePreviewModal = document.querySelector("#image-preview-modal");
const imagePreviewCaption = imagePreviewModal.querySelector(
  ".modal__preview-caption"
);
const imagePreviewElement = imagePreviewModal.querySelector(
  ".modal__preview-image"
);
const imagePreviewCloseBtn =
  imagePreviewModal.querySelector(".modal__close-btn");

// Function to open any modal
function openModal(modal) {
  modal.classList.add("modal_opened");
}

// Function to close any modal
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

// Edit profile modal functions
profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  openModal(editModal);
});

editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

// New Post modal functions
profileAddButton.addEventListener("click", () => {
  openModal(cardModal);
});

cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});

// Handle form submission for adding a new card
cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement); // Add new card to the top of the list
  closeModal(cardModal); // Close the modal after submission
  cardForm.reset(); // Reset the form fields
});

// Handle form submission for editing profile
editFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
});

// Function to open the image preview modal
function openImagePreview(src, alt) {
  imagePreviewElement.src = src;
  imagePreviewElement.alt = alt;
  imagePreviewCaption.textContent = alt;
  openModal(imagePreviewModal);
}

// Close image preview modal
imagePreviewCloseBtn.addEventListener("click", () => {
  closeModal(imagePreviewModal);
});

// Function to create a new card element
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true).querySelector(".card");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-btn");
  const deleteButton = cardElement.querySelector(".card__delete-btn");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  // Like button functionality
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-btn_liked");
  });

  // Delete button functionality
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  // Add event listener to open image preview modal
  cardImage.addEventListener("click", () => {
    openImagePreview(data.link, data.name);
  });

  return cardElement;
}

// Initial rendering of cards
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.append(cardElement);
});
