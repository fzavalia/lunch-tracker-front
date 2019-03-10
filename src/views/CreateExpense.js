import React, { useState } from 'react';
import { Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import TextField from '../components/TextField';

const NewExpense = ({ onSubmitExpense }) => {

  const [expense, setExpense] = useState(0)
  const [restaurant, setRestaurant] = useState('')

  return (
    <>
      <TextField value={expense} type='positiveNumber' onChange={e => setExpense(e.target.value)} label='Ingrese el monto del gasto' fullWidth />
      <FormControl fullWidth>
        <InputLabel>Seleccione el Restaurant</InputLabel>
        <Select value={restaurant} onChange={e => setRestaurant(e.target.value)}>
          <MenuItem value={1}>Amelia</MenuItem>
          <MenuItem value={2}>De Copas y Tapas</MenuItem>
          <MenuItem value={3}>La Parolaccia</MenuItem>
        </Select>
      </FormControl>
      <Button onClick={onSubmitExpense} style={{ width: '100%' }} variant='contained' color='primary'>Enviar</Button>
    </>
  )
}

export default NewExpense