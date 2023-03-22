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
  buttonEdit } from "../utils/constants.js";

const cardList = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data, '.photo-template', handleCardClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, '.photo__container');

cardList.renderedItems(); 

const popupWithImage = new PopupWithImage('.popup_type_view');
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link)
};

const formEditValidator = new FormValidator(config, formElementEdit);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(config, formElementAdd);
formAddValidator.enableValidation();

const userInfo = new UserInfo('.profile__name', '.profile__about');

const popupEditProfile = new PopupWithForm('.popup_type_edit', {
    handleFormSubmit: () => {
      userInfo.setUserInfo(popupEditProfile._getInputValues());
  }
});

popupEditProfile.setEventListeners();

buttonEdit.addEventListener("click", () => {
  const userData = userInfo.getUserInfo()
  inputName.value = userData.name;
  inputAbout.value = userData.about;
  formEditValidator.resetValidation();
  popupEditProfile.open();
});

const popupAddCard = new PopupWithForm('.popup_type_add', {
  handleFormSubmit: (formData) => {
    const { title, link } = formData;
    const card = new Card({ name: title, link }, '.photo-template', handleCardClick);
    const cardElement = card.generateCard();
    cardList.addNewItem(cardElement);
  }
});
popupAddCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
  popupAddCard.open()
  formAddValidator.resetValidation();
});
