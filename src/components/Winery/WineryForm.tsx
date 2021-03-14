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
  selectedWinery?: any
  mode: string
}

const WineryForm = ({ closeDialog, selectedWinery, mode }: Props) => {
  const classes = useStyles()
  const { handleSubmit, register, errors } = useForm()
  const queryClient = useQueryClient()

  const getRequestType = () => {
    if (mode === EDIT_MODE && selectedWinery) {
      return patch
    }
    return post
  }

  const getEndpoint = () => {
    if (mode === EDIT_MODE && selectedWinery) {
      return endpoints.editWinery(selectedWinery.id)
    }
    return endpoints.addWinery
  }

  const request = getRequestType()

  const mutation = useMutation((data) => request(getEndpoint(), data), {
    onSuccess: () => {
      queryClient.invalidateQueries('wineries')
      closeDialog()
    },
  })
  const { isLoading } = mutation

  const onSubmit = async (data: any) => {
    await mutation.mutate(data)
  }

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name={'name'}
              label={'Winery Name'}
              type={'text'}
              variant={'outlined'}
              inputRef={register({ required: 'This field is required' })}
              defaultValue={selectedWinery?.name}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name={'location'}
              label={'Location'}
              type={'text'}
              variant={'outlined'}
              inputRef={register({ required: 'This field is required' })}
              defaultValue={selectedWinery?.location}
              error={Boolean(errors.location)}
              helperText={errors.location?.message}
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

export default WineryForm
