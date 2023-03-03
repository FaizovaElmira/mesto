import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards, config } from "./constants.js";
import { openPopup, closePopup } from "./utils.js";

const cardsContainer = document.querySelector(".photo__container");
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
const buttonAdd = document.querySelector(".profile__button_type_add");

const editProfileFormValidator = new FormValidator(config, formElementEdit);
editProfileFormValidator.enableValidation();

const AddCardFormValidator = new FormValidator(config, formElementAdd);
AddCardFormValidator.enableValidation();

initialCards.forEach((item) => {
  const card = new Card(item, ".photo-template");
  const cardElement = card.generateCard();
  document.querySelector(".photo__container").append(cardElement);
});

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupEditProfile);
};
const handleAddFormSubmit = (evt) => {
  evt.preventDefault();
  const cardNew = new Card(
    { name: titleInput.value, link: linkInput.value },
    ".photo-template"
  );
  const cardGenerated = cardNew.generateCard();
  cardsContainer.prepend(cardGenerated);
  evt.currentTarget.reset();
  closePopup(popupAddCard);
};

formElementEdit.addEventListener("submit", handleEditFormSubmit);
formElementAdd.addEventListener("submit", handleAddFormSubmit);

buttonEdit.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
  editProfileFormValidator.resetValidation();
});

buttonAdd.addEventListener("click", () => {
  openPopup(popupAddCard);
  AddCardFormValidator.resetValidation();
});

const forms = Array.from(document.querySelectorAll(config.formSelector));
forms.forEach((form) => {
  const validator = new FormValidator(config, form);
  validator.enableValidation();
});
