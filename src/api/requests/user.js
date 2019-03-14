import fetch from 'superagent'
import authBeforeRequest, { getAuthHeader } from '../authBeforeRequest';

export default host => ({

  show: (id) =>
    fetch.get(`${host}/users/${id}`)
      .then(res => res.body),

  list: (page, perPage) =>
    fetch.get(`${host}/users?page=${page}&perPage=${perPage}`)
      .then(res => res.body),

  create: (name) =>
    authBeforeRequest(() =>
      fetch.post(`${host}/users`)
        .set(getAuthHeader())
        .send({ name })
        .then(res => res.body))
})