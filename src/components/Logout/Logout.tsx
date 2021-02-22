import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { auth } from '../../constants/paths'

const Logout = () => {
  const token = localStorage.FBIdToken

  useEffect(() => {
    localStorage.removeItem('FBIdToken')
  }, [token])

  return <div>{token ? <div>Loading</div> : <Redirect to={auth} />}</div>
}

export default Logout
