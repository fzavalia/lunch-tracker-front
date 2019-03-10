import { useState, useEffect } from "react";
import api from "../api";

let currentUser

export const loadPersistedUser = async () => {

  const persistedUser = localStorage.getItem('currentUser')

  if (persistedUser) {
    const updatedUser = await api.user.show(JSON.parse(persistedUser).id)
    setCurrentUser(updatedUser)
  }
}

export const setCurrentUser = user => {
  currentUser = user
  localStorage.setItem('currentUser', JSON.stringify(user))
  subscriptions.forEach(subscription => subscription(currentUser))
}

const subscriptions = []

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

export default useCurrentUser