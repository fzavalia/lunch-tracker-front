import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import UserSelection from './views/UserSelection';
import Main from './views/Main';
import NewExpense from './views/NewExpense';
import CreateUser from './views/CreateUser';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/user/create' component={CreateUser}/>
          <Route path='/user' component={UserSelection}/>
          <Route path='/main' render={props => <Main onExpenseButtonClick={() => props.history.push('/expense')} />} />
          <Route path='/expense' render={props => <NewExpense onSubmitExpense={() => props.history.push('/main')} />} />
          <Route render={() => <Redirect to='/user' />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
