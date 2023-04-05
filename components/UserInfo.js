
export default class UserInfo {
    constructor({userName, userOccupation}) {
        this._userName = document.querySelector(userName);
        this._userOccupation = document.querySelector(userOccupation);
    }

    getUserInfo() {
        // возвращаем объект текущих значений
        return {userName: this._userName, userOccupation: this._userOccupation};
    }

    setUserInfo(data) {
        this._userName.textContent = data.userName;
        this._userOccupation.textContent  = data.userOccupation;
    }
}