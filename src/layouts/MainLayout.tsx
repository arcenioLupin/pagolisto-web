import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from '@mui/material'
import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const AppLayout = ({ children }: Props) => {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Pagolisto</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box>{children}</Box>
      </Container>
    </>
  )
}

export default AppLayout
