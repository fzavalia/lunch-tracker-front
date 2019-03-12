import React, { useState, useEffect } from 'react';
import { Typography, Button, Paper, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, IconButton, Fab } from '@material-ui/core'
import { ExpandMore, Cached, Money } from '@material-ui/icons'
import moment from 'moment';
import useCurrentUser from '../hooks/useCurrentUser';
import api from '../api';
import { months } from '../constants';

const useMainData = (year, month) => {

  const currentUser = useCurrentUser()

  const [hasBudget, setHasBudget] = useState(false)
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
          setHasBudget(true)
          setBudget(budget.amount)
          setRemainingBudget(spent)
          setSpentByCurrentUser(spentByUser)
          setExpensesForMonth(expensesForMonth)
          setCurrentUserExpensesForMonth(currentUserExpensesForMonth)
        } else {
          setHasBudget(false)
        }
      })
  }, [])

  return {
    hasBudget,
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
  const data = useMainData(now.year(), now.month())

  return (
    <Main
      user={currentUser.name}
      year={now.year()}
      month={months[now.month()]}
      data={data}
      onChangeUser={() => history.push('/users')}
      onCreateBudget={() => history.push('/budgets/create')}
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
  onCreateExpense
}) =>
  <>

    <Value label='Usuario' variant='h5' value={
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: 10 }}>{user}</span>
        <IconButton onClick={onChangeUser}><Cached /></IconButton>
      </div>}
    />

    <Value label='Mes' variant='h6' value={`${month} / ${year}`} />

    {!data.hasBudget &&
      <Button
        style={{ width: '100%', marginBottom: 10 }}
        onClick={onCreateBudget}
        variant='contained'
        color='primary'
      >
        Agregar Presupuesto
      </Button>}

    {data.hasBudget &&
      <>
        <ExpensesExpansionPanel
          title='Gastos / Presupuesto'
          value={`$${data.spent} / $${data.budget}`}
          expenses={data.expensesForMonth}
        />

        <ExpensesExpansionPanel
          title='Mis Gastos'
          value={`$${data.spentByCurrentUser}`}
          expenses={data.currentUserExpensesForMonth}
        />
      </>}

    {/** Offset the bottom of the content so the Fab will not cover elements */}
    <div style={{ height: 70 }}></div>

    <Fab onClick={onCreateExpense} style={{ position: 'fixed', right: 20, bottom: 20 }} color='primary'><Money /></Fab>
  </>

const Value = ({ label, value }) =>
  <Paper style={{ padding: 10, marginBottom: 15, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography variant='caption'>{label}</Typography>
    <Typography variant='h6' align='right'>{value}</Typography>
  </Paper>

const ExpensesExpansionPanel = ({ title, value, expenses }) =>
  <ExpansionPanel style={{ marginBottom: 15 }}>
    <ExpansionPanelSummary expandIcon={<ExpandMore />}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography style={{ position: 'relative', left: -12 }} variant='caption'>{title}</Typography>
        <Typography style={{fontSize: '1rem'}} variant='h6' align='right'>{value}</Typography>
      </div>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <div style={{ width: '100%' }}>
        {expenses.map(expense =>
          <div key={expense.id}>
            <div style={{ marginBottom: 10 }}>
              <ExpensesExpansionPanelValue title='Gasto' value={`$${expense.amount}`} />
              <ExpensesExpansionPanelValue title='Restaurant' value={expense.restaurant.name} />
              <ExpensesExpansionPanelValue title='Usuario' value={expense.user.name} />
              <ExpensesExpansionPanelValue title='Dia' value={moment(expense.date).format('DD')} />
            </div>
            <hr />
          </div>
        )}
      </div>
    </ExpansionPanelDetails>
  </ExpansionPanel>

const ExpensesExpansionPanelValue = ({ title, value }) =>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Typography>{title}</Typography>
    <Typography>{value}</Typography>
  </div>

export default MainContainer