import React, { useState } from 'react';
import { Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'

const UserSelectionContainer = ({ history }) =>
  <UserSelection
    onContinue={(user) => {
      if (user) {
        history.push('/main')
      }
    }}
    users={[
      { id: 1, name: 'Fernando Zavalia' },
      { id: 2, name: 'Santiago Toscano' },
      { id: 3, name: 'Hernando Scheidl' }
    ]}
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