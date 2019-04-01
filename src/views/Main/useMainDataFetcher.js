import { useState, useEffect } from 'react';
import api from '../../api';

const useMainDataFetcher = (year, month, userId) => {

  const [data, setData] = useState({
    budget: null,
    spentByAll: 0,
    spentByCurrentUser: 0,
    expensesFromAll: [],
    expensesFromCurrentUser: []
  })

  const [aux, setAux] = useState(1)

  useEffect(() => {
    fetchMainData(year, month, userId).then(setData).catch(() => { })
  }, [aux])

  const refetch = () => setAux(aux * -1)

  return { data, refetch }
}

export default useMainDataFetcher

const fetchMainData = (year, month, userId) =>
  Promise.all([
    api.budget.findForYearAndMonth(year, month),
    api.expense.spentOnMonth(year, month),
    api.expense.spentOnMonthByUser(year, month, userId),
    api.expense.listForMonth(1, 99, year, month),
    api.expense.listForMonthByUser(1, 99, year, month, userId),
  ])
    .then(([budget, spentByAll, spentByCurrentUser, expensesFromAll, expensesFromCurrentUser]) => {
      if (!budget) {
        throw new Error(`No budget for ${year} ${month}`)
      }
      return {
        budget,
        spentByAll,
        spentByCurrentUser,
        expensesFromAll,
        expensesFromCurrentUser
      }
    })