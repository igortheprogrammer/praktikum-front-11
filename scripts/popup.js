'use strict';

class Popup {
    constructor(api, container) {
        this.api = api;
        this.popUpWindow = this.renderPopupWindow();
        this.close = this.close.bind(this);
        this.popUpWindow.querySelector('.popup__close').addEventListener('click', this.close);
        container.appendChild(this.popUpWindow);
    }

    renderPopupWindow() {
        return null;
    }

    close() {
        this.popUpWindow.classList.remove('popup_is-opened');
    }

    open() {
        this.popUpWindow.classList.add('popup_is-opened');
    }

    validateInput(input) {
        const validityState = input.validity;
        const emptyText = 'Это обязательное поле';
        const badLengthText = 'Должно быть от 2 до 30 символов';
        const badUrlText = 'Здесь должна быть ссылка';

        const inputError = input.parentNode.querySelector('.popup__input-error');
        if (inputError) {
            if (validityState.valid) {
                inputError.textContent = '';
            } else {
                let textContent = '';
                if (validityState.valueMissing) {
                    textContent = emptyText;
                } else if (validityState.tooShort || validityState.tooLong) {
                    textContent = badLengthText;
                } else if (input.type === 'url' && validityState.typeMismatch) {
                    textContent = badUrlText;
                }

                inputError.textContent = textContent;
            }
        }

        return validityState.valid;
    }
}
