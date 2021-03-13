import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deleteCall, get } from 'api'
import endpoints from 'api/endpoints'
import { winery } from 'constants/paths'
import Table from 'components/Table'
import Grid from '@material-ui/core/Grid'
import Card from 'components/Card'
import Header from 'components/Header'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import WineryForm from './WineryForm'
import { generatePath, Link } from 'react-router-dom'

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

const WineryCollection = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const queryClient = useQueryClient()
  const mutation = useMutation(
    (wineryId: string) => deleteCall(endpoints.deleteWinery(wineryId)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('wineries')
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
    const res = await get(endpoints.getWineries)
    return res
  }
  const { data: wineries, isLoading: wineriesLoading } = useQuery(
    'wineries',
    fetchWineries
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
              to={generatePath(winery, {
                wineryId: row.original.id,
              })}
            >
              {value}
            </Link>
          )
        },
      },
      {
        id: 'location',
        Header: 'Location',
        accessor: 'location',
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

  if (wineriesLoading || !wineries) return <div>Loading...</div>

  return (
    <Card>
      <Grid container spacing={3} justify={'space-between'}>
        <Grid item xs={12}>
          <div className={classes.headerContainer}>
            <Header text={'Wineries'} />
            <Button onClick={handleClickOpen} variant={'outlined'}>
              Create
            </Button>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Table data={wineries.data} columns={columns} />
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <WineryForm closeDialog={handleClose} />
      </Dialog>
    </Card>
  )
}

export default WineryCollection
