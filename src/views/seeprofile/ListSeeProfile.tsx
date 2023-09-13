import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Alert, AlertTitle, Avatar, CircularProgress, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import ISocialFeed from 'src/contract/models/social_feed'
import SocialFeedContext from 'src/context/SocialFeedContext'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSocialFeed } from 'src/hooks/useSocialFeed'
 import { useEffect } from 'react'
import { getEmployeetypev2, getUserAvatar, toTitleCase } from 'src/utils/helpers'
import { Icon } from '@iconify/react'
import moment from 'moment'
import { IUser } from 'src/contract/models/user'
import Link from 'next/link'


interface Props {
  listCandidate: IUser[]
}

const renderList = (listCandidate: IUser[]) => {
  if (!listCandidate || listCandidate.length == 0) {

    return

  }

  return listCandidate.map(item => {
    const userPhoto = item.photo ? item.photo : '/images/avatars/default-user.png'
    const names = item.field_preference?.spoken_langs ? item.field_preference?.spoken_langs : []

    return (
      <Grid item xs={12} md={6} key={item?.id}>
        <Paper
          sx={{
            padding: { xs: 3, md: 5 },
            border: 0,
            boxShadow: 0,
            color: 'common.white',
            backgroundColor: '#FFFFFF'
          }}
        >
          <Grid item container xs={12} md={12}>
            <Grid xs={2} md={1.8}>
              <Avatar sx={{ width: 50, height: 50 }} src={userPhoto} alt='profile-picture' />
            </Grid>
            <Grid xs={10} md={10}>
              <Link style={{ textDecoration: 'none' }} href={'/profile/?username=' + item?.username}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                  <Typography variant='body2' sx={{ color: '#0a66c2', fontWeight: 600, fontSize: '14px' }}>
                    {toTitleCase(item?.name)}
                  </Typography>
                  {item?.employee_type != null ? (
                    <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                      {getEmployeetypev2(item.employee_type)}
                    </Typography>
                  ) : (
                    <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                      {item?.role != 'Company' ? item?.role : 'Recruiter'}
                    </Typography>
                  )}
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }}>
                    <Icon color={'#42424242'} icon='mingcute:time-fill' fontSize={'18px'} /> &nbsp;
                    <Typography sx={{ color: '#424242', fontWeight: 400, fontSize: '12px' }}>
                      {moment(item.created_at).fromNow()}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </Grid>
          </Grid>

          {/* </Box> */}
        </Paper>
      </Grid>
    )})

}
const ListSeeProfile = (props: Props) => { 
    const { listCandidate } = props

    return (
      <>
        <Alert severity='info'>
          <AlertTitle>Whos See Your Profile?</AlertTitle>
          Based on <strong>your profile</strong> 
        </Alert>
        <Grid container spacing={2}>
          {renderList(listCandidate)}
        </Grid>
      </>
    ) 
}


export default ListSeeProfile
