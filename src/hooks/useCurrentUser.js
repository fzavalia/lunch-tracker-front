import { useState, useEffect } from "react";
import api from "../api";

let currentUser

const subscriptions = []

export const loadPersistedUser = async () => {
  if (hasPersistedUser()) {
    const validatedUser = await validatePersistedUser(getPersistedUser())
    setCurrentUser(validatedUser)
  }
}

export const setCurrentUser = user => {
  currentUser = user
  localStorage.setItem('currentUser', JSON.stringify(user))
  subscriptions.forEach(subscription => subscription(currentUser))
}

const useCurrentUser = () => {

  const [user, setUser] = useState(currentUser)

  useEffect(() => {
    
    const setUserSubscription = newCurrentUser => setUser(newCurrentUser)
    subscriptions.push(setUserSubscription)

    return () => {
      subscriptions.splice(subscriptions.indexOf(setUserSubscription), 1)
    }
  }, [])

  return user
}

const hasPersistedUser = () => Boolean(localStorage.getItem('currentUser'))

const getPersistedUser = () => {

  const userInLocalStorage = localStorage.getItem('currentUser')

  if (userInLocalStorage) {
    return JSON.parse(userInLocalStorage)
  }

  return null
}

const validatePersistedUser = persistedUser => api.user.show(persistedUser.id)

export default useCurrentUser