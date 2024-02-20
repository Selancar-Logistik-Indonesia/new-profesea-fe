import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Avatar, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { IUser } from 'src/contract/models/user'
import { toTitleCase } from 'src/utils/helpers'
import ConnectButton from './ConnectButton'
import Link from 'next/link'
import { HttpClient } from 'src/services'

const renderList = (arr: IUser[]) => {
  if (!arr || arr.length == 0) {
    return (
      <Box textAlign={'center'}>
        <Typography color='text.secondary'>No suggestion for now</Typography>
      </Box>
    )
  }

  return arr.map(item => {
    const userPhoto = item.photo ? item.photo : '/images/avatars/default-user.png'

    return (
      <Box
        key={item.id}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          '&:not(:last-of-type)': { mb: 4 }
        }}
      >
        <Box>
          <Avatar src={userPhoto} alt='profile-picture' sx={{ width: 60, height: 60 }} />
        </Box>
        <Box sx={{ flexGrow: 1, ml: 3, display: 'flex', flexDirection: 'column' }}>
          <Link style={{ textDecoration: 'none' }} href={`/profile/${item.username}`}>
            <Typography sx={{ color: '#0a66c2', fontWeight: 'bold', mt: 1, fontSize: 12 }}>
              {toTitleCase(item.name)}
            </Typography>
          </Link>
          <Typography sx={{ color: 'text.primary', mt: 1, mb: 1, fontSize: 10 }}>
            {item.employee_type != 'offship' ? item.role : 'Candidate'}
          </Typography>
          <Box>
            <ConnectButton user={item} />
          </Box>
        </Box>
      </Box>
    )
  })
}

const FriendSuggestionCard = () => {
  const [listFriends, setListFriends] = useState<IUser[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchListFriends = async () => {
    setIsLoading(true)
    try {
      const resp = await HttpClient.get('/friendship/suggestion', {
        page: 1,
        take: 9
      })

      const { data } = resp.data as { data: IUser[] }
      setIsLoading(false)
      setListFriends(data)
    } catch (error) {
      setIsLoading(false)
      alert(error)
    }
  }

  useEffect(() => {
    fetchListFriends()
  }, [])

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
          <CardContent>
            <Box sx={{ mb: 7 }}>
              <Typography color={'#262525'} fontWeight='800' fontSize={'14px'} sx={{ mb: 4 }}>
                Add to your network
              </Typography>
              {isLoading ? (
                <Box textAlign={'center'} mt={10}>
                  <CircularProgress />
                </Box>
              ) : (
                renderList(listFriends)
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default FriendSuggestionCard
