import React from 'react'
import { useQuery } from 'react-query'
import { get } from 'api'
import endpoints from 'api/endpoints'
import Grid from '@material-ui/core/Grid'
import Card from 'components/Card'
import Header from 'components/Header'
import { useParams } from 'react-router-dom'

import BatchesCollection from 'components/Batch/BatchesCollection'
import TasksCollection from 'components/Tasks/TasksCollection'

interface RouteParams {
  containerId: string
}

const ContainerScene = () => {
  const { containerId } = useParams<RouteParams>()

  const fetchContainer = async () => {
    const res = await get(endpoints.getContainerById(containerId))
    return res
  }

  const { data: container, isLoading: containerLoading } = useQuery(
    `container-${containerId}`,
    fetchContainer
  )

  if (containerLoading || !container) return <div>Loading...</div>

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Header text={container.data.name} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <BatchesCollection />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TasksCollection
            fetchEndpoint={endpoints.getContainerTasks}
            resourceTypeId={'containerId'}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default ContainerScene
