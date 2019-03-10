import React, { useState } from 'react';
import { Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@material-ui/core'
import TextField from '../components/TextField';
import { DatePicker } from 'material-ui-pickers'

const NewExpenseContainer = ({ history }) =>
  <NewExpense onSubmit={() => history.push('/main')} />

const NewExpense = ({ restaurants, onSubmit }) => {

  const [expense, setExpense] = useState(0)
  const [restaurant, setRestaurant] = useState('')
  const [date, setDate] = useState(new Date())

  return (
    <>

      <Typography
        style={{ marginBottom: 10 }}
        variant='h4'
        align='center'
      >
        Nuevo Gasto
      </Typography>

      <DatePicker
        style={{ width: '100%', marginBottom: 10 }}
        label="Basic example"
        value={date}
        onChange={setDate}
        animateYearScrolling
      />

      <TextField
        style={{ marginBottom: 10 }}
        value={expense}
        type='positiveNumber'
        onChange={e => setExpense(e.target.value)}
        label='Ingrese el monto del gasto'
        fullWidth
      />

      <FormControl style={{ marginBottom: 10 }} fullWidth>
        <InputLabel>Seleccione el Restaurant</InputLabel>
        <Select value={restaurant} onChange={e => setRestaurant(e.target.value)}>
          <MenuItem value={1}>Amelia</MenuItem>
          <MenuItem value={2}>De Copas y Tapas</MenuItem>
          <MenuItem value={3}>La Parolaccia</MenuItem>
        </Select>
      </FormControl>

      <Button
        style={{ width: '100%' }}
        onClick={onSubmit}
        variant='contained'
        color='primary'
      >
        Enviar
      </Button>
    </>
  )
}

export default NewExpenseContainer