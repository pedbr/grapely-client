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
import { generatePath, Link, useParams } from 'react-router-dom'
import ContainerForm from 'components/Container/ContainerForm'
import { container } from 'constants/paths'

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
}

const ContainersCollection = () => {
  const classes = useStyles()
  const [openCreateForm, setOpenCreateForm] = React.useState(false)
  const [openEditForm, setOpenEditForm] = React.useState(false)
  const [selectedContainer, setSelectedContainer] = React.useState()
  const queryClient = useQueryClient()
  const { wineryId } = useParams<RouteParams>()
  const mutation = useMutation(
    (containerId: string) => deleteCall(endpoints.deleteContainer(containerId)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`containers-${wineryId}`)
      },
    }
  )

  const toggleOpenCreateForm = () => {
    setOpenCreateForm(!openCreateForm)
  }

  const toggleOpenEditForm = () => {
    setOpenEditForm(!openEditForm)
  }

  const handleEdit = (container: any) => {
    setSelectedContainer(container)
    toggleOpenEditForm()
  }

  const fetchContainers = async () => {
    const res = await get(endpoints.getWineryContainers(wineryId))
    return res
  }

  const { data: containers, isLoading: containersLoading } = useQuery(
    `containers-${wineryId}`,
    fetchContainers
  )

  const columns = React.useMemo(
    () => [
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
        Cell({ row, value }: any) {
          return (
            <Link
              className={classes.link}
              to={generatePath(container, {
                containerId: row.original.id,
              })}
            >
              {value}
            </Link>
          )
        },
      },
      {
        id: 'capacity',
        Header: 'Capacity',
        accessor: 'capacity',
      },
      {
        id: 'type',
        Header: 'Type',
        accessor: 'type',
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

  if (containersLoading || !containers) return <div>Loading...</div>

  return (
    <>
      <Grid container spacing={3} justify={'space-between'}>
        <Grid item xs={12}>
          <div className={classes.headerContainer}>
            <Header h2 text={'Containers'} />
            <Button onClick={toggleOpenCreateForm} variant={'outlined'}>
              Create
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.tableContainer}>
          <Table data={containers.data} columns={columns} />
        </Grid>
      </Grid>
      <Dialog open={openCreateForm} onClose={toggleOpenCreateForm}>
        <ContainerForm
          closeDialog={toggleOpenCreateForm}
          wineryId={wineryId}
          mode={CREATE_MODE}
        />
      </Dialog>
      <Dialog open={openEditForm} onClose={toggleOpenEditForm}>
        <ContainerForm
          closeDialog={toggleOpenEditForm}
          wineryId={wineryId}
          selectedContainer={selectedContainer}
          mode={EDIT_MODE}
        />
      </Dialog>
    </>
  )
}

export default ContainersCollection
