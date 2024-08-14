import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import { Container } from '@mui/material'
import { LandingPageLayoutProps } from '../types'
import OuterPageAppbar from './OuterPageAppbar'
import { useAuth } from 'src/hooks/useAuth'
import UserLayout from 'src/layouts/UserLayout'

const OuterPageLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
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

const OuterPageLayout = (props: LandingPageLayoutProps) => {
  const { children } = props
  const auth = useAuth()

  if (auth.user !== null) return <UserLayout>{children}</UserLayout>

  return (
    <OuterPageLayoutWrapper>
      <OuterPageAppbar appBarElevation={props.appBarElevation} />
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
    </OuterPageLayoutWrapper>
  )
}

export default OuterPageLayout
