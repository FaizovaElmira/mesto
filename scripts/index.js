const cardsContainer = document.querySelector(".photo__container");
const cardsTemplate = document.querySelector(".photo-template");

const popupEditProfile = document.querySelector(".popup_type_edit");
const formElementEdit = document.forms.formElementEdit;
const nameInput = formElementEdit.elements.name;
const professionInput = formElementEdit.elements.profession;
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

const popupAddCard = document.querySelector(".popup_type_add");
const formElementAdd = document.forms.formElementAdd;
const titleInput = formElementAdd.elements.title;
const linkInput = formElementAdd.elements.link;

const buttonEdit = document.querySelector(".profile__button_type_edit");
const buttonEditClose = popupEditProfile.querySelector(".popup__button_type_close");
const buttonAdd = document.querySelector(".profile__button_type_add");
const buttonAddClose = popupAddCard.querySelector(".popup__button_type_close");

const popupViewPhoto = document.querySelector(".popup_type_view");
const popupPhoto = popupViewPhoto.querySelector(".popup__photo");
const popupCaption = popupViewPhoto.querySelector(".popup__caption");
const buttonViewClose = popupViewPhoto.querySelector(".popup__button_type_close");

const overlays = Array.from(document.querySelectorAll(".popup"));

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscape);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscape);
};

const handleEscape = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupEditProfile);
};

const handleAddFormSubmit = (evt) => {
  evt.preventDefault();
  const card = createCard({ name: titleInput.value, link: linkInput.value });
  cardsContainer.prepend(card);
  evt.currentTarget.reset();
  closePopup(popupAddCard);
};

const deleteCard = (evt) => {
  const card = evt.target.closest(".photo__item");
  card.remove();
};
formElementEdit.addEventListener("submit", handleEditFormSubmit);
formElementAdd.addEventListener("submit", handleAddFormSubmit);

buttonEdit.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
});
buttonAdd.addEventListener("click", () => {
  openPopup(popupAddCard);
});
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__button_type_close")) {
      closePopup(popup);
    }
  });
});
const renderCards = () => {
  const html = initialCards.map(createCard);
  cardsContainer.append(...html);
};
const createCard = (item) => {
  const cardElements = cardsTemplate.content.cloneNode(true);
  const cardName = cardElements.querySelector(".photo__title");
  const cardImage = cardElements.querySelector(".photo__card");
  const deleteButton = cardElements.querySelector(".photo__trash");
  const likeButton = cardElements.querySelector(".photo__like");
  cardName.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", (evt) => {
    const eventTarget = evt.target;
    eventTarget.classList.toggle("photo__like_active");
  });
  cardImage.addEventListener("click", (evt) => {
    popupPhoto.src = evt.target.src;
    popupPhoto.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openPopup(popupViewPhoto);
  });
  return cardElements;
};
renderCards();
