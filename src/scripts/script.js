'use strict';

import '../pages/index.css';

import { apiOptions } from './config';

const popUpContainer = document.querySelector('.root');
const placesList = document.querySelector('.places-list');

// const api = new Api(apiOptions);
// const cardList = new CardList(api, placesList);
// const imagePopUpWindow = new ImagePopup(api, popUpContainer);
// const editProfileWindow = new ProfilePopup(api, popUpContainer);
// const editAvatarWindow = new AvatarPopup(api, popUpContainer);
// const newPlaceWindow = new NewPlacePopup(api, popUpContainer, cardList);
//
// (function loadProfile(api) {
//     api.getUserInfo()
//         .then((user) => {
//             document.querySelector('.user-info__name').textContent = user.name;
//             document.querySelector('.user-info__job').textContent = user.about;
//             document.querySelector('.user-info__photo').style.backgroundImage = `url(${user.avatar})`;
//         })
//         .catch(err => console.log(err));
// })(api);
//
// document.querySelector('.user-info__photo')
//     .addEventListener('click', () => {
//         editAvatarWindow.open();
//     });
// document.querySelector('.user-info__edit-button')
//     .addEventListener('click', () => {
//         editProfileWindow.open();
//     });
// document.querySelector('.user-info__button')
//     .addEventListener('click', () => {
//         newPlaceWindow.open();
//     });
