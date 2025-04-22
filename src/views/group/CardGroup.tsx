// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { IUser } from 'src/contract/models/user'
import { getUserAvatar, toLinkCase } from 'src/utils/helpers'
import Avatar from 'src/@core/components/mui/avatar'
import Link from 'next/link'

export type ParamJobVacncy = {
  judul: string
  user: IUser
}

// export type ProfileTeamsType = ProfileTabCommonType & { color: ThemeColor }
interface Props {
  selectedGroup: any
  iduser: string
  label: string
  statusbutton: any
  onMessage: (message: string) => void
}

const renderList = (arr: ParamJobVacncy[]) => {
  if (arr && arr.length) {
    return arr.map((item, index) => {
      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 4 },
            '& svg': { color: 'text.secondary' },
            padding: '5px'
          }}
        >
          <Box mr={5} mt={2}>
            <Link
              style={{ textDecoration: 'none' }}
              href={`/${item.user?.role === 'Seafarer' ? 'profile' : 'company'}/${toLinkCase(item.user?.username)}`}
            >
              <Avatar src={getUserAvatar(item.user)} alt='profile-picture' sx={{ height: 35, width: 35 }} />
            </Link>
          </Box>
          <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              style={{ textDecoration: 'none' }}
              href={`/${item.user?.role === 'Seafarer' ? 'profile' : 'company'}/${item.user?.id}/${
                item.user?.username
              }`}
            >
              <Typography sx={{ color: '#424242', fontWeight: 600 }}>
                {`${item.user?.name.charAt(0).toUpperCase() + item.user?.name.slice(1)}`}
              </Typography>
              <Typography sx={{ color: '#424242', fontWeight: 400 }}>
                {item.user?.name.charAt(0).toUpperCase() + item.user?.name.slice(1)}
              </Typography>
            </Link>
          </Box>
        </Box>
      )
    })
  } else {
    return null
  }
}

const CardGroup = (props: Props) => {
  const { selectedGroup } = props

  return (
    <Grid container marginTop={'0px'}>
      <Grid item xs={12}>
        <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
          <CardContent>
            <Grid item lg={12} md={12} xs={12}>
              {selectedGroup && (
                <>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box
                      sx={{
                        mb: 3.5,
                        borderRadius: 1,
                        color: 'text.primary',
                        p: theme => theme.spacing(2.75, 3.5),
                        backgroundColor: '#0a66c2'
                      }}
                    >
                      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          variant='rounded'
                          sx={{
                            mr: 2,
                            width: 30,
                            height: 30,
                            color: 'white',
                            backgroundColor: 'transparent',
                            border: '2px solid white'
                          }}
                        ></Avatar>

                        <Box
                          sx={{
                            width: '100%',
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ fontWeight: '800', color: '#FFFFFF' }} fontSize={14}>
                              Total Member
                            </Typography>
                            <Typography variant='h5' sx={{ fontWeight: '800', color: '#FFFFFF' }}>
                              {selectedGroup.totalmember}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </>
              )}
            </Grid>
            <Box sx={{ mt: 3 }}>{renderList(selectedGroup?.member)}</Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CardGroup
