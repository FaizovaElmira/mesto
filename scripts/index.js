const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const cardsContainer = document.querySelector(".photo__container");
const cardsTemplate = document.querySelector(".photo-template");

const popupEditProfile = document.querySelector(".popup_type_edit");
const nameInput = popupEditProfile.querySelector(".popup__input_type_name");
const professionInput = popupEditProfile.querySelector(".popup__input_type_profession");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const formElementEdit = popupEditProfile.querySelector(".popup__form_type_edit");
const buttonEdit = document.querySelector(".profile__button_type_edit");
const buttonEditClose = popupEditProfile.querySelector(".popup__button_type_close");

const popupAddCard = document.querySelector(".popup_type_add");
const formElementAdd = popupAddCard.querySelector(".popup__form_type_add");
const buttonAdd = document.querySelector(".profile__button_type_add");
const buttonAddClose = popupAddCard.querySelector(".popup__button_type_close");

const popupViewPhoto = document.querySelector(".popup_type_view");
const popupPhoto = popupViewPhoto.querySelector(".popup__photo");
const popupCaption = popupViewPhoto.querySelector(".popup__caption");
const buttonViewClose = popupViewPhoto.querySelector(".popup__button_type_close");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupEditProfile);
  evt.currentTarget.reset();
}
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const titleInput = formElementAdd.querySelector(".popup__input_type_title").value;
  const linkInput = formElementAdd.querySelector(".popup__input_type_link").value;
  const card = createCard({ name: titleInput, link: linkInput });
  cardsContainer.prepend(card);
  closePopup(popupAddCard);
  evt.currentTarget.reset();
}

function deleteCard(evt) {
  const card = evt.target.closest(".photo__item");
  card.remove();
}

formElementEdit.addEventListener("submit", handleEditFormSubmit);
formElementAdd.addEventListener("submit", handleAddFormSubmit);

buttonEdit.addEventListener("click", () => {
  openPopup(popupEditProfile);
});
buttonEditClose.addEventListener("click", () => {
  closePopup(popupEditProfile);
});
buttonAdd.addEventListener("click", () => {
  openPopup(popupAddCard);
});
buttonAddClose.addEventListener("click", () => {
  closePopup(popupAddCard);
});
buttonViewClose.addEventListener("click", () => {
  closePopup(popupViewPhoto);
});

renderCards();

function renderCards() {
  const html = initialCards.map(createCard);
  cardsContainer.append(...html);
}
function createCard(item) {
  const cardElements = cardsTemplate.content.cloneNode(true);
  const cardName = cardElements.querySelector(".photo__title");
  const cardLink = cardElements.querySelector(".photo__card");
  const deleteButton = cardElements.querySelector(".photo__trash");
  const likeButton = cardElements.querySelector(".photo__like");

  cardName.textContent = item.name;
  cardLink.src = item.link;
  cardLink.alt = item.name;

  deleteButton.addEventListener("click", deleteCard);

  likeButton.addEventListener("click", function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle("photo__like_active");
  });

  cardLink.addEventListener ('click', function(evt) {
    popupPhoto.src = evt.target.src;
    popupPhoto.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openPopup(popupViewPhoto);
  })

  return cardElements;
}




