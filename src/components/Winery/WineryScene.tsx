import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deleteCall, get } from 'api'
import endpoints from 'api/endpoints'
import Table from 'components/Table'
import Grid from '@material-ui/core/Grid'
import Card from 'components/Card'
import Header from 'components/Header'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import { useParams } from 'react-router-dom'
import ContainerForm from 'components/Container/ContainerForm'

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
}))

interface RouteParams {
  wineryId: string
}

const WineryScene = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const queryClient = useQueryClient()
  const { wineryId } = useParams<RouteParams>()
  const mutation = useMutation(
    (containerId: string) => deleteCall(endpoints.deleteContainer(containerId)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('containers')
      },
    }
  )

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const fetchWineries = async () => {
    const res = await get(endpoints.getWineryContainers(wineryId))
    return res
  }
  const { data, isLoading } = useQuery('containers', fetchWineries)

  const columns = React.useMemo(
    () => [
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
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
        id: 'actions',
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
    ],
    []
  )

  if (isLoading || !data) return <div>Loading...</div>

  return (
    <Card>
      <Grid container spacing={3} justify={'space-between'}>
        <Grid item xs={12}>
          <div className={classes.headerContainer}>
            <Header text={'Containers'} />
            <Button onClick={handleClickOpen} variant={'outlined'}>
              Create
            </Button>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Table data={data.data} columns={columns} />
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <ContainerForm closeDialog={handleClose} wineryId={wineryId} />
      </Dialog>
    </Card>
  )
}

export default WineryScene
