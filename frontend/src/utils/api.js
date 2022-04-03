import { BASE_URL } from './constants';

export class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then(this._checkResponseStatus)
    }
  
    getProfileInfo() {
      return fetch(`${this._baseUrl}/users/me`, {      
        headers: this._headers
      })
      .then(this._checkResponseStatus)
    }
  
    setProfileInfo(data) {
      return fetch (`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,    
        body: JSON.stringify({
          name: data.name,
          about: data.about          
        })        
      })      
      .then(this._checkResponseStatus)
    }
  
    setNewCard(data) {
      return fetch (`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,    
        body: JSON.stringify({
          name: data.title,
          link: data.link
        })
      })
      .then(this._checkResponseStatus)
    }
  
    setUserAvatar(data) {
      return fetch (`${this._baseUrl}/users/me/avatar`, {        
        method: 'PATCH',
        headers: this._headers,    
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
      .then(this._checkResponseStatus)
    }
  
    changeLikeCardStatus(id, isLiked) {
      if(isLiked) {
        return fetch (`${this._baseUrl}/cards/${id}/likes`, {
          method: 'PUT',
          headers: this._headers,
        })
        .then(this._checkResponseStatus)
      } else {
        return fetch (`${this._baseUrl}/cards/${id}/likes`, {
          method: 'DELETE',
          headers: this._headers,
        })
        .then(this._checkResponseStatus)
      }      
    }
  
    removeCard(data) {
      return fetch (`${this._baseUrl}/cards/${data._id}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponseStatus)
    }
  
    _checkResponseStatus(res) {
      if (res.ok) {
        return res.json();
      }      
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  const api = new Api({
    baseUrl: BASE_URL,
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    } 
  })

  export default api;