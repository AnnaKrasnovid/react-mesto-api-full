const BASE_URL = /*'https://api.krasnovid.students.nomoredomains.work' */ process.env.REACT_APP_BASE_URL  ||  'http://localhost:3000' ;

export function register({ password, email }) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
    .then(checkResponseStatus)
}

export function authorize({ password, email }) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
    .then(checkResponseStatus)
};

export function checkToken(token) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then(checkResponseStatus)
}

function checkResponseStatus(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
}