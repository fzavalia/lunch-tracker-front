import React, { useState, useEffect } from 'react';
import { loadPersistedUser } from './hooks/useCurrentUser';
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from '@date-io/moment';
import Routes from './components/Routes';

const Layout = ({ children }) =>
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: '100%', maxWidth: 400 }}>
      {children}
    </div>
  </div>

const App = () => {

  const [loadingPersistedUser, setLoadingPersistedUser] = useState(true)

  useEffect(() => {
    loadPersistedUser().finally(() => setLoadingPersistedUser(false))
  }, [])

  if (loadingPersistedUser) return null

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Layout>
        <Routes />
      </Layout>
    </MuiPickersUtilsProvider>
  )
}

export default App;
