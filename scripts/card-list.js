'use strict';

class CardList {
    constructor(api, container) {
        this.container = container;
        this.api = api;
        this.render();
    }

    addCard(card) {
        const {
            cardElement
        } = new Card(this.api, card);
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