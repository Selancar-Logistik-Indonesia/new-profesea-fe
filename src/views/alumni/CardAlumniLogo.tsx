// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { IUser } from 'src/contract/models/user'
import Avatar from 'src/@core/components/mui/avatar'

export type ParamJobVacncy = {
  judul: string
  user: IUser
}

// export type ProfileTeamsType = ProfileTabCommonType & { color: ThemeColor }
interface Props {
  selectedAlumni: any
  iduser: string
  label: string
  statusbutton: any
  onMessage: (message: string) => void
}

const base_url = process.env.NEXT_PUBLIC_BASE_URL

const CardAlumniLogo = (props: Props) => {
  const { selectedAlumni } = props

  return (
    <Grid container marginTop={'0px'}>
      <Grid item xs={12}>
        <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
          <CardContent>
            <Grid item lg={12} md={12} xs={12}>
              <>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src={
                        selectedAlumni?.profilepicture
                          ? base_url + '/storage/' + selectedAlumni.profilepicture
                          : '/images/avatars/1.png'
                      }
                      alt='profile-picture'
                      sx={{
                        ml: 10,
                        width: 100,
                        height: 100,
                        // position: 'absolute',
                        border: theme => `5px solid ${theme.palette.common.white}`
                      }}
                    />
                  </Box>
                </Box>
              </>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CardAlumniLogo
