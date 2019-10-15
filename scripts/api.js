'use strict';

class Api {
    constructor(options) {
        this.options = options;
        this.getInitialCards = this.getInitialCards.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.setUserInfo = this.setUserInfo.bind(this);
        this.setAvatar = this.setAvatar.bind(this);
        this.addNewPlace = this.addNewPlace.bind(this);
        this.deletePlace = this.deletePlace.bind(this);
        this.addLike = this.addLike.bind(this);
        this.deleteLike = this.deleteLike.bind(this);
    }

    getInitialCards() {
        return fetch(`${this.options.baseUrl}/cards`, {
                headers: this.options.headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch(err => console.log(err));
    }

    getUserInfo() {
        return fetch(`${this.options.baseUrl}/users/me`, {
                headers: this.options.headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch(err => console.log(err));
    }

    setUserInfo(name, about) {
        return fetch(`${this.options.baseUrl}/users/me`, {
                method: 'PATCH',
                headers: this.options.headers,
                body: JSON.stringify({
                    name,
                    about
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch(err => console.log(err));
    }

    setAvatar(avatar) {
        return fetch(`${this.options.baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this.options.headers,
                body: JSON.stringify({
                    avatar
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch(err => console.log(err));
    }

    addNewPlace(name, link) {
        return fetch(`${this.options.baseUrl}/cards`, {
                method: 'POST',
                headers: this.options.headers,
                body: JSON.stringify({
                    name,
                    link
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch(err => console.log(err));
    }

    deletePlace(cardId) {
        return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
                method: 'DELETE',
                headers: this.options.headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch(err => console.log(err));
    }

    addLike(cardId) {
        return fetch(`${this.options.baseUrl}/cards/like/${cardId}`, {
                method: 'PUT',
                headers: this.options.headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch(err => console.log(err));
    }

    deleteLike(cardId) {
        return fetch(`${this.options.baseUrl}/cards/like/${cardId}`, {
                method: 'DELETE',
                headers: this.options.headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch(err => console.log(err));
    }
}
