import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from 'react-query'
import { get } from 'api'
import endpoints from 'api/endpoints'
import Grid from '@material-ui/core/Grid'
import Header from 'components/Header'
import { useParams } from 'react-router-dom'
import Card from 'components/Card'
import TasksCollection from 'components/Tasks/TasksCollection'

const useStyles = makeStyles({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

interface RouteParams {
  batchId: string
}

const ContainerScene = () => {
  const classes = useStyles()
  const { batchId } = useParams<RouteParams>()

  const fetchBatch = async () => {
    const res = await get(endpoints.getBatchById(batchId))
    return res
  }

  const { data: batch, isLoading: batchLoading } = useQuery(
    `batch-${batchId}`,
    fetchBatch
  )

  if (batchLoading || !batch) return <div>Loading...</div>

  return (
    <Grid container spacing={3} justify={'space-between'}>
      <Grid item xs={12}>
        <div className={classes.headerContainer}>
          <Header text={batch.data.name} />
        </div>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TasksCollection />
        </Card>
      </Grid>
    </Grid>
  )
}

export default ContainerScene
