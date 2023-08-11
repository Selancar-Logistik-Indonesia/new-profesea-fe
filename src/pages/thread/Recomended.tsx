// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid' 
import Typography from '@mui/material/Typography' 
import { Avatar, Card, CardContent, Link } from '@mui/material'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import Moment from 'moment'

export type ParamMain = {
  id: number
  name: string
  title: any
  forum: any
  snap_content: any
  date: string
  replies: string
  replies_count: string
  created_at: string
} 
 

 
// export type ProfileTeamsType = ProfileTabCommonType & { color: ThemeColor }
interface Props {
  // teams: ProfileTeamsType[]
  paramcomment: ParamMain[] 
}
 
const renderList = (arr: ParamMain[]) => {
  if (arr && arr.length) {
    const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

    return arr.map((item, index) => {
 
      return (
        <Grid item xs={12} key={index}>
          <Card>
            <CardContent>
              <Link style={{ textDecoration: 'none' }} href={'/thread?id=' + item?.id}>
                <Box
                  height={65}
                  sx={{
                      display: 'flex',
                      alignContent: 'center',
                  }}
                  mt={-5}
                  >
                  <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={3} ml={2} mr={3}>
                      <Avatar src={user?.photo} alt='profile-picture' sx={{ width: 50, height: 50 }} />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }} marginTop={3}>
                      <Typography sx={{ fontWeight: '600', color: 'text.primary', mb: 1 }} fontSize={14}>
                          {user?.name}
                      </Typography>
                      <Grid container direction="row" alignItems="center" spacing={4}>
                        <Grid item>                              
                          <Typography sx={{ color: 'text.primary', mb: 1 }} fontSize={10}>
                          {item.forum
                        ? `${item.forum.name.toString().charAt(0).toUpperCase() + item.forum.name.toString().slice(1)}`
                        : ''}
                          </Typography>
                        </Grid>
                        <Grid item> 
                          <Typography sx={{ color: 'text.secondary', mb: 1, fontSize:9 }}>
                            {Moment(item.created_at).format('DD/MM/YYYY HH:MM:SS')}
                          </Typography>
                        </Grid>
                      </Grid>
                  </Box>
                </Box>
                <Box   height={100} sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }} >
                    <Typography sx={{ color: 'text.primary', textTransform: 'uppercase' }} fontWeight={600} fontSize={16}>
                      {item.title
                        ? `${item.title.toString().charAt(0).toUpperCase() + item.title.toString().slice(1)}`
                        : ''}
                    </Typography>
                    <Typography sx={{ color: 'text.primary', mb: 1 }} fontSize={12}>
                        {item?.snap_content}
                    </Typography>
                </Box>
              </Link>  
            </CardContent>
          </Card>
        </Grid>
      )
    })
  } else {
    return null
  }
}
 

const Recomended = (props: Props) => {
  const {   paramcomment  } = props


  return (
    <Grid container spacing={2}>
        {renderList(paramcomment)} 
    </Grid>
  )
}

export default Recomended
