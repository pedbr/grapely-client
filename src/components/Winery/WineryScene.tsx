import React from 'react'
import { useQuery } from 'react-query'
import { get } from 'api'
import endpoints from 'api/endpoints'

const WineryScene = () => {
  const fetchWineries = async () => {
    const res = await get(endpoints.getWineries)
    return res
  }
  const result = useQuery('wineries', fetchWineries)

  console.log(result)

  return <div>Winery Scene</div>
}

export default WineryScene
