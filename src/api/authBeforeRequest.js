import api from ".";

export const getAuthHeader = () => ({ 'Authorization': getBearer() })

const authBeforeRequest = async req => {

  if (!hasToken()) {

    const password = prompt('password')

    if (password === null) {
      return await Promise.reject('Auth canceled')
    }

    try {
      const token = await api.tokens.create(password)
      setToken(token)
    } catch (e) {
      return await authBeforeRequest(req)
    }
  }

  try {
    return await req()
  } catch (e) {
    if (e.status === 401) {
      deleteToken()
      return await authBeforeRequest(req)
    }
    return await Promise.reject(e)
  }
}

export default authBeforeRequest

const getBearer = () => 'Bearer ' + getToken()

const getToken = () => sessionStorage.getItem('token')

const setToken = token => sessionStorage.setItem('token', token)

const deleteToken = () => sessionStorage.removeItem('token')

const hasToken = () => Boolean(getToken())