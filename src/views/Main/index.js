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

  const onUpdateBudget = async () => {
    const newAmount = prompt('Ingrese el valor del presupuesto', data.budget.amount)
    if (isNaN(newAmount)) {
      alert('El valor debe ser un número valido')
    } else {
      await api.budget.update(data.budget.id, newAmount)
      await refetch()
    }
  }

  return (
    <Main
      user={currentUser.name}
      year={now.year()}
      month={months[now.month()]}
      hasBudget={data.hasBudget}
      budget={data.budget}
      spentByAll={data.spentByAll}
      spentByCurrentUser={data.spentByCurrentUser}
      expensesFromAll={data.expensesFromAll}
      expensesFromCurrentUser={data.expensesFromCurrentUser}
      onChangeUser={() => history.push('/users')}
      onCreateBudget={() => history.push('/budgets/create')}
      onCreateExpense={() => history.push('/expenses/create')}
      onDeleteExpense={expense => api.expense.delete(expense.id).then(refetch)}
      onUpdateBudget={onUpdateBudget}
    />
  )
}

const Main = ({
  user,
  year,
  month,
  budget,
  spentByAll,
  spentByCurrentUser,
  expensesFromAll = [],
  expensesFromCurrentUser = [],
  onChangeUser,
  onCreateBudget,
  onCreateExpense,
  onDeleteExpense,
  onUpdateBudget,
}) =>
  <>
    <CurrentUser user={user} onChange={onChangeUser} />
    <Value label='Mes' variant='h6' value={`${month} / ${year}`} />
    {isNullOrUndefined(budget)
      ? <CreateBudgetButton onClick={onCreateBudget} />
      : <>
        <ExpensesFromAllUsers budget={budget.amount} expenses={expensesFromAll} spent={spentByAll} onUpdateBudget={onUpdateBudget} />
        <ExpensesFromCurrentUser spent={spentByCurrentUser} expenses={expensesFromCurrentUser} onDeleteExpense={onDeleteExpense} />
      </>}
    <div style={{ height: 70 }}></div>
    <Fab onClick={onCreateExpense} style={{ position: 'fixed', right: 20, bottom: 20 }} color='primary'><Money /></Fab>
  </>

const CurrentUser = ({ user, onChange }) =>
  <Value label='Usuario' variant='h5' value={
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: 10 }}>{user}</span>
      <IconButton onClick={onChange}><Cached /></IconButton>
    </div>}
  />

const CreateBudgetButton = ({ onClick }) =>
  <Button
    style={{ width: '100%', marginBottom: 10 }}
    onClick={onClick}
    variant='contained'
    color='primary'
  >
    Agregar Presupuesto
  </Button>

const spentColor = (spent, budget) => spent >= budget
  ? red['900']
  : spent >= 0.9 * budget
    ? orange['900']
    : undefined

const ExpensesFromAllUsers = ({ spent, budget, expenses, onUpdateBudget }) =>
  <Expenses
    title='Gastos / Presupuesto'
    value={
      <div>
        <span style={{ color: spentColor(spent, budget) }}>{`$${spent}`}</span>
        {` / $${budget}`}
      </div>}
    expenses={expenses}
    renderExpense={expense =>
      <Expense
        key={expense.id}
        amount={expense.amount}
        restaurantName={expense.restaurant.name}
        userName={expense.user.name}
      />}
    renderBeforeExpenses={() =>
      <Button
        onClick={onUpdateBudget}
        color='primary'
        variant='contained'
        style={{ width: '100%', marginBottom: 20 }}>Actualizar Presupuesto</Button>}
  />

const ExpensesFromCurrentUser = ({ spent, expenses, onDeleteExpense }) =>
  <Expenses
    title='Mis Gastos'
    value={`$${spent}`}
    expenses={expenses}
    renderExpense={expense =>
      <Expense
        key={expense.id}
        amount={expense.amount}
        restaurantName={expense.restaurant.name}
        onDelete={() => onDeleteExpense(expense)}
      />}
  />

const Value = ({ label, value }) =>
  <Paper style={{ padding: 10, marginBottom: 15, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography variant='caption'>{label}</Typography>
    <Typography variant='h6' align='right'>{value}</Typography>
  </Paper>

export default MainContainer