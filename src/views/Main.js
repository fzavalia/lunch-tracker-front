import React from 'react';
import { Typography, Button } from '@material-ui/core'

const Main = ({ onExpenseButtonClick }) =>
  <>
    <Value label='Usuario' value='Fernando Zavalia' />
    <Value label='Año' value='2019' />
    <Value label='Mes' value='Abril' />
    <Value label='Presupuesto' value='15000' />
    <Value label='Gastado' value='12200' />
    <Value label='Mis Gastos' value='1340' />
    <ExpenseButton onClick={onExpenseButtonClick} />
  </>

const Value = ({ label, value }) =>
  <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
    <Typography style={{ alignSelf: 'flex-end' }} variant='body2'>{label}</Typography>
    <Typography variant='body2'>{value}</Typography>
  </div>

const ExpenseButton = ({ onClick }) => <Button onClick={onClick} style={{ width: '100%' }} variant='contained' color='primary'>Nuevo Gasto</Button>

export default Main