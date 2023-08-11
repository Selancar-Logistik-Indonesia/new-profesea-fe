import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Avatar, Button, Card, CardContent, Link } from '@mui/material'
import Icon from 'src/@core/components/icon'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import Moment from 'moment'

export type ParamMain = {
  id: string
  name: string
  title: any
  snap_content: any
  forum: any
  date: string
  replies: string
  replies_count: string
  created_at: string
}

interface Props {
  paramcomment: ParamMain[]
}

const renderList = (arr: ParamMain[]) => {
  if (arr && arr.length) {
    const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

    return arr.map((item, index) => {

      return (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent>
                <Link style={{ textDecoration: 'none' }} href={'/thread?id=' + item.id}>
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
                            <Typography sx={{ color: 'text.primary', mb: 1 }} fontSize={12}>
                            {item.forum
                          ? `${item.forum.name.toString().charAt(0).toUpperCase() + item.forum.name.toString().slice(1)}`
                          : ''}
                            </Typography>
                          </Grid>
                          <Grid item> 
                            <Typography sx={{ color: 'text.secondary', mb: 1, fontSize:10 }}>
                              {Moment(item.created_at).format('DD/MM/YYYY HH:MM:SS')}
                            </Typography>
                          </Grid>
                        </Grid>
                    </Box>
                  </Box>
                  <Box   height={120} sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }} >
                      <Typography sx={{ color: 'text.primary', textTransform: 'uppercase' }} fontWeight={600} fontSize={16}>
                        {item.title
                          ? `${item.title.toString().charAt(0).toUpperCase() + item.title.toString().slice(1)}`
                          : ''}
                      </Typography>
                      <Typography sx={{ fontWeight: '600', color: 'text.primary', mb: 1 }} fontSize={12}>
                          {item?.snap_content}
                      </Typography>
                  </Box>
                </Link>               
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-end'] }} >
                  <Grid container direction="row" justifyContent="flex-end" spacing={6} >
                      <Grid item xs={1} mr={2}> 
                          <Icon icon={'uil:comment'} fontSize={18} />
                          <Typography ml="1.5rem" mt="-1.5rem" fontSize={14}>
                            {item.replies_count
                              ? `${item.replies_count.toString().charAt(0).toUpperCase() + item.replies_count.toString().slice(1)
                              }`
                              : ''}    
                          </Typography>    
                      </Grid>
                      <Grid item xs={1}> 
                        <Icon icon={'uil:share'} fontSize={18} />
                      </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
      )
    })
  } else {
    return null
  }
}

const ListThreadView = (props: Props) => {
  const { paramcomment } = props

  return (
    <Grid container  sx={{
      boxSizing: 'border-box',
      background: '#FFFFFF',
      border: '1px solid rgba(76, 78, 100, 0.12)',
      borderRadius: '10px',
      p: 2,
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'center',
      wrap: 'nowrap'
    }}>
      <Grid item xs={12} display={'flex'} alignContent={'flex-end'} justifyContent={'flex-end'}>
        <Button variant='contained' href='/thread/create'>
          Create Thread
        </Button>
      </Grid>
      <Grid container spacing={2} mt={3}>
        {renderList(paramcomment)}
      </Grid>
    </Grid>
  )
}

export default ListThreadView
