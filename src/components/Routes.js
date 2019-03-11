import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import UserSelection from '../views/UserSelection';
import Main from '../views/Main';
import CreateExpense from '../views/CreateExpense';
import CreateUser from '../views/CreateUser';
import useCurrentUser from '../hooks/useCurrentUser';
import CreateRestaurant from '../views/CreateRestaurant';
import CreateBudget from '../views/CreateBudget';

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
        <Route exact path='/restaurants/create' component={CreateRestaurant} />
        <Route exact path='/budgets/create' component={CreateBudget} />
        <Route render={() => <Redirect to='/main' />} />
      </Switch>
    </Router>
  )
}

export default Routes;
