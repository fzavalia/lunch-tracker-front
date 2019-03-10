import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@material-ui/core'
import moment from 'moment';
import useCurrentUser from '../hooks/useCurrentUser';
import api from '../api';

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
]

const useMainData = (year, month) => {

  const [budget, setBudget] = useState(0)
  const [remainingBudget, setRemainingBudget] = useState(0)
  const [currentUserExpenses, setCurrentUserExpenses] = useState(0)

  useEffect(() => {
    api.budget.findForYearAndMonth(year, month)
      .then(budget => {
        if (budget) {
          setBudget(budget.amount)
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
      remaining='12000'
      myExpenses='1340'
      onNewExpense={() => history.push('/expenses')}
      onChangeUser={() => history.push('/users')}
    />
  )
}

const Main = ({ user, year, month, budget, remaining, myExpenses, onChangeUser, onNewExpense }) =>
  <>
    <Value label='Usuario' value={user} />
    <Value label='Año' value={year} />
    <Value label='Mes' value={month} />
    <Value label='Presupuesto' value={budget} />
    <Value label='Gastado' value={remaining} />
    <Value label='Mis Gastos' value={myExpenses} />
    <Button style={{ width: '100%', marginBottom: 10 }} onClick={onChangeUser} variant='contained' color='primary'>Cambiar de Usuario</Button>
    <Button style={{ width: '100%' }} onClick={onNewExpense} variant='contained' color='primary'>Nuevo Gasto</Button>
  </>

const Value = ({ label, value }) =>
  <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
    <Typography style={{ alignSelf: 'flex-end' }} variant='body2'>{label}</Typography>
    <Typography variant='body2'>{value}</Typography>
  </div>

export default MainContainer