import user from './user'
import budget from './budget'
import restaurant from './restaurant'

const host = 'http://localhost:8000'

export default {
  user: user(host),
  budget: budget(host),
  restaurant: restaurant(host),
}