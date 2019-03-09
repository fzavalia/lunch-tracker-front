import fetch from 'superagent'

export default host => ({

  list: (page, perPage) => fetch.get(`${host}/users?page=${page}&perPage=${perPage}`).then(res => res.body)

})