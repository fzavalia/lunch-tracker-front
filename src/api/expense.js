import fetch from 'superagent'

export default host => ({

  list: (page, perPage) =>
    fetch.get(`${host}/expenses?page=${page}&perPage=${perPage}`)
      .then(res => res.body),

  create: (amount, date, user, restaurant) =>
    fetch.post(`${host}/expenses`)
      .send({ amount, date, user, restaurant })
      .then(res => res.body)
})