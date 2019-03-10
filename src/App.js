import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import UserSelection from './views/UserSelection';
import Main from './views/Main';
import NewExpense from './views/NewExpense';
import CreateUser from './views/CreateUser';
import useCurrentUser, { loadPersistedUser } from './hooks/useCurrentUser';

const App = () => {

  const [loadingPersistedUser, setLoadingPersistedUser] = useState(true)

  useEffect(() => {
    loadPersistedUser().finally(() => setLoadingPersistedUser(false))
  }, [])

  const currentUser = useCurrentUser()

  if (loadingPersistedUser) return null

  if (!currentUser) {
    return (
      <Router>
        <Switch>
          <Route exact path='/users' component={UserSelection} />
          <Route exact path='/users/create' component={CreateUser} />
          <Route render={() => <Redirect to='/users' />} />
        </Switch>
      </Router>
    )
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/users' component={UserSelection} />
        <Route exact path='/users/create' component={CreateUser} />
        <Route exact path='/main' component={Main} />
        <Route exact path='/expense' render={props => <NewExpense onSubmitExpense={() => props.history.push('/main')} />} />
        <Route render={() => <Redirect to='/main' />} />
      </Switch>
    </Router>
  )
}

export default App;
