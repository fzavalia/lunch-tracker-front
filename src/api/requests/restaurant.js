import fetch from 'superagent'
import authBeforeRequest, { getAuthHeader } from '../authBeforeRequest';

export default host => ({

  list: (page, perPage) =>
    fetch.get(`${host}/restaurants?page=${page}&perPage=${perPage}`)
      .then(res => res.body),

  create: (name) =>
    authBeforeRequest(() =>
      fetch.post(`${host}/restaurants`)
        .set(getAuthHeader())
        .send({ name })
        .then(res => res.body))
})