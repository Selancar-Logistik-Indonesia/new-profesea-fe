import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box, CircularProgress, Divider } from '@mui/material'
import Training from 'src/contract/models/training'
import Avatar from 'src/@core/components/mui/avatar'
import { formatIDR, getUserAvatar } from 'src/utils/helpers'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { HttpClient } from 'src/services'

const renderList = (arr: Training[] | null) => {
  if (arr && arr.length) {
    const showList = arr.slice(0, 3)

    return showList.map(item => {
      return (
        <Grid item xs={12} sx={{ marginTop: '10px', marginBottom: '10px' }} key={item.id}>
          <Card sx={{ border: 0, boxShadow: 0.5, color: 'common.white', backgroundColor: '#FFFFFF' }}>
            <Grid item component={Link} href={`/trainings/detail/${item.id}`}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Grid
                    item
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 3
                    }}
                  >
                    <Box>
                      <img
                        alt='logo'
                        src={item?.thumbnail ? item?.thumbnail : '/images/icon-trainer.png'}
                        style={{
                          width: '100px',
                          height: '100px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography color='#32487A' fontWeight='bold' fontSize={16}>
                        {item.title}
                      </Typography>
                      <Typography fontSize={12}>{item.category.category}</Typography>
                      <Typography fontSize={12}>{formatIDR(item.price)}</Typography>
                    </Box>
                  </Grid>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 2
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'center' }} ml={2} mr={3}>
                    <Avatar src={getUserAvatar(item.trainer)} alt='profile-picture' sx={{ width: 25, height: 25 }} />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
                    <Typography sx={{ fontWeight: 'bold', color: '#0a66c2' }} fontSize={14}>
                      {item?.trainer?.name}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Grid>
          </Card>
        </Grid>
      )
    })
  } else {
    return null
  }
}

const OtherTraining = ({ user_id, id }: { user_id: number; id: number }) => {
  const [listTrainings, setTraining] = useState<Training[] | null>(null)
  const [onLoading, setOnLoading] = useState(false)
  const payload = { page: 1, take: 3, user_id, id }

  const fetchTrainings = async () => {
    try {
      setOnLoading(true)
      const resp = await HttpClient.get(`/public/data/training`, { ...payload })

      if (resp.status == 200) {
        const data = resp.data.trainings.data
        setTraining(data)
      }
    } catch (error) {
      console.error(error)
    }

    setOnLoading(false)
  }

  useEffect(() => {
    fetchTrainings()
  }, [])

  if (onLoading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress sx={{ my: 20 }} />
      </Box>
    )
  }

  return <Grid>{renderList(listTrainings)}</Grid>
}

export default OtherTraining
