// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { IUser } from 'src/contract/models/user'
// import { getUserAvatar } from 'src/utils/helpers'
// import Avatar from 'src/@core/components/mui/avatar'
// import Link from 'next/link'

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

const CardAlumni = (props: Props) => {
  const { selectedAlumni } = props

  return (
    <Grid container marginTop={'0px'}>
      <Grid item xs={12}>
        <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
          <CardContent>
            <Grid item lg={12} md={12} xs={12}>
              {selectedAlumni && (
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
                              {selectedAlumni.totalmember}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </>
              )}
            </Grid>
            {/* <Box sx={{ mt: 3 }}>{renderList(selectedAlumni?.member)}</Box> */}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CardAlumni
