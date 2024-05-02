import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { IUser } from 'src/contract/models/user'

interface IAboutMe {
  dataUser: IUser | null | undefined
}

export default function AboutMe(props: IAboutMe) {
  const { dataUser } = props

  return (
    <Grid container marginTop={'10px'}>
      <Grid item xs={12}>
        <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
          <CardContent>
            <Box sx={{ mb: 7 }}>
              <Typography variant='body2' sx={{ mb: 4, color: '#262525', textTransform: 'uppercase', fontWeight: 800 }}>
                About Me
              </Typography>
              <Typography variant='body2' sx={{ color: '#262525' }}>
                {dataUser?.about}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
