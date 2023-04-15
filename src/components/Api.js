export class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    // карточки не мои
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: 'GET',
        }).then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
    // получаем дефолтную инфу 
    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
          }).then((res)=>{
            if(res.ok) {
                return res.json();
              }
            return Promise.reject(`Ошибка: ${res.status}`);
          })
    }

    // отправляем добавленную инфу 
    setUserInfo({userName, userOccupation}) {
        console.log(userName, userOccupation);
        fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: `${userName}`,
                about: `${userOccupation}`
            })
        }).then((res)=>{
            if(!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
              }
          })
    }
    // добавлени новой карточки 
    getCreatedCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: `${data.name}`,
                link: `${data.link}`,
            }).then(res => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
        });
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })  
    }
}