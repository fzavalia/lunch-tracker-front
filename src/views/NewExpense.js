import React, { useState } from 'react';
import { Button, Select, MenuItem, FormControl, InputLabel, TextField } from '@material-ui/core'

const NewExpense = ({ onSubmitExpense }) => {

  const [expense, setExpense] = useState(0)
  const [restaurant, setRestaurant] = useState('')

  const onChange = e => {

    let value = e.target.value

    if (!value) {
      setExpense(value)
    } else {
      setExpense(Math.max(0, e.target.value))
    }
  }

  return (
    <>
      <TextField value={expense} type='number' onChange={onChange} label='Ingrese el monto del gasto' fullWidth />
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