import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core'
import TextField from '../components/TextField';
import api from '../api';

const CreateRestaurantContainer = ({ history }) =>
  <CreateRestaurant
    onSubmit={(name) =>
      api.restaurant.create(name)
        .then(() => history.push('/main'))}
  />


const CreateRestaurant = ({ onSubmit }) => {

  const [name, setName] = useState('')

  return (
    <>

      <Typography
        style={{ marginBottom: 10 }}
        variant='h4'
        align='center'
      >
        Agregar Restaurant
      </Typography>

      <TextField
        style={{ marginBottom: 10 }}
        value={name}
        onChange={e => setName(e.target.value)}
        label='Nombre'
        fullWidth
      />

      <Button
        style={{ width: '100%' }}
        onClick={() => onSubmit(name)}
        variant='contained'
        color='primary'
      >
        Enviar
      </Button>

    </>
  )
}

export default CreateRestaurantContainer