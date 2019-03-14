import api from ".";

export const getAuthHeader = () => ({ 'Authorization': getBearer() })

const authBeforeRequest = async req => {

  if (!hasToken()) {

    const password = prompt('password')

    if (password === null) {
      throw new Error('Auth canceled')
    }

    const token = await api.tokens.create(password)

    setToken(token)
  }

  return await req()
}

export default authBeforeRequest

const getBearer = () => 'Bearer ' + getToken()

const getToken = () => sessionStorage.getItem('token')

const setToken = token => sessionStorage.setItem('token', token)

const hasToken = () => Boolean(getToken())