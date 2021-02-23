import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Route, Router, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import store from './redux/store'
import Navbar from './components/Navbar/Navbar'
import ThemeConfig from './theme'
import { Routes } from './constants/routes'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'

const useStyles = makeStyles({
  container: {
    paddingTop: 92,
    height: '100%',
  },
})

interface RouteType {
  path: string
  exact: boolean
  name: string
  component: React.ComponentType<any>
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const history = createBrowserHistory()

const App = (): JSX.Element => {
  const classes = useStyles()
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router history={history}>
          <ThemeConfig>
            <Navbar />
            <div className={classes.container}>
              <Switch>
                {Routes.map((route: RouteType) => {
                  const Component = route.component
                  return (
                    <Route
                      exact={route.exact}
                      key={route.name}
                      path={route.path}
                      render={(props): JSX.Element => <Component {...props} />}
                    />
                  )
                })}
              </Switch>
            </div>
          </ThemeConfig>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
    </QueryClientProvider>
  )
}

export default App
