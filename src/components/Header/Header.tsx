import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

interface StyleProps {
  h2?: boolean
}

const useStyles = makeStyles((theme) => ({
  text: ({ h2 }: StyleProps) => ({
    fontFamily: theme.customTypography.fonts.main,
    color: theme.palette.text.primary,
    fontSize: h2
      ? theme.customTypography.h3.fontSize
      : theme.customTypography.h2.fontSize,
    fontWeight: theme.customTypography.h2.fontWeight,
    lineHeight: theme.customTypography.h2.lineHeight,
  }),
}))

interface Props {
  text: string
  h2?: boolean
}

const Header = ({ text, h2 }: Props) => {
  const classes = useStyles({ h2 })
  return <Typography className={classes.text}>{text}</Typography>
}

export default Header
