const formElementEdit = document.forms.formElementEdit;
const formElementAdd = document.forms.formElementAdd;
const formElementAvatar = document.forms.formElementAvatar;
const inputName = formElementEdit.elements.name;
const inputAbout = formElementEdit.elements.about;
const profileEditButton = document.querySelector(".profile__button_type_edit");
const addCardButton = document.querySelector(".profile__button_type_add");
const profileAvatarButton = document.querySelector(
  ".profile__button_type_avatar"
);

const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  buttonSelector: ".form__button",
  inactiveButtonClass: "form__button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

export {
  config,
  formElementAvatar,
  formElementEdit,
  formElementAdd,
  inputName,
  inputAbout,
  profileAvatarButton,
  profileEditButton,
  addCardButton,
};
