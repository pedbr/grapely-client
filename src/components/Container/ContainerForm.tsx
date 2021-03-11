import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useMutation, useQueryClient } from 'react-query'
import { post } from 'api'
import endpoints from 'api/endpoints'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
}))

interface Props {
  closeDialog: () => void
  wineryId: string
}

const ContainerForm = ({ closeDialog, wineryId }: Props) => {
  const classes = useStyles()
  const { handleSubmit, register, errors } = useForm()
  const queryClient = useQueryClient()
  const mutation = useMutation(
    (data: any) => post(endpoints.addContainer, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('containers')
        closeDialog()
      },
    }
  )
  const { isLoading } = mutation

  const onSubmit = (data: any) => {
    const { name, capacity, type } = data
    const container = {
      name,
      capacity,
      type,
      wineryId,
    }
    mutation.mutate(container)
  }

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name={'name'}
              label={'Container Name'}
              type={'text'}
              variant={'outlined'}
              inputRef={register({ required: 'This field is required' })}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name={'capacity'}
              label={'Capacity'}
              type={'number'}
              variant={'outlined'}
              inputRef={register({ required: 'This field is required' })}
              error={Boolean(errors.capacity)}
              helperText={errors.capacity?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name={'type'}
              label={'Type'}
              type={'text'}
              variant={'outlined'}
              inputRef={register({ required: 'This field is required' })}
              error={Boolean(errors.type)}
              helperText={errors.type?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Button disabled={isLoading} variant={'contained'} type='submit'>
              Create Container
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default ContainerForm
