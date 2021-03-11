import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from 'react-query'
import { get } from 'api'
import endpoints from 'api/endpoints'
import Table from 'components/Table'
import Grid from '@material-ui/core/Grid'
import Card from 'components/Card'
import Header from 'components/Header'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import WineryForm from './WineryForm'

const useStyles = makeStyles({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

const WineryScene = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

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
  const { data, isLoading } = useQuery('wineries', fetchWineries)

  const columns = React.useMemo(
    () => [
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
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
        // eslint-disable-next-line react/display-name
        Cell: ({ row }: any) => (
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          <Button>Delete</Button>
        ),
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
            <Header text={'Wineries'} />
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
        <WineryForm closeDialog={handleClose} />
      </Dialog>
    </Card>
  )
}

export default WineryScene
