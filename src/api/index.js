import user from './requests/user'
import budget from './requests/budget'
import restaurant from './requests/restaurant'
import expense from './requests/expense'
import tokens from './requests/tokens'

const host = process.env.REACT_APP_API_HOST

if (!host) {
  throw new Error('REACT_APP_API_HOST env var not defined')
}

const api = {
  user: user(host),
  budget: budget(host),
  restaurant: restaurant(host),
  expense: expense(host),
  tokens: tokens(host),
}

export default api