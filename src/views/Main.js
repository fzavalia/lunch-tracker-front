import React, { useState, useEffect } from 'react';
import { Typography, Button, Paper, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, IconButton, Fab } from '@material-ui/core'
import { ExpandMore, Cached, Money, Delete } from '@material-ui/icons'
import moment from 'moment';
import useCurrentUser from '../hooks/useCurrentUser';
import api from '../api';
import { months } from '../constants';
import { red, orange } from '@material-ui/core/colors'
import { isNullOrUndefined } from 'util';

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

const MainContainer = ({ history }) => {

  const now = moment()
  const currentUser = useCurrentUser()
  const { data, fetch } = useMainDataFetcher(now.year(), now.month(), currentUser.id)

  fetch()

  return (
    <Main
      user={currentUser.name}
      year={now.year()}
      month={months[now.month()]}
      hasBudget={data.hasBudget}
      budgetAmount={data.budgetAmount}
      spentByAll={data.spentByAll}
      spentByCurrentUser={data.spentByCurrentUser}
      expensesFromAll={data.expensesFromAll}
      expensesFromCurrentUser={data.expensesFromCurrentUser}
      onChangeUser={() => history.push('/users')}
      onCreateBudget={() => history.push('/budgets/create')}
      onCreateExpense={() => history.push('/expenses/create')}
      onDeleteExpense={expense => api.expense.delete(expense.id).then(fetch)}
    />
  )
}

const spentColor = (spent, budget) => spent >= budget
  ? red['900']
  : spent >= 0.9 * budget
    ? orange['900']
    : undefined

const Main = ({
  user,
  year,
  month,
  budgetAmount,
  spentByAll,
  spentByCurrentUser,
  expensesFromAll = [],
  expensesFromCurrentUser = [],
  onChangeUser,
  onCreateBudget,
  onCreateExpense,
  onDeleteExpense,
}) =>
  <>
    <Value label='Usuario' variant='h5' value={
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: 10 }}>{user}</span>
        <IconButton onClick={onChangeUser}><Cached /></IconButton>
      </div>}
    />
    <Value label='Mes' variant='h6' value={`${month} / ${year}`} />
    {isNullOrUndefined(budgetAmount) &&
      <Button
        style={{ width: '100%', marginBottom: 10 }}
        onClick={onCreateBudget}
        variant='contained'
        color='primary'
      >
        Agregar Presupuesto
      </Button>}
    {!isNullOrUndefined(budgetAmount) &&
      <>
        <Expenses
          title='Gastos / Presupuesto'
          value={
            <div>
              <span style={{ color: spentColor(spentByAll, budgetAmount) }}>{`$${spentByAll}`}</span>
              {` / $${budgetAmount}`}
            </div>}
          expenses={expensesFromAll}
          renderExpense={expense =>
            <Expense
              key={expense.id}
              amount={expense.amount}
              restaurantName={expense.restaurant.name}
              userName={expense.user.name}
              date={expense.date}
            />}
        />
        <Expenses
          title='Mis Gastos'
          value={`$${spentByCurrentUser}`}
          expenses={expensesFromCurrentUser}
          renderExpense={expense =>
            <Expense
              key={expense.id}
              amount={expense.amount}
              restaurantName={expense.restaurant.name}
              date={expense.date}
              onDelete={() => onDeleteExpense(expense)}
            />}
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

const groupByDay = expenses =>
  expenses.reduce((acc, next) => {
    const date = moment(next.date).format('DD-MM-YYYY')
    if (acc[date] === undefined) acc[date] = []
    acc[date].push(next)
    return acc
  }, {})

const Expenses = ({ title, value, expenses, renderExpense }) =>
  <ExpansionPanel style={{ marginBottom: 15 }}>
    <ExpansionPanelSummary expandIcon={<ExpandMore />}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography style={{ position: 'relative', left: -12 }} variant='caption'>{title}</Typography>
        <Typography style={{ fontSize: '1rem' }} variant='h6' align='right'>{value}</Typography>
      </div>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <div style={{ width: '100%' }}>
        {Object.entries(groupByDay(expenses)).map(([day, expenses]) =>
          <ExpensesGroup
            day={day}
            expenses={expenses}
            renderExpense={renderExpense}
          />)}
      </div>
    </ExpansionPanelDetails>
  </ExpansionPanel>

const ExpensesGroup = ({ day, expenses, renderExpense }) =>
  <div>
    <Typography><b>{day}</b></Typography>
    <hr />{expenses.map(renderExpense)}<hr />
  </div>

const deleteOverlayStyle = {
  position: 'absolute',
  top: 0,
  left: -5,
  padding: '0 5px',
  backgroundColor: '#ffffffba',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const Expense = ({ amount, restaurantName, date, userName, onDelete }) => {

  const [toDelete, setToDelete] = useState(false)

  return (
    <div onClick={() => onDelete && setToDelete(true)} style={{ marginBottom: 10, position: 'relative' }}>
      <ExpenseValue title='Gasto' value={`$${amount}`} />
      <ExpenseValue title='Restaurant' value={restaurantName} />
      {userName && <ExpenseValue title='Usuario' value={userName} />}
      <ExpenseValue title='Dia' value={moment(date).format('DD')} />
      {toDelete && <div onClick={onDelete} style={deleteOverlayStyle}><Delete /></div>}
    </div>
  )
}


const ExpenseValue = ({ title, value }) =>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Typography>{title}</Typography>
    <Typography>{value}</Typography>
  </div>

export default MainContainer