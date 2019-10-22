'use strict';

import Card from './card';

export default class CardList {
    constructor(api, container, showImage) {
        this.container = container;
        this.api = api;
        this.showImage = showImage;
        this.render();
    }

    addCard(card) {
        const {
            cardElement
        } = new Card(this.api, card, this.showImage);
        this.container.appendChild(cardElement);
    }

    render() {
        this.api.getInitialCards()
            .then((cards) => {
                cards.forEach((card) => {
                    this.addCard(card)
                });
            })
            .catch(err => console.log(err));
    }
}