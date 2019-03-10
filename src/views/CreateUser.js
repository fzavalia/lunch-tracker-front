import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core';

const CreateUserContainer = ({ history }) => <CreateUser onSubmit={() => history.goBack()} />

const CreateUser = ({ onSubmit }) => {

  const [name, setName] = useState('')

  return (
    <>
      <TextField label='Nombre' value={name} onChange={e => setName(e.target.value)} fullWidth/>
      <Button onClick={() => onSubmit(name)} style={{ width: '100%' }} variant='contained' color='primary'>Enviar</Button>
    </>
  )
}


export default CreateUserContainer