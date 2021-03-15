import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'
import { useDispatch } from 'react-redux'
import { authenticateUser } from 'redux/actions/authActions'
import { BASE_URL } from 'api/requestWrappers'
import endpoints from 'api/endpoints'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  formTitle: {
    padding: theme.spacing(4),
    textAlign: 'center',
    fontWeight: theme.typography.fontWeightBold,
  },
}))

const LoginForm = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, errors } = useForm()
  const dispatch = useDispatch()
  const onSubmit = async (data: any) => {
    setLoading(true)
    await axios({ method: 'post', url: `${BASE_URL}${endpoints.login}`, data })
      .then((res) => {
        localStorage.setItem('FBIdToken', `Bearer ${res?.data.token}`)
        dispatch(authenticateUser())
      })
      .catch((err) => {
        console.log(err.response.data)
      })
    setLoading(false)
  }

  return (
    <Grid container justify={'center'} alignItems={'center'}>
      <Grid item xs={5}>
        <div className={classes.formTitle}>Welcome back!</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container justify={'center'} spacing={6}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name={'email'}
                label={'E-mail'}
                type={'text'}
                variant={'outlined'}
                inputRef={register({ required: 'This field is required' })}
                error={Boolean(errors.email)}
                helperText={errors?.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name={'password'}
                label={'Password'}
                type={'password'}
                variant={'outlined'}
                inputRef={register({ required: 'This field is required' })}
                error={Boolean(errors.password)}
                helperText={errors?.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button disabled={loading} variant={'contained'} type='submit'>
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default LoginForm
