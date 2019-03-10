import fetch from 'superagent'

export default host => ({

  list: (page, perPage) => fetch.get(`${host}/users?page=${page}&perPage=${perPage}`).then(res => res.body),

  create: (name) => fetch.post(`${host}/users`).send({ name }).then(res => res.body)

})