import fetch from 'superagent'
import { months } from './budget';

const spentOnMonthBase = async (host, year, month, user) => {

  let url = `${host}/expenses/year/${year}/month/${months[month]}/spent`

  if (user) {
    url += `?user=${user}`
  }

  const res = await fetch.get(url)

  return res.body.value
}

const listForMonthBase = async (host, page, perPage, year, month, user) => {

  let url = `${host}/expenses/year/${year}/month/${months[month]}?page=${page}&perPage=${perPage}`

  if (user) {
    url += `&user=${user}`
  }

  const res = await fetch.get(url)

  return res.body
}

export default host => ({

  list: (page, perPage) =>
    fetch.get(`${host}/expenses?page=${page}&perPage=${perPage}`)
      .then(res => res.body),

  listForMonth: (page, perPage, year, month) =>
    listForMonthBase(host, page, perPage, year, month),

  listForMonthByUser: (page, perPage, year, month, user) =>
    listForMonthBase(host, page, perPage, year, month, user),

  spentOnMonth: (year, month) =>
    spentOnMonthBase(host, year, month),

  spentOnMonthByUser: (year, month, user) =>
    spentOnMonthBase(host, year, month, user),

  create: (amount, date, user, restaurant) =>
    fetch.post(`${host}/expenses`)
      .send({ amount, date, user, restaurant })
      .then(res => res.body)
})