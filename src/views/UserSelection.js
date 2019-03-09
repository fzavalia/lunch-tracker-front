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
    onContinue={(user) => {
      if (user) {
        history.push('/main')
      }
    }}
    users={useUsers(1, 99)}
  />

const UserSelection = ({ onContinue, users }) => {

  const [user, setUser] = useState('')

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Elija el usuario con el cual ingresar</InputLabel>
        <Select value={user} onChange={e => setUser(e.target.value)}>
          {users.map(user => <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>)}
        </Select>
      </FormControl>
      <Button onClick={() => onContinue(user)} style={{ width: '100%' }} variant='contained' color='primary'>Continuar</Button>
    </>
  )
}

export default UserSelectionContainer