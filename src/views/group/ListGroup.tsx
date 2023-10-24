import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Avatar,  Button,  Paper } from '@mui/material' 
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
      <Grid item xs={12} md={3} key={item?.id}>
        <Card sx={{ width: '100%', border: 1, boxShadow: 1, color: 'common.white', backgroundColor: '#FFFFFF' }}>
          <CardMedia
            component='img'
            alt='profile-header'
            image={item.groupbanner ? item.groupbanner : '/images/avatars/headerprofile3.png'}
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
                <ProfilePicture src={userPhoto ? userPhoto : '//images/avatars/1.png'} alt='profile-picture' />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: ['center'],
                    justifyContent: 'center'
                  }}
                >
                  <Link style={{ textDecoration: 'none' }} href={'/group?id=' + item?.id}>
                    <Typography align='center' sx={{ fontWeight: 'bold', color: '#0a66c2', mb: 1 }} fontSize={18}>
                      {item.title ? item.title : '-'}
                    </Typography>
                    <Typography align='center' sx={{ color: 'text.primary', mb: 1 }} fontSize={14}>
                      {item.description ? item.description : '-'}
                    </Typography>
                    <Typography align='center' sx={{ color: 'text.secondary', mb: 1 }} fontSize={12}>
                      {item.count_member ? item.count_member : '-'} Member
                    </Typography>
                  </Link>
                  <Button href={'/group?id=' + item?.id} variant='outlined' color='primary'>
                    Join
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
          <Divider style={{ width: '100%' }} />
        </Card>
      </Grid>
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
