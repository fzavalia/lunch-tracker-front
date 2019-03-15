import React from 'react';
import { Typography, Button, Paper, IconButton, Fab } from '@material-ui/core'
import { Cached, Money } from '@material-ui/icons'
import moment from 'moment';
import { isNullOrUndefined } from 'util';
import { red, orange } from '@material-ui/core/colors'
import useCurrentUser from '../../hooks/useCurrentUser';
import api from '../../api';
import { months } from '../../constants';
import Expenses, { Expense } from './Expenses';
import useMainDataFetcher from './useMainDataFetcher';

const MainContainer = ({ history }) => {

  const now = moment()
  const currentUser = useCurrentUser()
  const { data, refetch } = useMainDataFetcher(now.year(), now.month(), currentUser.id)

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
      onDeleteExpense={expense => api.expense.delete(expense.id).then(refetch)}
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
  
export default MainContainer