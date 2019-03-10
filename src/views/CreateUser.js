import React, { useState } from 'react'
import { TextField, Button, Typography } from '@material-ui/core';
import api from '../api';

const CreateUserContainer = ({ history }) => <CreateUser onSubmit={(name) =>
  api.user.create(name)
    .then(() => history.goBack())} />

const CreateUser = ({ onSubmit }) => {

  const [name, setName] = useState('')

  return (
    <>
      <Typography style={{ marginBottom: 10 }} variant='h4' align='center'>Crear Usuario</Typography>
      <TextField style={{ marginBottom: 10 }} label='Nombre' value={name} onChange={e => setName(e.target.value)} fullWidth />
      <Button style={{ width: '100%' }} onClick={() => onSubmit(name)} variant='contained' color='primary'>Enviar</Button>
    </>
  )
}


export default CreateUserContainer