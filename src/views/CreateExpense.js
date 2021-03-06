import React, { useState, useEffect } from 'react';
import { Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@material-ui/core'
import { DatePicker } from 'material-ui-pickers'
import TextField from '../components/TextField';
import api from '../api';
import useCurrentUser from '../hooks/useCurrentUser';

const useRestaurants = () => {

  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    api.restaurant.list(1, 99)
      .then(setRestaurants)
  }, [])

  return restaurants
}

const NewExpenseContainer = ({ history }) => {

  const currentUser = useCurrentUser()

  return (
    <NewExpense
      restaurants={useRestaurants()}
      onCreateRestaurant={() => history.push('/restaurants/create')}
      onSubmit={(amount, date, restaurant) =>
        api.expense.create(amount, date, currentUser.id, restaurant.id)
          .then(() => history.goBack())}
    />
  )
}


const NewExpense = ({ restaurants, onCreateRestaurant, onSubmit }) => {

  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState(new Date())
  const [restaurant, setRestaurant] = useState('')

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
        label="Fecha"
        value={date}
        onChange={setDate}
        animateYearScrolling
      />

      <TextField
        style={{ marginBottom: 10 }}
        value={amount}
        type='positiveNumber'
        onChange={e => setAmount(e.target.value)}
        label='Pesos'
        fullWidth
      />

      <FormControl style={{ marginBottom: 10 }} fullWidth>
        <InputLabel>Seleccione el Restaurant</InputLabel>
        <Select value={restaurant} onChange={e => setRestaurant(e.target.value)}>
          {restaurants.map(restaurant => <MenuItem key={restaurant.id} value={restaurant}>{restaurant.name}</MenuItem>)}
        </Select>
      </FormControl>

      <Button
        style={{ width: '100%', marginBottom: 10 }}
        onClick={onCreateRestaurant}
        variant='contained'
        color='primary'
      >
        Crear Restaurant
      </Button>

      <Button
        style={{ width: '100%' }}
        onClick={() => onSubmit(amount, date, restaurant)}
        variant='contained'
        color='primary'
      >
        Enviar
      </Button>

    </>
  )
}

export default NewExpenseContainer