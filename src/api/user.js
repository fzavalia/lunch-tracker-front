import fetch from 'superagent'

export default host => ({

  show: (id) =>
    fetch.get(`${host}/users/${id}`)
      .then(res => res.body),

  list: (page, perPage) =>
    fetch.get(`${host}/users?page=${page}&perPage=${perPage}`)
      .then(res => res.body),

  create: (name) =>
    fetch.post(`${host}/users`)
      .send({ name })
      .then(res => res.body)
})