import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Avatar,  Card,  CardContent,  Paper } from '@mui/material' 
import Link from 'next/link'
import Group from 'src/contract/models/group' 

export type ParamMain = {
  name: string
  skill: string
  location: string
}

interface Props {
  listGroup: Group[]
}

const renderList = (listGroup: Group[]) => {
  if (!listGroup || listGroup.length == 0) {
    return
  
  }

  return listGroup?.map(item => { 
    const userPhoto = item.profilepicture != '' ? item.profilepicture : '/images/avatars/default-user.png' 

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
            <Link style={{ textDecoration: 'none' }} href={'/group?id=' + item?.id}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={3} ml={2} mr={3}>
                <Avatar src={userPhoto} alt='profile-picture' sx={{ width: 35, height: 35 }} />
              </Box>
            </Link>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: ['left', 'flex-start'] }} marginTop={2}>
              <Link style={{ textDecoration: 'none' }} href={'/group?id=' + item?.id}>
                 <Typography sx={{ color: '#424242', fontWeight: 800 }}>
                  {item.title ? item.title : '-'}
                </Typography> 
                 <Typography sx={{ color: '#424242', fontWeight: 400 }}>
                  {item.count_member ? item.count_member : '-'} {' '} Member
                </Typography>
              </Link>
            </Box>
          </Box> 
      </Grid>
    )
  })
}

const LIstGroupLeft = (props: Props) => {
  const { listGroup } = props
 
 
  return (
    <Grid container marginTop={'0px'}>
      <Grid item xs={12}>
        <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
          <CardContent>
            <Grid item lg={6} md={6} xs={12}>
              {listGroup && (
                <>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ mr: 2 }}>
                      <Typography>Group Recommendations</Typography>
                    </Box>
                  </Box>
                </>
              )}
            </Grid>
            <Box sx={{ mt: 3 }}>{renderList(listGroup)}</Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default LIstGroupLeft
