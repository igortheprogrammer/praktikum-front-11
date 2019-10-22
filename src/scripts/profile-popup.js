'use strict';

import Popup from './popup';

export default class ProfilePopup extends Popup {
    renderPopupWindow() {
        const popupElement = document.createElement('div');
        popupElement.classList.add('popup', 'popup_edit-profile');

        popupElement.innerHTML = this.getHtml();

        const popUpForm = popupElement.querySelector('.popup__form');
        const popUpActionButton = popUpForm.querySelector('.popup__btn-edit-profile');
        popUpForm.addEventListener('input', () => {
            if (!this.validate()) {
                popUpActionButton.setAttribute('disabled', true);
                popUpActionButton.classList.add('popup__button_disabled');
            } else {
                popUpActionButton.removeAttribute('disabled');
                popUpActionButton.classList.remove('popup__button_disabled');
            }
        });
        popUpForm.addEventListener('submit', (event) => {
            event.preventDefault();

            popUpActionButton.textContent = 'Загрузка...';
            popUpActionButton.setAttribute('disabled', true);
            popUpActionButton.classList.add('popup__button_disabled');

            const userName = this.popUpWindow.querySelector('.popup__input_type_name').value;
            const userAbout = this.popUpWindow.querySelector('.popup__input_type_about').value;
            this.api.setUserInfo(userName, userAbout)
                .then((user) => {
                    document.querySelector('.user-info__name').textContent = user.name;
                    document.querySelector('.user-info__job').textContent = user.about;
                    document.querySelector('.user-info__photo').style.backgroundImage = `url(${user.avatar})`;
                })
                .catch(err => console.log(err))
                .finally(() => {
                    popUpActionButton.textContent = 'Сохранить';
                    popUpActionButton.removeAttribute('disabled');
                    popUpActionButton.classList.remove('popup__button_disabled');

                    this.close()
                });
        });

        return popupElement;
    }

    getHtml() {
        return `  
            <div class="popup__content"><span class="popup__close"></span>
                <h3 class="popup__title">Редактировать профиль</h3>
                <form class="popup__form" name="editProfile">
                <div class="popup__input-group"><input class="popup__input popup__input_type_name" 
                type="text" name="name" placeholder="Имя" minlength="2" maxlength="30" required="true">
                    <span class="popup__input-error"></span>
                </div>
                <div class="popup__input-group"><input class="popup__input popup__input_type_about" 
                type="text" name="about" placeholder="О себе" minlength="2" maxlength="30" required="true">
                    <span class="popup__input-error"></span>
                </div>
                <button class="button popup__button popup__btn-edit-profile">Сохранить</button></form>
            </div>
        `;
    }

    open() {
        this.popUpWindow.querySelector('.popup__input_type_name').value = document.querySelector('.user-info__name').textContent;
        this.popUpWindow.querySelector('.popup__input_type_about').value = document.querySelector('.user-info__job').textContent;
        this.popUpWindow.querySelector('.popup__btn-edit-profile').removeAttribute('disabled');
        this.popUpWindow.querySelector('.popup__btn-edit-profile').classList.remove('popup__button_disabled');
        this.validate();
        super.open();
    }

    validate() {
        const nameIsValid = this.validateInput(this.popUpWindow.querySelector('.popup__input_type_name'));
        const aboutIsValid = this.validateInput(this.popUpWindow.querySelector('.popup__input_type_about'));

        return nameIsValid && aboutIsValid;
    }
}