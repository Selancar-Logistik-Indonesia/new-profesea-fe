import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Button, createTheme, ThemeProvider } from '@mui/material'
import Link from 'next/link'
import Group from 'src/contract/models/group'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { Divider, styled } from '@mui/material'
import CardContent from '@mui/material/CardContent'

export type ParamMain = {
  name: string
  skill: string
  location: string
}

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))
const theme = createTheme({
  components: {
    // Name of the component
    MuiCard: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          borderColor: 'green',
          borderRadius: 5,
          position: 'relative',
          zIndex: 0
        }
      }
    }
  }
})
interface Props {
  listGroup: Group[]
}

const base_url = process.env.NEXT_PUBLIC_BASE_URL

const renderList = (listGroup: Group[]) => {
  if (!listGroup || listGroup.length == 0) {
    return
  }

  return listGroup?.map(item => {
    // const userPhoto = item.profilepicture != '' ? item.profilepicture : '/images/avatars/default-user.png'

    return (
      <ThemeProvider theme={theme} key={item?.id}>
        <Grid item xs={12} md={3}>
          <Card sx={{ color: 'common.white', backgroundColor: '#FFFFFF' }}>
            <CardMedia
              component='img'
              alt='profile-header'
              image={
                item.groupbanner != ''
                  ? base_url + '/storage/' + item.groupbanner
                  : '/images/avatars/headerprofile3.png'
              }
              sx={{
                height: { xs: 100, md: 100 },
                width: '100%',
                objectFit: 'cover'
              }}
            />

            <CardContent
              sx={{
                pt: 0,
                mt: 0,
                display: 'flex',
                alignItems: 'flex-end',
                flexWrap: { xs: 'wrap', md: 'nowrap' },
                justifyContent: { xs: 'center', md: 'center' },
                marginLeft: { md: '10px' }
              }}
            >
              <Box
                height={195}
                sx={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  '& svg': { color: 'text.secondary' }
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: ['center'],
                    justifyContent: 'center'
                  }}
                  marginTop={-10}
                >
                  <ProfilePicture
                    src={
                      item.profilepicture != '' ? base_url + '/storage/' + item.profilepicture : '/images/avatars/1.png'
                    }
                    sx={{ mb: 1, width: 100, height: 100 }}
                  />

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: ['center'],
                      justifyContent: 'center'
                    }}
                  >
                    <Link href={'/group?id=' + item?.id}>
                      <Typography align='center' sx={{ fontWeight: '600', color: '#0a66c2', mb: 1 }} fontSize={18}>
                        {item.title ? item.title : '-'}
                      </Typography>
                      <Typography align='center' sx={{ fontWeight: '400', color: 'text.primary', mb: 1 }} fontSize={14}>
                        {item.description ? item.description : '-'}
                      </Typography>
                      <Typography align='center' sx={{ fontWeight: '600', color: '#ff9601', mb: 1 }} fontSize={12}>
                        {item.count_member ? item.count_member : '-'} Member
                      </Typography>
                    </Link>
                    <Button
                      href={'/group?id=' + item?.id}
                      variant='outlined'
                      color='primary'
                      sx={{ fontWeight: '600', color: '#0a66c2' }}
                    >
                      Join
                    </Button>
                  </Box>
                </Box>
              </Box>
            </CardContent>
            <Divider style={{ width: '100%' }} />
          </Card>
        </Grid>
      </ThemeProvider>
    )
  })
}

const LIstGroup = (props: Props) => {
  const { listGroup } = props

  return (
    <Grid container spacing={2}>
      {renderList(listGroup)}
    </Grid>
  )
}

export default LIstGroup
