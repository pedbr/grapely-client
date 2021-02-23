import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  text: {
    fontFamily: theme.customTypography.fonts.main,
    color: theme.palette.text.primary,
    fontSize: theme.customTypography.h2.fontSize,
    fontWeight: theme.customTypography.h2.fontWeight,
    lineHeight: theme.customTypography.h2.lineHeight,
  },
}))

interface Props {
  text: string
}

const Header = ({ text }: Props) => {
  const classes = useStyles()
  return <Typography className={classes.text}>{text}</Typography>
}

export default Header
