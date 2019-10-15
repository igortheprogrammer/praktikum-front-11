'use strict';

class Card {
    constructor(api, card) {
        const {
            name,
            link,
            _id: cardId,
            owner: {
                _id: ownerId
            },
            likes
        } = card;

        this.userId = 'b4cfeda71ad0ddb3e434b0e2';
        this.api = api;
        this.link = link;
        this.cardId = cardId;
        this.likeCount = likes.length;
        this.liked = likes.filter((item) => item._id === this.userId).length > 0;
        this.setLikeCount = this.setLikeCount.bind(this);
        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
        this.openImage = this.openImage.bind(this);
        this.cardElement = this.create(name, link, ownerId);
    }

    create(name, link, ownerId) {
        const card = document.createElement('div');
        card.classList.add('place-card');

        card.innerHTML = this.getHtml(link, name, this.likeCount);

        const cardImage = card.querySelector('.place-card__image');
        cardImage.addEventListener('click', this.openImage);
        if (ownerId === this.userId) {
            const btnDeleteCard = document.createElement('button');
            btnDeleteCard.classList.add('place-card__delete-icon');
            btnDeleteCard.addEventListener('click', this.remove);

            cardImage.appendChild(btnDeleteCard);
        }

        const btnLikeCard = card.querySelector('.place-card__like-icon');
        btnLikeCard.addEventListener('click', this.like);
        if (this.liked) {
            btnLikeCard.classList.add('place-card__like-icon_liked');
        }

        return card;
    }

    getHtml(link, name, likeCount) {
        return `
        <div class="place-card__image" style="background-image: url(${link})"></div>
        <div class="place-card__description">
            <h3 class="place-card__name">${name}</h3>
            <div class="place-card__like-group">
                <button class="place-card__like-icon"></button>
                <span class="place-card__like-count">${likeCount}</span>
            </div>
        </div>
        `;
    }

    setLikeCount(likes) {
        this.likeCount = likes.length;
        this.cardElement
            .querySelector('.place-card__like-count')
            .textContent = this.likeCount;
    }

    like() {
        if (this.liked) {
            this.api.deleteLike(this.cardId)
                .then((card) => {
                    this.liked = false;
                    this.setLikeCount(card.likes);
                })
                .catch(err => console.log(err))
                .finally(() => {
                    this.cardElement
                        .querySelector('.place-card__like-icon')
                        .classList
                        .remove('place-card__like-icon_liked');
                });
        } else {
            this.api.addLike(this.cardId)
                .then((card) => {
                    this.liked = true;
                    this.setLikeCount(card.likes);
                })
                .catch(err => console.log(err))
                .finally(() => {
                    this.cardElement
                        .querySelector('.place-card__like-icon')
                        .classList
                        .add('place-card__like-icon_liked');
                });
        }
    }

    remove(event) {
        event.stopPropagation();
        this.api.deletePlace(this.cardId)
            .then(() => this.cardElement.parentNode.removeChild(this.cardElement))
            .catch(err => console.log(err));
    }

    openImage() {
        imagePopUpWindow.open(this.link);
    }
}