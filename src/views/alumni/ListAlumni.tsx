import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material'
import Link from 'next/link'
import Alumni from 'src/contract/models/alumni'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { styled } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import { Icon } from '@iconify/react'

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
    MuiCard: {
      styleOverrides: {
        root: {
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
  listAlumni: Alumni[]
}

const renderList = (listAlumni: Alumni[]) => {
  if (!listAlumni || listAlumni.length == 0) {
    return
  }

  return listAlumni?.map(item => {
    // const userPhoto = item.profilepicture != '' ? item.profilepicture : '/images/avatars/default-user.png'

    return (
      <ThemeProvider theme={theme} key={item?.id}>
        <Grid item xs={12} md={3} padding={2} mt={3}>
          <Card
            sx={{
              borderRadius: '16px',
              color: 'common.white',
              backgroundColor: '#FFFFFF'
            }}
          >
            <CardMedia
              component='img'
              alt='profile-header'
              image={'/images/banner.jpeg'}
              sx={{
                height: { xs: 100, md: 100 },
                width: '100%',
                objectFit: 'cover',

                borderRadius: 2
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
                    sx={{ backgroundColor: 'white' }}
                    src={item.profilepicture ?? '/images/avatars/1.png'}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: ['center'],
                      justifyContent: 'center'
                    }}
                  >
                    <Link style={{ textDecoration: 'none' }} href={'/alumni?id=' + item?.id}>
                      <Grid container direction='row' alignItems='center'>
                        {item?.statusaktif == true ? (
                          <>
                            <Grid item xs={12}>
                              <Typography
                                align='center'
                                sx={{ fontFamily: 'Outfit', fontWeight: '600', color: '#0a66c2', mt: 2, mb: 1 }}
                                fontSize={18}
                              >
                                {item.description ? item.description : '-'}
                                <Icon
                                  fontSize='large'
                                  icon={'solar:verified-check-bold'}
                                  color={'info'}
                                  style={{ fontSize: '22px', color: 'green', marginTop: 9 }}
                                />
                              </Typography>
                            </Grid>
                          </>
                        ) : (
                          <Grid item xs={12}>
                            <Typography
                              align='center'
                              sx={{ fontFamily: 'Outfit', fontWeight: '600', color: '#0a66c2', mt: 2, mb: 1 }}
                              fontSize={18}
                            >
                              {item.description ? item.description : '-'}
                            </Typography>
                          </Grid>
                        )}
                        <Grid item xs={12}>
                          <Typography
                            align='center'
                            sx={{ fontFamily: 'Outfit', fontWeight: '600', color: '#ff9601', mb: 1 }}
                            fontSize={12}
                          >
                            {item.count_member ? item.count_member : '-'} Alumni
                          </Typography>
                        </Grid>
                      </Grid>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </ThemeProvider>
    )
  })
}

const ListAlumni = (props: Props) => {
  const { listAlumni } = props

  return (
    <Grid container spacing={2}>
      {renderList(listAlumni)}
    </Grid>
  )
}

export default ListAlumni
