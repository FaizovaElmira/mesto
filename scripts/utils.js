const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscape);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscape);
};

const handleEscape = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__button_type_close")) {
      closePopup(popup);
    }
  });
});
const popupViewPhoto = document.querySelector(".popup_type_view");
const popupPhoto = document.querySelector(".popup__photo");
const popupCaption = document.querySelector(".popup__caption");

export {
  openPopup,
  closePopup,
  popupViewPhoto,
  popupPhoto,
  popupCaption,
  popups,
};
