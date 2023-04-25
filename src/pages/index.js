import "./index.css";
import { Api } from "../components/Api.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  config,
  formElementEdit,
  formElementAdd,
  formElementAvatar,
  inputName,
  inputAbout,
  addCardButton,
  profileEditButton,
  profileAvatarButton,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-65/",
  headers: {
    authorization: "5d4b4f2c-8537-45c3-b70b-2e2dac143126",
    "Content-Type": "application/json",
  },
});

let userId = null;

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__about",
  ".profile__avatar"
);

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardList.renderItems(cards, userData._id);
  })
  .catch((err) => {
    console.log(err);
  });

const formEditValidator = new FormValidator(config, formElementEdit);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(config, formElementAdd);
formAddValidator.enableValidation();
const formAvatarValidator = new FormValidator(config, formElementAvatar);
formAvatarValidator.enableValidation();

const cardList = new Section(
  {
    renderer: (cards) => {
      const newCard = createCard(cards);
      cardList.addItem(newCard);
    },
  },
  ".photo__container"
);

const createCard = (data) => {
  const card = new Card(
    data,
    userId,
    ".photo-template",
    handleCardClick,
    handleDeleteCard,
    handleLikeClick
  );
  return card.generateCard();
};

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
};

const handleLikeClick = (card) => {
  const isLiked = card.isLiked(card.likes);
  api
    .toggleLike(card._cardId, isLiked)
    .then((res) => {
      card.toggleLike(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const popupWithImage = new PopupWithImage(".popup_type_view");
popupWithImage.setEventListeners();

const popupChangeAvatar = new PopupWithForm(".popup_type_avatar", {
  handleFormSubmit: ({ avatar }) => {
    popupChangeAvatar.renderLoading(true, "Сохранение...");
    api
      .updateAvatar({ avatar })
      .then((res) => {
        userInfo.setUserInfo(res);
        popupChangeAvatar.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupChangeAvatar.renderLoading(false);
      });
  },
});

profileAvatarButton.addEventListener("click", () => {
  popupChangeAvatar.open();
  formAvatarValidator.resetValidation();
});

const popupAddCard = new PopupWithForm(".popup_type_add", {
  handleFormSubmit: ({ title, link }) => {
    popupAddCard.renderLoading(true, "Создание...");
    api
      .addCard({ name: title, link })
      .then((data) => {
        cardList.addItem(createCard(data));
        popupAddCard.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupAddCard.renderLoading(false);
      });
  },
});

addCardButton.addEventListener("click", () => {
  popupAddCard.open();
  formAddValidator.resetValidation();
});

const handleDeleteCard = (card) => {
  popupDeleteCard.open(card);
};

const popupDeleteCard = new PopupWithConfirmation(".popup_type_delete", {
  handleFormSubmit: (card) => {
    popupDeleteCard.renderLoading(true, "Удаление...");
    api
      .deleteCard(card._cardId)
      .then((res) => {
        card.deleteCard(res._cardId);
        popupDeleteCard.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupDeleteCard.renderLoading(false);
      });
  },
});

const popupEditProfile = new PopupWithForm(".popup_type_edit", {
  handleFormSubmit: ({ name, about }) => {
    popupEditProfile.renderLoading(true, "Сохранение...");
    api
      .editUserInfo({ name, about })
      .then((data) => {
        userInfo.setUserInfo(data);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupEditProfile.renderLoading(false);
      });
  },
});

profileEditButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  inputName.value = name;
  inputAbout.value = about;
  formEditValidator.resetValidation();
  popupEditProfile.open();
});

popupEditProfile.setEventListeners();
popupChangeAvatar.setEventListeners();
popupAddCard.setEventListeners();
popupDeleteCard.setEventListeners();
