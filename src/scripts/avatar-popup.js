'use strict';

import Popup from './popup';

export default class AvatarPopup extends Popup {
    renderPopupWindow() {
        const popupElement = document.createElement('div');
        popupElement.classList.add('popup', 'popup_edit-avatar')

        popupElement.innerHTML = this.getHtml();

        const popUpForm = popupElement.querySelector('.popup__form');
        const popUpActionButton = popUpForm.querySelector('.popup__btn-edit-avatar');

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

            const userAvatar = this.popUpWindow.querySelector('.popup__input_type_link-url').value;
            this.api.setAvatar(userAvatar)
                .then((user) => {
                    document.querySelector('.user-info__photo').style.backgroundImage = `url(${user.avatar})`;
                })
                .catch(err => console.log(err))
                .finally(() => {
                    popUpActionButton.textContent = 'Сохранить';
                    popUpActionButton.removeAttribute('disabled');
                    popUpActionButton.classList.remove('popup__button_disabled');

                    popUpForm.reset();
                    this.close()
                });




            this.close();
        });

        return popupElement;
    }

    getHtml() {
        return `  
            <div class="popup__content">
                <span class="popup__close"></span>
                <h3 class="popup__title">Обновить аватар</h3>
                <form class="popup__form" name="editAvatar">
                    <div class="popup__input-group">
                        <input class="popup__input popup__input_type_link-url" type="url" name="link" placeholder="Ссылка на аватар"
                        required="true">
                        <span class="popup__input-error"></span>
                    </div>
                    <button class="button popup__button popup__btn-edit-avatar popup__button_disabled" disabled="true">Сохранить</button>
                </form>
            </div>
        `;
    }

    open() {
        if (this.popUpWindow.querySelector('.popup__input_type_link-url').value.length > 0) {
            this.popUpWindow.querySelector('.popup__btn-edit-avatar').removeAttribute('disabled');
            this.popUpWindow.querySelector('.popup__btn-edit-avatar').classList.remove('popup__button_disabled');
            this.validate();
        } else {
            this.popUpWindow.querySelector('.popup__btn-edit-avatar').setAttribute('disabled', true);
            this.popUpWindow.querySelector('.popup__btn-edit-avatar').classList.add('popup__button_disabled');
        }
        super.open();
    }

    validate() {
        const linkIsValid = this.validateInput(this.popUpWindow.querySelector('.popup__input_type_link-url'));

        return linkIsValid;
    }
}
