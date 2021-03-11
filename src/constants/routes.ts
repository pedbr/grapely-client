import {
  auth,
  wineries,
  winery,
  dashboards,
  taskManager,
  logout,
} from './paths'
import AuthenticationScene from 'components/Authentication/AuthenticationScene'
import WineryCollection from 'components/Winery/WineryCollection'
import WineryScene from 'components/Winery/WineryScene'
import DashboardsScene from 'components/Dashboards/DashboardsScene'
import TaskManagerScene from 'components/TaskManager/TaskManagerScene'
import Logout from 'components/Logout/Logout'

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
    component: WineryCollection,
  },
  {
    name: 'winery',
    path: winery,
    exact: true,
    component: WineryScene,
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
