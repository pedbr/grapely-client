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
  containerId: string
}

const ContainerScene = () => {
  const classes = useStyles()
  const [openCreateForm, setOpenCreateForm] = React.useState(false)
  const [openEditForm, setOpenEditForm] = React.useState(false)
  const [selectedBatch, setSelectedBatch] = React.useState()
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

  const toggleOpenCreateForm = () => {
    setOpenCreateForm(!openCreateForm)
  }

  const toggleOpenEditForm = () => {
    setOpenEditForm(!openEditForm)
  }

  const handleEdit = (batch: any) => {
    setSelectedBatch(batch)
    toggleOpenEditForm()
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

  if (batchesLoading || !batches || containerLoading || !container)
    return <div>Loading...</div>

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Header text={container.data.name} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Grid container spacing={3} justify={'space-between'}>
            <Grid item xs={12}>
              <div className={classes.headerContainer}>
                <Header h2 text={'Batches'} />
                <Button onClick={toggleOpenCreateForm} variant={'outlined'}>
                  Create
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} className={classes.tableContainer}>
              <Table data={batches.data} columns={columns} />
            </Grid>
          </Grid>
          <Dialog open={openCreateForm} onClose={toggleOpenCreateForm}>
            <BatchForm
              closeDialog={toggleOpenCreateForm}
              containerId={containerId}
              mode={CREATE_MODE}
            />
          </Dialog>
          <Dialog open={openEditForm} onClose={toggleOpenEditForm}>
            <BatchForm
              closeDialog={toggleOpenEditForm}
              containerId={containerId}
              selectedBatch={selectedBatch}
              mode={EDIT_MODE}
            />
          </Dialog>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ContainerScene
