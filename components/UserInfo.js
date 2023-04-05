
export default class UserInfo {
    constructor({userName, userOccupation}) {
        this._userName = document.querySelector(userName);
        this._userOccupation = document.querySelector(userOccupation);
    }

    getUserInfo() {
        return {name: this._userName, occupation: this._userOccupation};
    }

    setUserInfo(data) {
        this._userName.textContent = data.userInputName;
        this._userOccupation.textContent  = data.userInputOccupation;
    }
}