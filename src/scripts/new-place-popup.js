'use strict';

class NewPlacePopup extends Popup {
    constructor(api, container, cardList) {
        super(api, container);
        this.cardList = cardList;
    }

    renderPopupWindow() {
        const popupElement = document.createElement('div');
        popupElement.classList.add('popup', 'popup_new-place')

        popupElement.innerHTML = this.getHtml();

        const popUpForm = popupElement.querySelector('.popup__form');
        const popUpActionButton = popUpForm.querySelector('.popup__btn-add-new-place');

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

            const placeName = this.popUpWindow.querySelector('.popup__input_type_name').value;
            const placeLink = this.popUpWindow.querySelector('.popup__input_type_link-url').value;
            this.api.addNewPlace(placeName, placeLink)
                .then((place) => {
                    cardList.addCard(
                        place
                    );
                })
                .catch(err => console.log(err))
                .finally(() => {
                    popUpActionButton.textContent = '+';
                    popUpActionButton.removeAttribute('disabled');
                    popUpActionButton.classList.remove('popup__button_disabled');

                    popUpForm.reset();

                    this.close()
                });
        });

        return popupElement;
    }

    getHtml() {
        return `  
            <div class="popup__content">
                <span class="popup__close"></span>
                <h3 class="popup__title">Новое место</h3>
                <form class="popup__form" name="newPlace">
                    <div class="popup__input-group">
                        <input class="popup__input popup__input_type_name" type="text" name="name" placeholder="Название" minlength="2"
                        maxlength="30" required="true">
                        <span class="popup__input-error"></span>
                    </div>
                    <div class="popup__input-group">
                        <input class="popup__input popup__input_type_link-url" type="url" name="link" placeholder="Ссылка на картинку"
                        required="true">
                        <span class="popup__input-error"></span>
                    </div>
                    <button class="button popup__button popup__btn-add-new-place popup__button_disabled" disabled="true">+</button>
                </form>
            </div>
        `;
    }

    open() {
        if (this.popUpWindow.querySelector('.popup__input_type_name').value.length > 0 || this.popUpWindow.querySelector('.popup__input_type_link-url').value.length > 0) {
            this.popUpWindow.querySelector('.popup__btn-add-new-place').removeAttribute('disabled');
            this.popUpWindow.querySelector('.popup__btn-add-new-place').classList.remove('popup__button_disabled');
            this.validate();
        } else {
            this.popUpWindow.querySelector('.popup__btn-add-new-place').setAttribute('disabled', true);
            this.popUpWindow.querySelector('.popup__btn-add-new-place').classList.add('popup__button_disabled');
        }
        super.open();
    }

    validate() {
        const nameIsValid = this.validateInput(this.popUpWindow.querySelector('.popup__input_type_name'));
        const linkIsValid = this.validateInput(this.popUpWindow.querySelector('.popup__input_type_link-url'));

        return nameIsValid && linkIsValid;
    }
}
