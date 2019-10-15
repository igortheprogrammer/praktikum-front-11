'use strict';

const apiOptions = {
    baseUrl: 'http://95.216.175.5/cohort3',
    headers: {
        authorization: '841e51fe-4357-4537-ba6f-c967ba1de3db',
        'Content-Type': 'application/json'
    }
};

const popUpContainer = document.querySelector('.root');
const placesList = document.querySelector('.places-list');

const api = new Api(apiOptions);
const cardList = new CardList(api, placesList);
const imagePopUpWindow = new ImagePopup(api, popUpContainer);
const editProfileWindow = new ProfilePopup(api, popUpContainer);
const editAvatarWindow = new AvatarPopup(api, popUpContainer);
const newPlaceWindow = new NewPlacePopup(api, popUpContainer, cardList);

(function loadProfile(api) {
    api.getUserInfo()
        .then((user) => {
            document.querySelector('.user-info__name').textContent = user.name;
            document.querySelector('.user-info__job').textContent = user.about;
            document.querySelector('.user-info__photo').style.backgroundImage = `url(${user.avatar})`;
        })
        .catch(err => console.log(err));
})(api);

document.querySelector('.user-info__photo')
    .addEventListener('click', () => {
        editAvatarWindow.open();
    });
document.querySelector('.user-info__edit-button')
    .addEventListener('click', () => {
        editProfileWindow.open();
    });
document.querySelector('.user-info__button')
    .addEventListener('click', () => {
        newPlaceWindow.open();
    });

    /**
     * @date 15.09.2019
     * 
     * Большая проделана работа, вы молодец
     * 
     * Надо сделать: Не хватает возврата информации об ошибках catch  в классе API
     *  Выносить его в класс(для примера CardList) который вызывает ошибку сети крайне не верно
     * 
     * Класс есть единственная обязанность, например класс который капает яму, класс который копает ямы не знает как положить трубы
     * или устранить утечку в трубе который лежит в земле. В программировании это называется принцып единственной ответственности
     * по правилам SOLID  https://medium.com/webbdev/solid-4ffc018077da
     * 
     * Надо сделать:  вынести всё шаблоны в отдельные методы. Сам процесс прямой отправки шаблона 
     * popupElement.innerHTML
     * не очень правильный
     * 
     * Надо сделать: Разнести классы по отдельный файлам и подцепив через   <script src="./scripts/script.js"></script>
     * 
     * В конструкторе Card у вас слишком много лишнего, допустим условия - плохо, но не исправляйте(оставьте)
     * 
     * Если метод принимает более 3 параметров, значит вы делаете что-то не так - плохо, но не исправляйте(оставьте)
     * 
     * В классе Popup у вас validateInput который отвечает за валидацию - плохо, но не исправляйте(оставьте)
     * 
     * Очень хорошо построили урзитектуру наследование, искрени хвалю
     * 
     *  Popup > ProfilePopup
     *  Popup >  AvatarPopup
     *  Popup >  ImagePopup
     *  Popup >  NewPlacePopup
     * 
     * Жду ваши исправления ;)
     * 
     * @koras 
     * 
     * 
     */
