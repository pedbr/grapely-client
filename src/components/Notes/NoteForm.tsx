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
  selectedNote?: any
  mode: string
}

const NoteForm = ({ closeDialog, parentId, selectedNote, mode }: Props) => {
  const classes = useStyles()
  const { handleSubmit, register, errors } = useForm()
  const queryClient = useQueryClient()

  const getRequestType = () => {
    if (mode === EDIT_MODE && selectedNote) {
      return patch
    }
    return post
  }

  const getEndpoint = () => {
    if (mode === EDIT_MODE && selectedNote) {
      return endpoints.editNote(selectedNote.id)
    }
    return endpoints.addNote
  }

  const request = getRequestType()

  const mutation = useMutation((data: any) => request(getEndpoint(), data), {
    onSuccess: () => {
      queryClient.invalidateQueries(`notes-${parentId}`)
      closeDialog()
    },
  })
  const { isLoading } = mutation

  const onSubmit = (data: any) => {
    const { body } = data
    const note = {
      body,
      parentId,
    }
    mutation.mutate(note)
  }

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name={'body'}
              label={'Note'}
              type={'text'}
              multiline
              variant={'outlined'}
              inputRef={register({ required: 'This field is required' })}
              defaultValue={selectedNote?.body}
              error={Boolean(errors.body)}
              helperText={errors.body?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Button disabled={isLoading} variant={'contained'} type='submit'>
              {mode === CREATE_MODE ? 'Create Note' : 'Save Changes'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default NoteForm
