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
import { useParams } from 'react-router-dom'
import TaskForm from './TaskForm'

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

interface RouteParams {
  wineryId: string
  containerId: string
  batchId: string
}

interface Props {
  fetchEndpoint: any
  resourceTypeId: string
}

const TasksCollection = ({ fetchEndpoint, resourceTypeId }: Props) => {
  const classes = useStyles()
  const [openCreateForm, setOpenCreateForm] = React.useState(false)
  const [openEditForm, setOpenEditForm] = React.useState(false)
  const [selectedTask, setSelectedTask] = React.useState()
  const queryClient = useQueryClient()
  const { wineryId, containerId, batchId } = useParams<RouteParams>()
  const resourceId = wineryId || containerId || batchId

  const mutation = useMutation(
    (taskId: string) => deleteCall(endpoints.deleteTask(taskId)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`tasks-${resourceId}`)
      },
    }
  )

  const toggleOpenCreateForm = () => {
    setOpenCreateForm(!openCreateForm)
  }

  const toggleOpenEditForm = () => {
    setOpenEditForm(!openEditForm)
  }

  const handleEdit = (task: any) => {
    setSelectedTask(task)
    toggleOpenEditForm()
  }

  const fetchTasks = async () => {
    const res = await get(fetchEndpoint(resourceId))
    return res
  }

  const { data: tasks, isLoading: tasksLoading } = useQuery(
    `tasks-${resourceId}`,
    fetchTasks
  )

  const columns = React.useMemo(
    () => [
      {
        id: 'title',
        Header: 'Title',
        accessor: 'title',
      },
      {
        id: 'description',
        Header: 'Description',
        accessor: 'description',
      },
      {
        id: 'status',
        Header: 'Status',
        accessor: 'status',
      },
      {
        id: 'dueDate',
        Header: 'Deadline',
        accessor: 'dueDate',
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

  if (tasksLoading || !tasks) return <div>Loading...</div>

  return (
    <>
      <Grid container spacing={3} justify={'space-between'}>
        <Grid item xs={12}>
          <div className={classes.headerContainer}>
            <Header h2 text={'Tasks'} />
            <Button onClick={toggleOpenCreateForm} variant={'outlined'}>
              Create
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.tableContainer}>
          <Table data={tasks.data} columns={columns} />
        </Grid>
      </Grid>
      <Dialog open={openCreateForm} onClose={toggleOpenCreateForm}>
        <TaskForm
          closeDialog={toggleOpenCreateForm}
          resourceId={resourceId}
          mode={CREATE_MODE}
          resourceTypeId={resourceTypeId}
        />
      </Dialog>
      <Dialog open={openEditForm} onClose={toggleOpenEditForm}>
        <TaskForm
          closeDialog={toggleOpenEditForm}
          resourceId={resourceId}
          selectedTask={selectedTask}
          mode={EDIT_MODE}
          resourceTypeId={resourceTypeId}
        />
      </Dialog>
    </>
  )
}

export default TasksCollection
