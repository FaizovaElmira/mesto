export class Card {
  constructor(
    data,
    userId,
    cardSelector,
    handleCardClick,
    handleDeleteCard,
    handleLikeClick
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this.likes = data.likes;
    this._likesCounter = data.likes.length;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
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
    this._likeCounter = this._element.querySelector(".photo__like-counter");
    this._photoTrash = this._element.querySelector(".photo__trash");

    this._photoCard.src = this._link;
    this._photoCard.alt = this._name;
    this._photoTitle.textContent = this._name;
    this._likeCounter.textContent = this.likes.length;

    if (this._ownerId !== this._userId) {
      this._photoTrash.remove();
    }

    this._setEventListeners();
    return this._element;
  }

  isLiked(likes) {
    return likes.some((like) => {
      return like._id === this._userId;
    });
  }

  toggleLike({ likes }) {
    const isLiked = likes.some((like) => like._id === this._userId);
    if (isLiked) {
      this.likes = likes.filter((like) => like._id !== this._userId);
    } else {
      this.likes = [...likes, { _id: this._userId }];
    }
    this._likesCounter = this.likes.length;
    this._likeCounter.textContent = this._likesCounter;
    this._photoLike.classList.toggle("photo__like_active");
  }

  deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._photoTrash.addEventListener("click", () => {
      this._handleDeleteCard(this);
    });
    this._photoLike.addEventListener("click", () => {
      this._handleLikeClick(this);
    });
    this._photoCard.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
