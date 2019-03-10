import React, { useState, useEffect } from 'react';
import { Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import api from '../api';

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
    onUserSelected={(user) => {
      if (user) {
        history.push('/main')
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
      <FormControl fullWidth>
        <InputLabel>Elija el usuario con el cual ingresar</InputLabel>
        <Select value={user} onChange={e => setUser(e.target.value)}>
          {users.map(user => <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>)}
        </Select>
      </FormControl>
      <Button onClick={() => onUserSelected(user)} style={{ width: '100%' }} variant='contained' color='primary'>Continuar</Button>
      <Button onClick={onCreateUser} style={{ width: '100%' }} variant='contained' color='primary'>Crear Usuario</Button>
    </>
  )
}

export default UserSelectionContainer