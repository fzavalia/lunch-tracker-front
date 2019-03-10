import React from 'react';
import { Typography, Button } from '@material-ui/core'
import moment from 'moment';
import useCurrentUser from '../hooks/useCurrentUser';

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

const MainContainer = ({ history }) => {

  const now = moment()

  const currentUser = useCurrentUser()

  return (
    <Main
      user={currentUser.name}
      year={now.year()}
      month={months[now.month()]}
      budget='15000'
      remaining='12000'
      myExpenses='1340'
      onExpenseButtonClick={() => history.push('/expenses')}
    />
  )
}

const Main = ({ user, year, month, budget, remaining, myExpenses, onExpenseButtonClick }) =>
  <>
    <Value label='Usuario' value={user} />
    <Value label='Año' value={year} />
    <Value label='Mes' value={month} />
    <Value label='Presupuesto' value={budget} />
    <Value label='Gastado' value={remaining} />
    <Value label='Mis Gastos' value={myExpenses} />
    <ExpenseButton onClick={onExpenseButtonClick} />
  </>

const Value = ({ label, value }) =>
  <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
    <Typography style={{ alignSelf: 'flex-end' }} variant='body2'>{label}</Typography>
    <Typography variant='body2'>{value}</Typography>
  </div>

const ExpenseButton = ({ onClick }) => <Button onClick={onClick} style={{ width: '100%' }} variant='contained' color='primary'>Nuevo Gasto</Button>

export default MainContainer