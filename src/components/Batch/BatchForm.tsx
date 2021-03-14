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
  containerId: string
  selectedBatch?: any
  mode: string
}

const BatchForm = ({
  closeDialog,
  containerId,
  selectedBatch,
  mode,
}: Props) => {
  const classes = useStyles()
  const { handleSubmit, register, errors } = useForm()
  const queryClient = useQueryClient()

  const getRequestType = () => {
    if (mode === EDIT_MODE && selectedBatch) {
      return patch
    }
    return post
  }

  const getEndpoint = () => {
    if (mode === EDIT_MODE && selectedBatch) {
      return endpoints.editBatch(selectedBatch.id)
    }
    return endpoints.addBatch
  }

  const request = getRequestType()

  const mutation = useMutation((data: any) => request(getEndpoint(), data), {
    onSuccess: () => {
      queryClient.invalidateQueries(`batches-${containerId}`)
      closeDialog()
    },
  })
  const { isLoading } = mutation

  const onSubmit = (data: any) => {
    const {
      name,
      amount,
      year,
      product,
      type,
      targetTemperature,
      startDate,
      estimatedEndDate,
      endDate,
    } = data
    const batch = {
      name,
      amount,
      year,
      product,
      type,
      targetTemperature,
      startDate,
      estimatedEndDate,
      endDate,
      currentContainerId: containerId,
    }
    mutation.mutate(batch)
  }

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name={'name'}
              label={'Batch Name'}
              type={'text'}
              variant={'outlined'}
              inputRef={register({ required: 'This field is required' })}
              defaultValue={selectedBatch?.name}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name={'amount'}
              label={'Amount'}
              type={'number'}
              variant={'outlined'}
              inputRef={register({ required: 'This field is required' })}
              defaultValue={selectedBatch?.amount}
              error={Boolean(errors.amount)}
              helperText={errors.amount?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name={'year'}
              label={'Year'}
              type={'number'}
              variant={'outlined'}
              inputRef={register({ required: 'This field is required' })}
              defaultValue={selectedBatch?.year}
              error={Boolean(errors.year)}
              helperText={errors.year?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name={'product'}
              label={'Product'}
              type={'text'}
              variant={'outlined'}
              inputRef={register({ required: 'This field is required' })}
              defaultValue={selectedBatch?.product}
              error={Boolean(errors.product)}
              helperText={errors.product?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name={'type'}
              label={'Product Type'}
              type={'text'}
              variant={'outlined'}
              inputRef={register({ required: 'This field is required' })}
              defaultValue={selectedBatch?.type}
              error={Boolean(errors.type)}
              helperText={errors.type?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name={'targetTemperature'}
              label={'Target Temperature'}
              type={'number'}
              variant={'outlined'}
              inputRef={register({ required: 'This field is required' })}
              defaultValue={selectedBatch?.targetTemperature}
              error={Boolean(errors.targetTemperature)}
              helperText={errors.targetTemperature?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name={'startDate'}
              label={'Start Date'}
              type={'text'}
              variant={'outlined'}
              inputRef={register({ required: 'This field is required' })}
              defaultValue={selectedBatch?.startDate}
              error={Boolean(errors.startDate)}
              helperText={errors.startDate?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name={'estimatedEndDate'}
              label={'Estimated End Date'}
              type={'text'}
              variant={'outlined'}
              inputRef={register({ required: 'This field is required' })}
              defaultValue={selectedBatch?.estimatedEndDate}
              error={Boolean(errors.estimatedEndDate)}
              helperText={errors.estimatedEndDate?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name={'endDate'}
              label={'End Date'}
              type={'text'}
              variant={'outlined'}
              inputRef={register({ required: 'This field is required' })}
              defaultValue={selectedBatch?.endDate}
              error={Boolean(errors.endDate)}
              helperText={errors.endDate?.message}
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

export default BatchForm
