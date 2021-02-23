import React from 'react'
import { useQuery } from 'react-query'
import { get } from 'api'
import endpoints from 'api/endpoints'
import Table from 'components/Table'
import Grid from '@material-ui/core/Grid'
import Base from 'components/Base'
import Header from 'components/Header'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

const WineryScene = () => {
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
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Location',
        accessor: 'location',
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
      },
    ],
    []
  )

  if (isLoading || !data) return <div>Loading...</div>

  return (
    <Base>
      <Grid container spacing={3} justify={'space-between'}>
        <Grid item xs={6}>
          <Header text={'Wineries'} />
        </Grid>
        <Grid item xs={1}>
          <Button onClick={handleClickOpen} variant={'outlined'}>
            Create
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Table data={data.data} columns={columns} />
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        Test
      </Dialog>
    </Base>
  )
}

export default WineryScene
