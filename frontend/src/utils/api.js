export class Api {
    constructor({baseUrl/*, headers*/}) {
      this._baseUrl = baseUrl;
      // this._headers = headers;
    }

    getInitialCards(token) {
      return fetch(`${this._baseUrl}/cards`, {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }    
      })
      .then(this._checkResponseStatus)
    }
  
    getProfileInfo(token) {
      return fetch(`${this._baseUrl}/users/me`, {      
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        } 
      })
      .then(this._checkResponseStatus)
    }
  
    setProfileInfo(data, token) {
      return fetch (`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },    
        body: JSON.stringify({
          name: data.name,
          about: data.about          
        })        
      })      
      .then(this._checkResponseStatus)
    }
  
    setNewCard(data, token) {
      return fetch (`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
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
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
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
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        })
        .then(this._checkResponseStatus)
      } else {
        return fetch (`${this._baseUrl}/cards/${id}/likes`, {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        })
        .then(this._checkResponseStatus)
      }      
    }
  
    removeCard(data, token) {
      return fetch (`${this._baseUrl}/cards/${data._id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
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
    baseUrl: 'https://api.krasnovid.students.nomoredomains.work',
  })

  export default api;