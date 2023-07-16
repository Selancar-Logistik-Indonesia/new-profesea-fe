// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid' 
import Typography from '@mui/material/Typography' 
import { Paper } from '@mui/material'   
import { Icon } from '@iconify/react'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import Moment from 'moment'

export type ParamMain = {
  name: string
  title: any
  forum: any
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
        <Paper sx={{ marginTop: '10px' }} key={index}>
          <Box
            height={110}
            sx={{
              display: 'flex',
              alignContent: 'center',
              '& svg': { color: 'text.secondary' }
            }}
          >
            <Grid container margin={2}>
              <Grid xs={9}>
                <Typography variant='body1' sx={{ color: 'text.primary', textTransform: 'uppercase' }} fontWeight={600}>
                  {user.name}
                </Typography>
              </Grid>
              <Grid container xs={3} justifyContent='flex-end'>
                <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  {item.forum
                    ? `${item.forum.name.toString().charAt(0).toUpperCase() + item.forum.name.toString().slice(1)}`
                    : ''}
                </Typography>
              </Grid>
              <Grid xs={12}>
                <Typography variant='h6' sx={{ color: 'text.primary', textTransform: 'uppercase' }} fontWeight={600}>
                  {item.title
                    ? `${item.title.toString().charAt(0).toUpperCase() + item.title.toString().slice(1)}`
                    : ''}
                </Typography>
              </Grid>
              <Grid xs={9}>
                <Box display={'flex'}>
                  <Icon icon={'uil:comment'} fontSize={18} />
                  <Typography variant='body1' sx={{ color: 'text.primary' }} fontSize={10} fontWeight={600} marginLeft={'10px'}>
                    <a href='/company' target='_blank'>
                      Replies  {item.replies_count
                      ? `${
                          item.replies_count.toString().charAt(0).toUpperCase() + item.replies_count.toString().slice(1)
                        }`
                      : ''}
                    </a>
                   
                  </Typography>
                </Box>
              </Grid>
              <Grid container xs={3} justifyContent='flex-end'>
                <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  {/* {item.created_at ? `${item.created_at.toString().charAt(0).toUpperCase() + item.crregeated_at.toString().slice(1)}` : ''} */}
                  {Moment(item.created_at).format('DD/MM/YYYY HH:MM:SS')}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      )
    })
  } else {
    return null
  }
}
 

const Recomended = (props: Props) => {
  const {   paramcomment  } = props


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
         
            <Box  > 
              {renderList(paramcomment)} 
            </Box> 
            
      </Grid>
      
    </Grid>
  )
}

export default Recomended
