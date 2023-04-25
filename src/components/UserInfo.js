
export class UserInfo {
    constructor({userName, userOccupation, userAvatar}) {
        this._userName = document.querySelector(userName);
        this._userOccupation = document.querySelector(userOccupation);
        this._userAvatar = document.querySelector(userAvatar);
    }

    getUserInfo() {
        // возвращаем объект текущих значений
        return {userName: this._userName, userOccupation: this._userOccupation};
    }

    setUserInfo(data) {
        console.log(data);
        this._userName.textContent = data.name;
        this._userOccupation.textContent  = data.about;
        // this._userName.textContent = data.userName;
        // this._userOccupation.textContent  = data.userOccupation;
    }

    setUserAvatar(data) {
        this._userAvatar.src = data.avatar;
    }
}