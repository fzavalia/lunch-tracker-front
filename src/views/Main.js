import React, { useState, useEffect } from 'react';
import { Typography, Button, Paper, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import moment from 'moment';
import useCurrentUser from '../hooks/useCurrentUser';
import api from '../api';
import { months } from '../constants';

const useMainData = (year, month) => {

  const currentUser = useCurrentUser()

  const [budget, setBudget] = useState(0)
  const [spent, setRemainingBudget] = useState(0)
  const [spentByCurrentUser, setSpentByCurrentUser] = useState(0)
  const [expensesForMonth, setExpensesForMonth] = useState([])
  const [currentUserExpensesForMonth, setCurrentUserExpensesForMonth] = useState([])

  useEffect(() => {
    Promise.all([
      api.budget.findForYearAndMonth(year, month),
      api.expense.spentOnMonth(year, month),
      api.expense.spentOnMonthByUser(year, month, currentUser.id),
      api.expense.listForMonth(1, 99, year, month),
      api.expense.listForMonthByUser(1, 99, year, month, currentUser.id),
    ])
      .then(([budget, spent, spentByUser, expensesForMonth, currentUserExpensesForMonth]) => {
        if (budget) {
          setBudget(budget.amount)
          setRemainingBudget(spent)
          setSpentByCurrentUser(spentByUser)
          setExpensesForMonth(expensesForMonth)
          setCurrentUserExpensesForMonth(currentUserExpensesForMonth)
        }
      })
  }, [])

  return {
    budget,
    spent,
    spentByCurrentUser,
    expensesForMonth,
    currentUserExpensesForMonth
  }
}

const MainContainer = ({ history }) => {

  const now = moment()
  const currentUser = useCurrentUser()
  const data = useMainData(now.years(), now.month())

  return (
    <Main
      user={currentUser.name}
      year={now.year()}
      month={months[now.month()]}
      data={data}
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
  data,
  onChangeUser,
  onCreateBudget,
  onCreateRestaurant,
  onCreateExpense
}) =>
  <>

    <Value label='Usuario' variant='h5' value={user} />
    <Value label='Mes' variant='h6' value={`${month} / ${year}`} />

    <ExpansionPanel style={{ marginBottom: 15 }}>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography style={{ position: 'relative', left: -12 }} variant='caption'>Gastos / Presupuesto</Typography>
          <Typography variant='h6'>${data.spent} / ${data.budget}</Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div style={{ width: '100%' }}>
          {data.expensesForMonth.map(expense =>
            <div key={expense.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography style={{ marginRight: 10 }}>${expense.amount}</Typography>
              <Typography>{moment(expense.date).format('DD-MM-YYYY')}</Typography>
            </div>)}
        </div>

      </ExpansionPanelDetails>
    </ExpansionPanel>

    {/* <Value label='Presupuesto' variant='h6' value={`$${data.remainingBudget} / $${data.budget}`} /> */}

    <ExpansionPanel style={{ marginBottom: 15 }}>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography style={{ position: 'relative', left: -12 }} variant='caption'>Mis Gastos</Typography>
          <Typography variant='h6'>${data.spentByCurrentUser}</Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {data.currentUserExpensesForMonth.map(expense => <Typography key={expense.id}>{expense.amount}</Typography>)}
      </ExpansionPanelDetails>
    </ExpansionPanel>

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

const Value = ({ label, value }) =>
  <Paper style={{ padding: 10, marginBottom: 15, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography variant='caption'>{label}</Typography>
    <Typography variant='h6'>{value}</Typography>
  </Paper>

export default MainContainer