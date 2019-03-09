import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UserSelection from './views/UserSelection';
import Main from './views/Main';
import NewExpense from './views/NewExpense';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/user' component={UserSelection}/>
          <Route path='/main' render={props => <Main onExpenseButtonClick={() => props.history.push('/expense')} />} />
          <Route path='/expense' render={props => <NewExpense onSubmitExpense={() => props.history.push('/main')} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
