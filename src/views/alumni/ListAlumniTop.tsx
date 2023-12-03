import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Avatar, Card, CardContent } from '@mui/material'
import Link from 'next/link'
// import Alumni from 'src/contract/models/alumni'

export type ParamMain = {
  name: string
  skill: string
  location: string
}

interface Props {
  listAlumni: any[]
}

const renderList = (listAlumni: any[]) => {
  if (!listAlumni || listAlumni.length == 0) {
    return
  }
  
  return listAlumni?.map(item => {
    const userPhoto = item.user.photo != '' ? item.user.photo : '/images/avatars/default-user.png'

    return (
      <Grid item xs={12} md={12} key={item?.id}>
        <Box
          height={65}
          sx={{
            display: 'flex',
            alignContent: 'center',
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Link style={{ textDecoration: 'none' }} href={'/alumni?id=' + item?.id}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={3} ml={2} mr={3}>
              <Avatar src={userPhoto} alt='profile-picture' sx={{ width: 55, height: 55 }} />
            </Box>
          </Link>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: ['left', 'flex-start'] }} marginTop={6}>
            <Link style={{ textDecoration: 'none' }} href={'/alumni?id=' + item.id}>
              <Typography sx={{ color: '#FFFFFF', fontWeight: 400 }}>{item?.user?.name} </Typography>
              {/* <Typography sx={{ color: '#FFFFFF', fontWeight: 400 }}>{item?.user?.total ? item?.user?.total : '-'} Feed</Typography> */}
            </Link>
          </Box>
        </Box>
      </Grid>
    )
  })
}

const ListAlumniTop = (props: Props) => {
  const { listAlumni } = props
 
  return (
    <Grid container marginTop={'10px'}>
      <Grid item xs={12}>
        <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#1D9BF0' }}>
          <CardContent>
            {listAlumni && (
              <>
                <Grid item lg={12} md={12} xs={12}>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ mr: 2 }}>
                      <Typography
                        align='left'
                        sx={{ fontFamily: 'Outfit', fontWeight: '800', color: '#FFFFFF', mb: 1 }}
                        fontSize={14}
                      >Member</Typography>
                    </Box>
                  </Box>
                </Grid>

                <Box sx={{ mt: 3 }}>{renderList(listAlumni)}</Box>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ListAlumniTop
