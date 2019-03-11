import React, { useState } from 'react';
import { Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import TextField from '../components/TextField';
import api from '../api';
import moment from 'moment'
import * as constants from '../constants';

const CreateBudgetContainer = ({ history }) =>
  <CreateBudget
    months={constants.months}
    onSubmit={(amount, year, month) =>
      api.budget.create(amount, year, month)
        .then(() => history.push('/main'))}
  />


const CreateBudget = ({ months, onSubmit }) => {

  const now = moment()

  const [year, setYear] = useState(now.year())
  const [month, setMonth] = useState(now.month())
  const [amount, setAmount] = useState(0)

  return (
    <>

      <Typography
        style={{ marginBottom: 10 }}
        variant='h4'
        align='center'
      >
        Nuevo Presupuesto
      </Typography>

      <TextField
        style={{ marginBottom: 10 }}
        value={year}
        type='positiveNumber'
        onChange={e => setYear(e.target.value)}
        label='Año'
        fullWidth
      />

      <FormControl style={{ marginBottom: 10 }} fullWidth>
        <InputLabel>Mes</InputLabel>
        <Select value={month} onChange={e => setMonth(e.target.value)}>
          {months.map((month, i) => <MenuItem key={i} value={i}>{month}</MenuItem>)}
        </Select>
      </FormControl>

      <TextField
        style={{ marginBottom: 10 }}
        value={amount}
        type='positiveNumber'
        onChange={e => setAmount(e.target.value)}
        label='Pesos'
        fullWidth
      />

      <Button
        style={{ width: '100%' }}
        onClick={() => onSubmit(amount, year, month)}
        variant='contained'
        color='primary'
      >
        Enviar
      </Button>

    </>
  )
}

export default CreateBudgetContainer