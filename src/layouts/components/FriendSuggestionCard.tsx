import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Avatar, Button, CircularProgress, Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import { IUser } from 'src/contract/models/user'
import { toLinkCase, toTitleCase } from 'src/utils/helpers'
import ConnectButton from './ConnectButton'
import Link from 'next/link'
import { HttpClient } from 'src/services'
import { Icon } from '@iconify/react'

const renderList = (arr: IUser[]) => {
  if (!arr || arr.length == 0) {
    return (
      <Box textAlign={'center'}>
        <Typography color='text.secondary'>No suggestion for now</Typography>
      </Box>
    )
  }

  return arr.map((item, index) => {
    const userPhoto = item.photo ? item.photo : '/images/avatars/default-user.png'

    return (
      <>
        <Grid
          container
          key={index}
          sx={{
            display: 'flex',
            gap: '12px',
            flexDirection: 'row'
          }}
        >
          <Avatar src={userPhoto} alt='profile-picture' sx={{ width: 44, height: 44 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Link
                style={{ textDecoration: 'none' }}
                href={`/${item.role === 'Seafarer' ? 'profile' : 'company'}/${item.id}/${toLinkCase(item.username)}`}
                target='_blank'
              >
                <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>
                  {toTitleCase(item.username)}
                </Typography>
              </Link>
              <Typography sx={{ color: '#949EA2', fontSize: 14 }}>
                {item.employee_type != 'offship' ? item.role : 'Candidate'}
              </Typography>
            </Box>
            <ConnectButton user={item} />
          </Box>
        </Grid>
        {index !== arr.length - 1 && <Divider sx={{ my: '24px' }} />}
      </>
    )
  })
}

const FriendSuggestionCard = ({ location }: { location?: string }) => {
  const [listFriends, setListFriends] = useState<IUser[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchListFriends = async () => {
    setIsLoading(true)
    try {
      const resp = await HttpClient.get('/friendship/suggestion', {
        page: 1,
        take: location === 'profile' ? 3 : 9
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
    <Box
      sx={{
        borderRadius: location === 'profile' ? '16px' : '4px',
        backgroundColor: '#FFFFFF',
        boxShadow: location === 'profile' ? 3 : 0,
        overflow: 'hidden'
      }}
    >
      <Box sx={{ p: '24px' }}>
        <Typography
          sx={{
            mb: '24px',
            color: 'black',
            fontSize: location === 'profile' ? 20 : 14,
            fontWeight: 'bold',
            textTransform: 'capitalize'
          }}
        >
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
      {location === 'profile' && (
        <>
          <Divider sx={{ mx: '24px' }} />
          <Button
            endIcon={<Icon icon='mingcute:right-fill' style={{ fontSize: 18 }} />}
            href={`-`} //no link
            sx={{
              py: '18px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textTransform: 'none',
              color: 'primary.main',
              fontSize: 14,
              fontWeight: 'bold',
              borderRadius: '0 !important'
            }}
          >
            Show all
          </Button>
        </>
      )}
    </Box>
  )
}

export default FriendSuggestionCard
