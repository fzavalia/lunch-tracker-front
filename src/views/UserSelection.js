import React, { useState, useEffect } from 'react';
import { Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@material-ui/core'
import api from '../api';
import useCurrentUser, { setCurrentUser } from '../hooks/useCurrentUser';

const useUsers = (page, perPage) => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    api.user.list(page, perPage)
      .then(setUsers)
  }, [page, perPage])

  return users
}

const UserSelectionContainer = ({ history }) => {

  const users = useUsers(1, 99)
  const currentUser = useCurrentUser()

  return (
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
      users={users}
      defaultUserId={currentUser ? currentUser.id : undefined}
    />)
}

const UserSelection = ({ onUserSelected, onCreateUser, users, defaultUserId = '' }) => {

  const [selectedUserId, setSelectedUserId] = useState(defaultUserId)

  return (
    <>

      <Typography style={{ marginBottom: 10 }} variant='h4' align='center'>Seleccionar Usuario</Typography>

      <FormControl style={{ marginBottom: 10 }} fullWidth>
        <InputLabel>Elija el usuario con el cual ingresar</InputLabel>
        <Select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)}>
          {users.map(user => <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>)}
        </Select>
      </FormControl>

      <Button
        style={{ width: '100%', marginBottom: 10 }}
        onClick={() => onUserSelected(users.find(user => user.id === selectedUserId))}
        variant='contained'
        color='primary'
      >
        Ingresar
      </Button>

      <Button
        style={{ width: '100%' }}
        onClick={onCreateUser}
        variant='contained'
        color='primary'
      >
        Crear Usuario
      </Button>

    </>
  )
}

export default UserSelectionContainer