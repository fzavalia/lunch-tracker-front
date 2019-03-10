import fetch from 'superagent'

export default host => ({

  list: (page, perPage) =>
    fetch.get(`${host}/restaurants?page=${page}&perPage=${perPage}`)
      .then(res => res.body),

  create: (name) =>
    fetch.post(`${host}/restaurants`)
      .send({ name })
      .then(res => res.body)
})