import { useState } from 'react';
import api from '../../api';

const useMainDataFetcher = (year, month, userId) => {

  const [data, setData] = useState({
    budgetAmount: null,
    spentByAll: 0,
    spentByCurrentUser: 0,
    expensesFromAll: [],
    expensesFromCurrentUser: []
  })

  const fetch = () => fetchMainData(year, month, userId).then(setData).catch(() => { })

  return { data, fetch }
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
        budgetAmount: budget.amount,
        spentByAll,
        spentByCurrentUser,
        expensesFromAll,
        expensesFromCurrentUser
      }
    })