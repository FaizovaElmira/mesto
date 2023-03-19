import {
  openPopup,
  popupViewPhoto,
  popupPhoto,
  popupCaption,
} from "../utils/utils.js";

export class Card {
  constructor(item, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = item.name;
    this._link = item.link;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".photo__item")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._photoCard = this._element.querySelector(".photo__card");
    this._photoTitle = this._element.querySelector(".photo__title");
    this._photoLike = this._element.querySelector(".photo__like");
    this._photoTrash = this._element.querySelector(".photo__trash");
    this._photoCard.src = this._link;
    this._photoCard.alt = this._name;
    this._photoTitle.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikePost() {
    this._photoLike.classList.toggle("photo__like_active");
  }

  _handleCardClick() {
    popupPhoto.src = this._link;
    popupPhoto.alt = this._name;
    popupCaption.textContent = this._name;
    openPopup(popupViewPhoto);
  }

  _setEventListeners() {
    this._photoTrash.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._photoLike.addEventListener("click", () => {
      this._handleLikePost();
    });

    this._photoCard.addEventListener("click", () => {
      this._handleCardClick();
    });
  }
}
