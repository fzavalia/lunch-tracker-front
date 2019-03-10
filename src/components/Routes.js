import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import UserSelection from '../views/UserSelection';
import Main from '../views/Main';
import CreateExpense from '../views/CreateExpense';
import CreateUser from '../views/CreateUser';
import useCurrentUser from '../hooks/useCurrentUser';

const Routes = () => {

  const currentUser = useCurrentUser()

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
        <Route exact path='/expenses/create' component={CreateExpense} />
        <Route render={() => <Redirect to='/main' />} />
      </Switch>
    </Router>
  )
}

export default Routes;