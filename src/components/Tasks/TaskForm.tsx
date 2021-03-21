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
  parentId: string
  selectedTask?: any
  mode: string
}

const TaskForm = ({ closeDialog, parentId, selectedTask, mode }: Props) => {
  const classes = useStyles()
  const { handleSubmit, register, errors } = useForm()
  const queryClient = useQueryClient()

  const getRequestType = () => {
    if (mode === EDIT_MODE && selectedTask) {
      return patch
    }
    return post
  }

  const getEndpoint = () => {
    if (mode === EDIT_MODE && selectedTask) {
      return endpoints.editTask(selectedTask.id)
    }
    return endpoints.addTask
  }

  const request = getRequestType()

  const mutation = useMutation((data: any) => request(getEndpoint(), data), {
    onSuccess: () => {
      queryClient.invalidateQueries(`tasks-${parentId}`)
      closeDialog()
    },
  })
  const { isLoading } = mutation

  const onSubmit = (data: any) => {
    const { title, description, status, dueDate } = data
    const task = {
      title,
      description,
      status,
      dueDate,
      parentId,
    }
    mutation.mutate(task)
  }

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name={'title'}
              label={'Title'}
              type={'text'}
              variant={'outlined'}
              inputRef={register({ required: 'This field is required' })}
              defaultValue={selectedTask?.title}
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name={'description'}
              label={'Description'}
              multiline
              type={'text'}
              variant={'outlined'}
              inputRef={register({ required: 'This field is required' })}
              defaultValue={selectedTask?.description}
              error={Boolean(errors.description)}
              helperText={errors.description?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name={'status'}
              label={'Status'}
              type={'text'}
              variant={'outlined'}
              inputRef={register({ required: 'This field is required' })}
              defaultValue={selectedTask?.status}
              error={Boolean(errors.status)}
              helperText={errors.status?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name={'dueDate'}
              label={'Due Date'}
              type={'text'}
              variant={'outlined'}
              inputRef={register({ required: 'This field is required' })}
              defaultValue={selectedTask?.dueDate}
              error={Boolean(errors.dueDate)}
              helperText={errors.dueDate?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Button disabled={isLoading} variant={'contained'} type='submit'>
              {mode === CREATE_MODE ? 'Create Task' : 'Save Changes'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default TaskForm
