// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { IUser } from 'src/contract/models/user'
import { getUserAvatar } from 'src/utils/helpers'
import Avatar from 'src/@core/components/mui/avatar'
import Link from 'next/link'
import { styled } from '@mui/material'

export type ParamJobVacncy = {
  judul: string
  user: IUser
}
   const ProfilePicture = styled('img')(({ theme }) => ({
     width: 120,
     height: 120,
     borderRadius: theme.shape.borderRadius,
     border: `5px solid ${theme.palette.common.white}`,
     [theme.breakpoints.down('md')]: {
       marginBottom: theme.spacing(1)
     }
   }))

// export type ProfileTeamsType = ProfileTabCommonType & { color: ThemeColor }
interface Props {
  selectedAlumni: any
  iduser: string
  label: string
  statusbutton: any
  onMessage: (message: string) => void
}



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
                        src='/images/avatars/1.png'
                        alt='profile-picture'
                        sx={{
                          ml:10,
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
