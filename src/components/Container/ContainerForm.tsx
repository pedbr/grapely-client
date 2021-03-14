import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useMutation, useQueryClient } from 'react-query'
import { post, patch } from 'api'
import endpoints from 'api/endpoints'

const CREATE_MODE = 'create'
const EDIT_MODE = 'edit'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
}))

interface Props {
  closeDialog: () => void
  wineryId: string
  selectedContainer?: any
  mode: string
}

const ContainerForm = ({
  closeDialog,
  wineryId,
  selectedContainer,
  mode,
}: Props) => {
  const classes = useStyles()
  const { handleSubmit, register, errors } = useForm()
  const queryClient = useQueryClient()

  const getRequestType = () => {
    if (mode === EDIT_MODE && selectedContainer) {
      return patch
    }
    return post
  }

  const getEndpoint = () => {
    if (mode === EDIT_MODE && selectedContainer) {
      return endpoints.editContainer(selectedContainer.id)
    }
    return endpoints.addContainer
  }

  const request = getRequestType()

  const mutation = useMutation((data: any) => request(getEndpoint(), data), {
    onSuccess: () => {
      queryClient.invalidateQueries(`containers-${wineryId}`)
      closeDialog()
    },
  })
  const { isLoading } = mutation

  const onSubmit = (data: any) => {
    const { name, capacity, type } = data
    const container = {
      name,
      capacity,
      type,
      currentWineryId: wineryId,
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
              defaultValue={selectedContainer?.name}
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
              defaultValue={selectedContainer?.capacity}
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
              defaultValue={selectedContainer?.type}
              error={Boolean(errors.type)}
              helperText={errors.type?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Button disabled={isLoading} variant={'contained'} type='submit'>
              {mode === CREATE_MODE ? 'Create Winery' : 'Save Changes'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default ContainerForm
