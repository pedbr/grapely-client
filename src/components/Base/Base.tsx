import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: theme.borderRadius.card,
    boxShadow: theme.customShadows[25].z16,
    padding: theme.spacing(3),
  },
}))

interface Props {
  children: React.ReactNode | JSX.Element
}

const Base = ({ children }: Props) => {
  const classes = useStyles()
  return <Paper className={classes.paper}>{children}</Paper>
}

export default Base
