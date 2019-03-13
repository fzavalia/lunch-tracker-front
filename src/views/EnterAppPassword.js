import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core'
import TextField from '../components/TextField';
import api from '../api';

const EnterAppPasswordContainer = ({ history }) =>
  <EnterAppPassword
    onSubmit={password =>
      api.tokens.create(password)
        .then(() => history.goBack())}
  />


const EnterAppPassword = ({ onSubmit }) => {

  const [password, setPassword] = useState(0)

  return (
    <>

      <Typography
        style={{ marginBottom: 10 }}
        variant='h4'
        align='center'
      >
        Ingreso
      </Typography>

      <TextField
        style={{ marginBottom: 10 }}
        value={password}
        onChange={e => setPassword(e.target.value)}
        label='Escriba la contraseña de la app para poder acceder'
        fullWidth
      />

      <Button
        style={{ width: '100%' }}
        onClick={() => onSubmit(password, year, month)}
        variant='contained'
        color='primary'
      >
        Enviar
      </Button>

    </>
  )
}

export default EnterAppPasswordContainer