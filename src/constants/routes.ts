import {
  auth,
  wineries,
  winery,
  containers,
  container,
  batches,
  batch,
  dashboards,
  taskManager,
  logout,
} from './paths'
import AuthenticationScene from 'components/Authentication/AuthenticationScene'
import WineriesCollection from 'components/Winery/WineriesCollection'
import WineryScene from 'components/Winery/WineryScene'
import DashboardsScene from 'components/Dashboards/DashboardsScene'
import TaskManagerScene from 'components/TaskManager/TaskManagerScene'
import Logout from 'components/Logout/Logout'
import ContainersCollection from 'components/Container/ContainersCollection'
import ContainerScene from 'components/Container/ContainerScene'
import BatchesCollection from 'components/Batch/BatchesCollection'
import BatchScene from 'components/Batch/BatchScene'

export const Routes = [
  {
    name: 'auth',
    path: auth,
    exact: true,
    component: AuthenticationScene,
  },
  {
    name: 'wineries',
    path: wineries,
    exact: true,
    component: WineriesCollection,
  },
  {
    name: 'winery',
    path: winery,
    exact: true,
    component: WineryScene,
  },
  {
    name: 'containers',
    path: containers,
    exact: true,
    component: ContainersCollection,
  },
  {
    name: 'container',
    path: container,
    exact: true,
    component: ContainerScene,
  },
  {
    name: 'batches',
    path: batches,
    exact: true,
    component: BatchesCollection,
  },
  {
    name: 'batch',
    path: batch,
    exact: true,
    component: BatchScene,
  },
  {
    name: 'dashboards',
    path: dashboards,
    exact: true,
    component: DashboardsScene,
  },
  {
    name: 'taskManager',
    path: taskManager,
    exact: true,
    component: TaskManagerScene,
  },
  {
    name: 'logout',
    path: logout,
    exact: true,
    component: Logout,
  },
]
