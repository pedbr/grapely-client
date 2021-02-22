import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import jwtDecode from 'jwt-decode'
import { winery } from '../../constants/paths'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
  },
  button: {
    textAlign: 'center',
    padding: theme.spacing(4),
  },
}))

const AuthenticationScene = () => {
  const classes = useStyles()
  const [activeForm, setActiveForm] = useState('login')

  const token = localStorage.FBIdToken
  useEffect(() => {}, [token])
  if (token) {
    const decodedToken: any = jwtDecode(token)
    if (decodedToken.exp * 1000 > Date.now()) {
      return <Redirect to={winery} />
    }
  }

  return (
    <div className={classes.container}>
      {activeForm === 'login' ? (
        <>
          <LoginForm />
          <div className={classes.button}>
            <Button size={'small'} onClick={() => setActiveForm('signup')}>
              I don&apos;t have an account
            </Button>
          </div>
        </>
      ) : (
        <>
          <SignupForm />
          <div className={classes.button}>
            <Button size={'small'} onClick={() => setActiveForm('login')}>
              I already have an account
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default AuthenticationScene
