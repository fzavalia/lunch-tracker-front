import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import UserSelection from './views/UserSelection';
import Main from './views/Main';
import CreateExpense from './views/CreateExpense';
import CreateUser from './views/CreateUser';
import useCurrentUser, { loadPersistedUser } from './hooks/useCurrentUser';
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from '@date-io/moment';
import Routes from './components/Routes';

const App = () => {

  const [loadingPersistedUser, setLoadingPersistedUser] = useState(true)

  useEffect(() => {
    loadPersistedUser().finally(() => setLoadingPersistedUser(false))
  }, [])

  if (loadingPersistedUser) return null

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Routes />
    </MuiPickersUtilsProvider>
  )
}

export default App;
