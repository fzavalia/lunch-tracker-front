import user from './user'
import budget from './budget'

const host = 'http://localhost:8000'

export default {
  user: user(host),
  budget: budget(host),
}