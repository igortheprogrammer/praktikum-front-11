'use strict';

import Popup from './popup';

export default class ImagePopup extends Popup {
    renderPopupWindow() {
        const popupElement = document.createElement('div');
        popupElement.classList.add('popup', 'popup_image');

        popupElement.innerHTML = this.getHtml();

        return popupElement;
    }

    getHtml() {
        return `  
            <div class="popup__image-content">
                <span class="popup__close"></span>
                <img class="popup__image">
            </div>
        `;
    }

    open(url) {
        this.popUpWindow.querySelector('.popup__image').src = url;
        super.open();
    }
}