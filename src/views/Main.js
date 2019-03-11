import React, { useState, useEffect } from 'react';
import { Typography, Button, Paper } from '@material-ui/core'
import moment from 'moment';
import useCurrentUser from '../hooks/useCurrentUser';
import api from '../api';
import { months } from '../constants';

const useMainData = (year, month) => {

  const currentUser = useCurrentUser()

  const [budget, setBudget] = useState(0)
  const [remainingBudget, setRemainingBudget] = useState(0)
  const [currentUserExpenses, setCurrentUserExpenses] = useState(0)

  useEffect(() => {
    Promise.all([
      api.budget.findForYearAndMonth(year, month),
      api.expense.spentOnMonth(year, month),
      api.expense.spentOnMonthByUser(year, month, currentUser.id)
    ])
      .then(([budget, spent, spentByUser]) => {
        console.log(budget, spent, spentByUser)
        if (budget) {
          setBudget(budget.amount)
          setRemainingBudget(budget.amount - spent)
          setCurrentUserExpenses(spentByUser)
        }
      })
  }, [])

  return {
    budget,
    remainingBudget,
    currentUserExpenses
  }
}

const MainContainer = ({ history }) => {

  const now = moment()

  const currentUser = useCurrentUser()

  const mainData = useMainData(now.years(), now.month())

  return (
    <Main
      user={currentUser.name}
      year={now.year()}
      month={months[now.month()]}
      budget={mainData.budget}
      remaining={mainData.remainingBudget}
      myExpenses={mainData.currentUserExpenses}
      onChangeUser={() => history.push('/users')}
      onCreateBudget={() => history.push('/budgets/create')}
      onCreateRestaurant={() => history.push('/restaurants/create')}
      onCreateExpense={() => history.push('/expenses/create')}
    />
  )
}

const Main = ({
  user,
  year,
  month,
  budget,
  remaining,
  myExpenses,
  onChangeUser,
  onCreateBudget,
  onCreateRestaurant,
  onCreateExpense
}) =>
  <>

    <Value label='Usuario' variant='h5' value={user} />
    <Value label='Presupuesto' variant='h6' value={`${month}/${year} - $${remaining} / $${budget}`} />
    <Value label='Mis gastos de este mes' value={`$${myExpenses}`} />

    <Button
      style={{ width: '100%', marginBottom: 10 }}
      onClick={onChangeUser}
      variant='contained'
      color='primary'
    >
      Seleccionar Usuario
    </Button>

    <Button
      style={{ width: '100%', marginBottom: 10 }}
      onClick={onCreateBudget}
      variant='contained'
      color='primary'
    >
      Agregar Persupuesto
    </Button>

    <Button
      style={{ width: '100%', marginBottom: 10 }}
      onClick={onCreateRestaurant}
      variant='contained'
      color='primary'
    >
      Agregar Restaurant
    </Button>

    <Button
      style={{ width: '100%', height: 100 }}
      onClick={onCreateExpense}
      variant='contained'
      color='primary'
    >
      Nuevo Gasto
    </Button>
  </>

const Value = ({ label, value, variant = 'h4' }) =>
  <Paper style={{ padding: 10, marginBottom: 15 }}>
    <Typography variant='caption'>{label}</Typography>
    <Typography align='right' variant={variant}>{value}</Typography>
  </Paper>

export default MainContainer