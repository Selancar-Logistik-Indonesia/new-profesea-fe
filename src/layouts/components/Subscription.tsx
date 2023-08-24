import { useState, ReactNode } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import CustomChip from 'src/@core/components/mui/chip'
import UserSubscriptionDialog from 'src/views/apps/user/view/UserSubscriptionDialog'
import 'react-credit-cards/es/styles-compiled.css'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Link from 'next/link'

const Subscription = () => {
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Current plan' />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 4 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem' }}>
                    Your Current Plan is <strong>Basic</strong>
                  </Typography>
                  <Typography variant='body2'>A simple start for everyone</Typography>
                </Box>
                <Box sx={{ mb: 4 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem' }}>
                    Active until Dec 09, 2021
                  </Typography>
                  <Typography variant='body2'>We will send you a notification upon Subscription expiration</Typography>
                </Box>
                <div>
                  <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>$99 Per Month</Typography>
                    <CustomChip
                      skin='light'
                      size='small'
                      label='Popular'
                      color='primary'
                      sx={{ height: 20, fontSize: '0.75rem', fontWeight: 600, borderRadius: '5px' }}
                    />
                  </Box>
                  <Typography variant='body2'>Standard plan for small to medium businesses</Typography>
                </div>
              </Grid>

              <Grid item xs={12} md={6} sx={{ mt: [4, 4, 0] }}>
                <Alert icon={false} severity='warning' sx={{ mb: 4 }}>
                  <AlertTitle sx={{ fontWeight: 600, mb: theme => `${theme.spacing(1)} !important` }}>
                    We need your attention!
                  </AlertTitle>
                  Your plan requires updates
                </Alert>
                <Box sx={{ display: 'flex', mb: 2, justifyContent: 'space-between' }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Days</Typography>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>26 of 30 Days</Typography>
                </Box>
                <LinearProgress value={86.6666666} variant='determinate' sx={{ height: 10, borderRadius: '5px' }} />
                <Typography variant='body2' sx={{ mt: 2, mb: 4 }}>
                  Your plan requires update
                </Typography>
              </Grid>

              <Grid item xs={12} sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <Button LinkComponent={Link} variant='contained' href='/pricing' sx={{ mr: 3, mb: [3, 0] }}>
                  Upgrade Plan
                </Button>
                <Button variant='outlined' color='error' onClick={() => setSubscriptionDialogOpen(true)}>
                  Cancel Subscription
                </Button>
              </Grid>
            </Grid>
          </CardContent>

          <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
        </Card>
      </Grid>
    </Grid>
  )
}

Subscription.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
Subscription.guestGuard = true

export default Subscription
