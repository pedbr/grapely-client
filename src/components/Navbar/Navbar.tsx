import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { addTransparency } from 'theme/palette'
import { Link } from 'react-router-dom'
import { winery, dashboards, taskManager, logout } from 'constants/paths'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { getAuthenticated } from 'redux/selectors/authSelectors'
import { auth } from 'constants/paths'
import { authenticateUser } from 'redux/actions/authActions'

const useStyles = makeStyles((theme) => ({
  appbar: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    height: 92,
    boxShadow: 'none',
    backdropFilter: 'blur(8px)',
    backgroundColor: addTransparency(theme.palette.background.default, 0.3),
  },
  toolbar: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    minHeight: 92,
    justifyContent: 'flex-end',
  },
  link: {
    textDecoration: 'none',
    marginLeft: theme.spacing(4),
  },
}))

const Navbar = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(getAuthenticated)

  const token = localStorage.FBIdToken
  if (token) {
    const decodedToken: any = jwtDecode(token)
    if (decodedToken.exp * 1000 > Date.now()) {
      dispatch(authenticateUser())
    } else {
      return <Redirect to={logout} />
    }
  } else {
    return <Redirect to={auth} />
  }

  isAuthenticated ? <div>Loading</div> : <Redirect to={auth} />

  return (
    <AppBar classes={{ root: classes.appbar }}>
      <Toolbar classes={{ root: classes.toolbar }}>
        {isAuthenticated && (
          <>
            <Link className={classes.link} to={winery}>
              <Button>Winery</Button>
            </Link>
            <Link className={classes.link} to={dashboards}>
              <Button>Dashboards</Button>
            </Link>
            <Link className={classes.link} to={taskManager}>
              <Button>Task Manager</Button>
            </Link>
            <Link className={classes.link} to={logout}>
              <Button>Logout</Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
