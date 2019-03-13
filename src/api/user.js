import fetch from 'superagent'
import api from '.';

export default host => ({

  show: (id) =>
    fetch.get(`${host}/users/${id}`)
      .then(res => res.body),

  list: (page, perPage) =>
    fetch.get(`${host}/users?page=${page}&perPage=${perPage}`)
      .then(res => res.body),

  create: (name) => {
    if (!sessionStorage.getItem('token')) {
      const password = prompt('password')
      if (password === null) {
        return Promise.reject()
      }
      return api.tokens.create(password)
        .then(token => sessionStorage.setItem('token', token))
        .then(() => api.user.create(name))
    }
    return fetch.post(`${host}/users`)
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
      .send({ name })
      .then(res => res.body)
  }

})