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
import { generatePath, Link, useParams } from 'react-router-dom'
import { batch } from 'constants/paths'
import BatchForm from 'components/Batch/BatchForm'

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
  containerId: string
}

const ContainerScene = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const queryClient = useQueryClient()
  const { containerId } = useParams<RouteParams>()
  const mutation = useMutation(
    (batchId: string) => deleteCall(endpoints.deleteBatch(batchId)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`batches-${containerId}`)
      },
    }
  )

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const fetchBatches = async () => {
    const res = await get(endpoints.getContainerBatches(containerId))
    return res
  }

  const fetchContainer = async () => {
    const res = await get(endpoints.getContainerById(containerId))
    return res
  }

  const { data: batches, isLoading: batchesLoading } = useQuery(
    `batches-${containerId}`,
    fetchBatches
  )
  const { data: container, isLoading: containerLoading } = useQuery(
    `container-${containerId}`,
    fetchContainer
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
              to={generatePath(batch, {
                batchId: row.original.id,
              })}
            >
              {value}
            </Link>
          )
        },
      },
      {
        id: 'amount',
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        id: 'year',
        Header: 'Year',
        accessor: 'year',
      },
      {
        id: 'product',
        Header: 'Product',
        accessor: 'product',
      },
      {
        id: 'type',
        Header: 'Type',
        accessor: 'type',
      },
      {
        id: 'targetTemperature',
        Header: 'Target Temperature',
        accessor: 'targetTemperature',
      },
      {
        id: 'startDate',
        Header: 'Start Date',
        accessor: 'startDate',
      },
      {
        id: 'estimatedEndDate',
        Header: 'Estimated End Date',
        accessor: 'estimatedEndDate',
      },
      {
        id: 'endDate',
        Header: 'End Date',
        accessor: 'endDate',
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

  if (batchesLoading || !batches || containerLoading || !container)
    return <div>Loading...</div>

  return (
    <Card>
      <Grid container spacing={3} justify={'space-between'}>
        <Grid item xs={12}>
          <div className={classes.headerContainer}>
            <Header text={container.data.name} />
            <Button onClick={handleClickOpen} variant={'outlined'}>
              Create
            </Button>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Table data={batches.data} columns={columns} />
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <BatchForm closeDialog={handleClose} containerId={containerId} />
      </Dialog>
    </Card>
  )
}

export default ContainerScene
