import { styled } from '@mui/material/styles'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'

import type { LinkProps } from 'react-router'
import type { ButtonProps } from '@mui/material/Button'
import type { BoxProps } from '@mui/material/Box'

type RouterLinkButtonProps = ButtonProps & LinkProps

export const BoxStyled = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
  padding: theme.spacing(0),
  [theme.breakpoints.down('sm')]: { padding: theme.spacing(2) },
}))

export const CardStyled = styled(Card)(({ theme }) => ({
  maxWidth: 448,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  paddingLeft: theme.spacing(7),
  paddingRight: theme.spacing(7),
  [theme.breakpoints.down('sm')]: {
    maxWidth: 325,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))

export const ButtonLinkStyled = styled(Button)<RouterLinkButtonProps>(() => ({
  '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' },
}))
