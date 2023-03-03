import { openPopup, popupViewPhoto } from "./constants.js";
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
    this._element.querySelector(".photo__card").src = this._link;
    this._element.querySelector(".photo__title").textContent = this._name;
    this._element.querySelector(".photo__card").alt = this._name;
    this._setEventListeners();
    return this._element;
  }
  _handleDeleteCard() {
    this._element.remove();
  }
  _handleLikePost() {
    this._element
      .querySelector(".photo__like")
      .classList.toggle("photo__like_active");
  }
  _handleCardClick() {
    const popupPhoto = document.querySelector(".popup__photo");
    const popupCaption = document.querySelector(".popup__caption");
    popupPhoto.src = this._link;
    popupPhoto.alt = this._name;
    popupCaption.textContent = this._name;
    openPopup(popupViewPhoto);
  }
  _setEventListeners() {
    this._element
      .querySelector(".photo__trash")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._element
      .querySelector(".photo__like")
      .addEventListener("click", () => {
        this._handleLikePost();
      });

    this._element
      .querySelector(".photo__card")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }
}
