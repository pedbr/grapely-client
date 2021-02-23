import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { auth } from '../../constants/paths'
import { useDispatch, useSelector } from 'react-redux'
import { revokeAuthentication } from '../../redux/actions/authActions'
import { getAuthenticated } from '../../redux/selectors/authSelectors'

const Logout = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(getAuthenticated)

  useEffect(() => {
    localStorage.removeItem('FBIdToken')
    dispatch(revokeAuthentication())
  }, [])

  return (
    <div>{isAuthenticated ? <div>Loading</div> : <Redirect to={auth} />}</div>
  )
}

export default Logout
