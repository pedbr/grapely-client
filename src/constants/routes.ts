import { auth, winery, dashboards, taskManager, logout } from './paths'
import AuthenticationScene from '../components/Authentication/AuthenticationScene'
import WineryScene from '../components/Winery/WineryScene'
import DashboardsScene from '../components/Dashboards/DashboardsScene'
import TaskManagerScene from '../components/TaskManager/TaskManagerScene'
import Logout from '../components/Logout/Logout'

export const Routes = [
  {
    name: 'auth',
    path: auth,
    exact: true,
    component: AuthenticationScene,
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
