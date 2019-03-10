import user from './user'
import budget from './budget'
import restaurant from './restaurant'
import expense from './expense'

const host = 'http://localhost:8000'

export default {
  user: user(host),
  budget: budget(host),
  restaurant: restaurant(host),
  expense: expense(host),
}