import "./index.css";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  initialCards,
  config,
  formElementEdit,
  formElementAdd,
  inputName,
  inputAbout,
  buttonAdd,
  buttonEdit,
} from "../utils/constants.js";

function createCard(data) {
  const card = new Card(data, ".photo-template", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);
      cardList.addItem(cardElement);
    },
  },
  ".photo__container"
);

cardList.renderedItems();

const popupWithImage = new PopupWithImage(".popup_type_view");
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

const formEditValidator = new FormValidator(config, formElementEdit);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(config, formElementAdd);
formAddValidator.enableValidation();

const userInfo = new UserInfo(".profile__name", ".profile__about");

const popupEditProfile = new PopupWithForm(".popup_type_edit", {
  handleFormSubmit: (values) => {
    userInfo.setUserInfo(values);
  },
});

popupEditProfile.setEventListeners();

buttonEdit.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputAbout.value = userData.about;
  formEditValidator.resetValidation();
  popupEditProfile.open();
});

const popupAddCard = new PopupWithForm(".popup_type_add", {
  handleFormSubmit: ({ title, link }) => {
    cardList.addNewItem(createCard({ name: title, link }));
  },
});
popupAddCard.setEventListeners();

buttonAdd.addEventListener("click", () => {
  popupAddCard.open();
  formAddValidator.resetValidation();
});
