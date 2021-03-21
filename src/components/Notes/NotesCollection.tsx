import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deleteCall, get } from 'api'
import endpoints from 'api/endpoints'
import Table from 'components/Table'
import Grid from '@material-ui/core/Grid'
import Header from 'components/Header'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import NoteForm from './NoteForm'

const CREATE_MODE = 'create'
const EDIT_MODE = 'edit'

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableContainer: {
    overflow: 'auto',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
}))

interface Props {
  parentId: string
}

const NotesCollection = ({ parentId }: Props) => {
  const classes = useStyles()
  const [openCreateForm, setOpenCreateForm] = React.useState(false)
  const [openEditForm, setOpenEditForm] = React.useState(false)
  const [selectedNote, setSelectedNote] = React.useState()
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (noteId: string) => deleteCall(endpoints.deleteNote(noteId)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`notes-${parentId}`)
      },
    }
  )

  const toggleOpenCreateForm = () => {
    setOpenCreateForm(!openCreateForm)
  }

  const toggleOpenEditForm = () => {
    setOpenEditForm(!openEditForm)
  }

  const handleEdit = (note: any) => {
    setSelectedNote(note)
    toggleOpenEditForm()
  }

  const fetchNotes = async () => {
    const res = await get(endpoints.getParentNotes(parentId))
    return res
  }

  const { data: notes, isLoading: notesLoading } = useQuery(
    `notes-${parentId}`,
    fetchNotes
  )

  const columns = React.useMemo(
    () => [
      {
        id: 'body',
        Header: 'Body',
        accessor: 'body',
      },
      {
        id: 'createdAt',
        Header: 'Created At',
        accessor: 'createdAt',
      },
      {
        Header: () => null,
        id: 'delete',
        Cell({ row }: any) {
          return (
            <Button
              disabled={mutation.isLoading}
              onClick={() => mutation.mutate(row.original.id)}
            >
              Delete
            </Button>
          )
        },
      },
      {
        Header: () => null,
        id: 'edit',
        Cell({ row }: any) {
          return <Button onClick={() => handleEdit(row.original)}>Edit</Button>
        },
      },
    ],
    []
  )

  if (notesLoading || !notes) return <div>Loading...</div>

  return (
    <>
      <Grid container spacing={3} justify={'space-between'}>
        <Grid item xs={12}>
          <div className={classes.headerContainer}>
            <Header h2 text={'Notes'} />
            <Button onClick={toggleOpenCreateForm} variant={'outlined'}>
              Create
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.tableContainer}>
          <Table data={notes.data} columns={columns} />
        </Grid>
      </Grid>
      <Dialog open={openCreateForm} onClose={toggleOpenCreateForm}>
        <NoteForm
          closeDialog={toggleOpenCreateForm}
          parentId={parentId}
          mode={CREATE_MODE}
        />
      </Dialog>
      <Dialog open={openEditForm} onClose={toggleOpenEditForm}>
        <NoteForm
          closeDialog={toggleOpenEditForm}
          parentId={parentId}
          selectedNote={selectedNote}
          mode={EDIT_MODE}
        />
      </Dialog>
    </>
  )
}

export default NotesCollection
