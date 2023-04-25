export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._submitButton = this._popup.querySelector(".form__button");
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  renderLoading(isLoading, loadingText) {
    if (!this._submitButton) return;
    if (isLoading) {
      this.defaultText = this._submitButton.textContent;
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this.defaultText;
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__button_type_close")
      ) {
        this.close();
      }
    });
  }
}
