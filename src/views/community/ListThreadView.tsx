import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Button, Link, Paper } from '@mui/material'
import { Icon } from '@iconify/react'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import Moment from 'moment'

export type ParamMain = {
  id: string
  name: string
  title: any
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
          <Grid item xs={4} key={index}>
            <Paper>
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
                    <Typography sx={{ fontWeight: 600, color: 'text.secondary', fontSize:12 }}>
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
                      <Typography variant='body1' sx={{ color: 'text.secondary' }} fontSize={11} fontWeight={600} marginLeft={'5px'} marginTop={'0.08rem'}>
                        <Link href={'/thread?id=' + item.id} style={{ textDecoration: 'none' }}>
                          Replies  {item.replies_count
                            ? `${item.replies_count.toString().charAt(0).toUpperCase() + item.replies_count.toString().slice(1)
                            }`
                            : ''}
                        </Link>

                      </Typography>
                    </Box>
                  </Grid>
                  <Grid container xs={3} justifyContent='flex-end' mt={2}>
                    <Typography sx={{ fontWeight: 600, color: 'text.secondary', fontSize:9 }}>
                      {/* {item.created_at ? `${item.created_at.toString().charAt(0).toUpperCase() + item.crregeated_at.toString().slice(1)}` : ''} */}
                      {Moment(item.created_at).format('DD/MM/YYYY HH:MM:SS')}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
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
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {renderList(paramcomment)}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ListThreadView
