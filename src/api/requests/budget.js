import fetch from 'superagent'
import authBeforeRequest, { getAuthHeader } from '../authBeforeRequest';

export const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

export default host => ({

  findForYearAndMonth: (year, month) =>
    fetch.get(`${host}/budgets?page=1&perPage=1&year=${year}&month=${months[month]}`)
      .then(res => res.body)
      .then(res => res[0]),

  create: (amount, year, month) =>
    authBeforeRequest(() =>
      fetch.post(`${host}/budgets`)
        .set(getAuthHeader())
        .send({ amount, year, month: months[month] })
        .then(res => res.body))
})