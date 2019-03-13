import user from './user'
import budget from './budget'
import restaurant from './restaurant'
import expense from './expense'
import tokens from './tokens'

const host = process.env.REACT_APP_API_HOST || 'http://localhost:8000'

export default {
  user: user(host),
  budget: budget(host),
  restaurant: restaurant(host),
  expense: expense(host),
  tokens: tokens(host),
}