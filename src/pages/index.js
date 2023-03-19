import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { initialCards, config } from "../utils/constants.js";
import { openPopup, closePopup } from "../utils/utils.js";

const cardsContainer = document.querySelector(".photo__container");
const popupEditProfile = document.querySelector(".popup_type_edit");
const formElementEdit = document.forms.formElementEdit;
const inputName = formElementEdit.elements.name;
const inputAbout = formElementEdit.elements.about;
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const popupAddCard = document.querySelector(".popup_type_add");
const formElementAdd = document.forms.formElementAdd;
const inputTitle = formElementAdd.elements.title;
const inputLink = formElementAdd.elements.link;

const buttonEdit = document.querySelector(".profile__button_type_edit");
const buttonAdd = document.querySelector(".profile__button_type_add");

const formEditValidator = new FormValidator(config, formElementEdit);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(config, formElementAdd);
formAddValidator.enableValidation();

initialCards.forEach((item) => {
  const card = new Card(item, ".photo-template");
  const cardElement = card.generateCard();
  document.querySelector(".photo__container").append(cardElement);
});

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupEditProfile);
};
const handleAddFormSubmit = (evt) => {
  evt.preventDefault();
  const cardNew = new Card(
    { name: inputTitle.value, link: inputLink.value },
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
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  formEditValidator.resetValidation();
});

buttonAdd.addEventListener("click", () => {
  openPopup(popupAddCard);
  formAddValidator.resetValidation();
});

