// Объявляем переменные, находим элементы в дереве
let popupOpen = document.querySelector('.profile__button_type_edit');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__button_type_close');
let formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__input_type_name');
let professionInput = popup.querySelector('.popup__input_type_profession');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

// Функция открытия попапа
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
}
// Функция закрытия попапа
function closePopup() {
  popup.classList.remove('popup_opened');
}
// Функция нажатия на кнопку "Сохранить"
function handleFormSubmit(evt) {
  evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = professionInput.value;
  closePopup();
}

// Создаём обработчики событий
popupOpen.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);