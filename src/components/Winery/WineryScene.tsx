import React from 'react'
import { useQuery } from 'react-query'
import { get } from 'api'
import endpoints from 'api/endpoints'
import Grid from '@material-ui/core/Grid'
import Card from 'components/Card'
import Header from 'components/Header'
import { useParams } from 'react-router-dom'
import ContainersCollection from 'components/Container/ContainersCollection'
import TasksCollection from 'components/Tasks/TasksCollection'

interface RouteParams {
  wineryId: string
}

const WineryScene = () => {
  const { wineryId } = useParams<RouteParams>()

  const fetchWinery = async () => {
    const res = await get(endpoints.getWineryById(wineryId))
    return res
  }

  const { data: winery, isLoading: wineryLoading } = useQuery(
    `winery-${wineryId}`,
    fetchWinery
  )

  if (wineryLoading || !winery) return <div>Loading...</div>

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Header text={winery.data.name} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <ContainersCollection />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TasksCollection parentId={wineryId} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default WineryScene
