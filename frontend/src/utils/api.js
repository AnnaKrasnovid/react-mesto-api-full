export class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    getInitialCards(token) {
      return fetch(`${this._baseUrl}/cards`, {
        headers: {
          ...this._headers,
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(this._checkResponseStatus)
    }
  
    getProfileInfo(token) {
      return fetch(`${this._baseUrl}/users/me`, {      
        headers: {
          ...this._headers,
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(this._checkResponseStatus)
    }
  
    setProfileInfo(data, token) {
      return fetch (`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          ...this._headers,
          'Authorization': `Bearer ${token}`,
        },    
        body: JSON.stringify({
          name: data.name,
          about: data.about,         
        })        
      })      
      .then(this._checkResponseStatus)
    }
  
    setNewCard(data, token) {
      return fetch (`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          ...this._headers,
          'Authorization': `Bearer ${token}`,
        },    
        body: JSON.stringify({
          name: data.title,
          link: data.link
        })
      })
      .then(this._checkResponseStatus)
    }
  
    setUserAvatar(data, token) {
      return fetch (`${this._baseUrl}/users/me/avatar`, {        
        method: 'PATCH',
        headers: {
          ...this._headers,
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
      .then(this._checkResponseStatus)
    }
  
    changeLikeCardStatus(id, isLiked, token) {
      if(isLiked) {
        return fetch (`${this._baseUrl}/cards/${id}/likes`, {
          method: 'PUT',
          headers: {
            ...this._headers,
            'Authorization': `Bearer ${token}`,
          },
        })
        .then(this._checkResponseStatus)
      } else {
        return fetch (`${this._baseUrl}/cards/${id}/likes`, {
          method: 'DELETE',
          headers: {
            ...this._headers,
            'Authorization': `Bearer ${token}`,
          },
        })
        .then(this._checkResponseStatus)
      }      
    }
  
    removeCard(data, token) {
      return fetch (`${this._baseUrl}/cards/${data._id}`, {
        method: 'DELETE',
        headers: {
          ...this._headers,
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(this._checkResponseStatus)
    }
  
    _checkResponseStatus(res) {
      if (res.ok) {
        return res.json();
      }      
      return Promise.reject(`????????????: ${res.status}`)
    }
}

const api = new Api({
  baseUrl: 'https://api.krasnovid.students.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json',
  }
})
 /*const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-32',
  headers: { 
    authorization: '894bd372-66b3-459f-9fd3-803617b1d7d0', 
    'Content-Type': 'application/json'
  } 
})*/

export default api;