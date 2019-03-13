import fetch from 'superagent'

export default host => ({

  create: password =>
    fetch.post(`${host}/tokens`, { password })
      .then(res => res.body.token),
})