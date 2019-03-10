import React, { useState, useEffect } from 'react';
import { Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@material-ui/core'
import api from '../api';
import { setCurrentUser } from '../hooks/useCurrentUser';

const useUsers = (page, perPage) => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    api.user.list(page, perPage)
      .then(setUsers)
  }, [page, perPage])

  return users
}

const UserSelectionContainer = ({ history }) =>
  <UserSelection
    onUserSelected={user => {
      if (user) {
        history.push('/main')
        setCurrentUser(user)
      }
    }}
    onCreateUser={() => {
      history.push('/users/create')
    }}
    users={useUsers(1, 99)}
  />

const UserSelection = ({ onUserSelected, onCreateUser, users }) => {

  const [user, setUser] = useState('')

  return (
    <>
      <Typography style={{ marginBottom: 10 }} variant='h4' align='center'>Seleccionar Usuario</Typography>
      <FormControl style={{ marginBottom: 10 }} fullWidth>
        <InputLabel>Elija el usuario con el cual ingresar</InputLabel>
        <Select value={user} onChange={e => setUser(e.target.value)}>
          {users.map(user => <MenuItem key={user.id} value={user}>{user.name}</MenuItem>)}
        </Select>
      </FormControl>
      <Button style={{ width: '100%', marginBottom: 10 }} onClick={() => onUserSelected(user)} variant='contained' color='primary'>Ingresar</Button>
      <Button style={{ width: '100%' }} onClick={onCreateUser} variant='contained' color='primary'>Crear Usuario</Button>
    </>
  )
}

export default UserSelectionContainer