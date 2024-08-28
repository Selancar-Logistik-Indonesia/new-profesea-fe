import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import { LandingPageLayoutProps } from './types'
import LandingPageAppBar from './components/landing-page-appbar'
import { Container } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import Spinner from '../components/spinner'
import { useEffect, useState } from 'react'

const LandingPageLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh',
  '& .content-center': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5),
    minHeight: `calc(100vh - ${theme.spacing((theme.mixins.toolbar.minHeight as number) / 4)})`
  },
  '& .content-right': {
    display: 'flex',
    overflowX: 'hidden',
    position: 'relative',
    minHeight: `calc(100vh - ${theme.spacing((theme.mixins.toolbar.minHeight as number) / 4)})`
  }
}))

const LandingPageLayout = (props: LandingPageLayoutProps) => {
  const { children } = props
  const auth = useAuth()
  const [isNavigating, setIsNavigating] = useState(true)

  useEffect(() => {
    if (!auth.loading) {
      setTimeout(() => {
        setIsNavigating(false)
      }, 2000)
    }
  }, [auth.loading])

  if (isNavigating || auth.loading) return <Spinner />

  return (
    <LandingPageLayoutWrapper>
      <LandingPageAppBar appBarElevation={props.appBarElevation} />
      <Container maxWidth={false} disableGutters={true}>
        <Box
          className='app-content'
          sx={{
            overflowX: 'hidden',
            position: 'relative',
            minHeight: theme => `calc(100vh - ${theme.spacing((theme.mixins.toolbar.minHeight as number) / 4)})`
          }}
        >
          {children}
        </Box>
      </Container>
    </LandingPageLayoutWrapper>
  )
}

export default LandingPageLayout
