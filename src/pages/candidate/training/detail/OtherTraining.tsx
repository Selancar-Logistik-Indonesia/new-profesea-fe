import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box, Divider } from '@mui/material'
import Training from 'src/contract/models/training'
import Avatar from 'src/@core/components/mui/avatar'
import { formatIDR, getUserAvatar } from 'src/utils/helpers'
import Link from 'next/link'

const otherTraining = (arr: Training[]) => {
  if (arr && arr.length) {
    return arr.map(item => {
      return (
        <Grid item xs={12} sx={{ marginTop: '10px', marginBottom: '10px' }} key={item.id}>
          <Card sx={{ border: 0, boxShadow: 0.5, color: 'common.white', backgroundColor: '#FFFFFF' }}>
            <Grid item component={Link} href={`/candidate/training/detail/${item.id}`}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Grid
                    item
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 2
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
                      <Typography color='#32487A' fontWeight='bold' fontSize='16px'>
                        {item.title}
                      </Typography>
                      <Typography>{item.category.category}</Typography>
                      <Typography>{formatIDR(item.price)}</Typography>
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
                    <Typography sx={{ color: 'text.primary' }} fontSize={12}>
                      {item?.trainer?.username ?? '-'}
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

export default otherTraining
