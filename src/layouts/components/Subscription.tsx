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
import UserSubscriptionDialog from 'src/views/apps/user/view/UserSubscriptionDialog'
import 'react-credit-cards/es/styles-compiled.css'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Link from 'next/link'
import { useAuth } from 'src/hooks/useAuth'
import { toTitleCase } from 'src/utils/helpers'
import moment from 'moment'

const Subscription = () => {
    const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false);
    const { abilities } = useAuth();

    const startTime = moment(abilities?.start_date);
    const endTime = moment(abilities?.end_date);
    const now = moment();
    const duration = moment.duration(endTime.diff(startTime));
    const duration2 = moment.duration(now.diff(startTime));

    const totalDays = duration.asDays();
    const currentDays = duration2.asDays();
    const percent = (currentDays / totalDays) * 100;

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
                    <CardHeader title={
                        <Typography variant='body2' style={{ fontSize: '18px', fontWeight: '600', color: '#32487A' }}>
                            Current Plan
                        </Typography>
                    } />
                    <CardContent>
                        <Grid container spacing={6}>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ mb: 4 }}>
                                    <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem' }}>
                                        Your Current Plan is <strong>{toTitleCase(`${abilities?.account_type} ${abilities?.plan_type}`)}</strong>
                                    </Typography>
                                    <Typography variant='body2'>A simple start for everyone</Typography>
                                </Box>
                                <Box sx={{ mb: 4 }}>
                                    <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem' }}>
                                        Active until <b>{moment(abilities?.end_date).format("MMMM Do YYYY, h:mm:ss")}</b>
                                    </Typography>
                                    <Typography variant='body2'>We will send you a notification upon Subscription expiration</Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={6} sx={{ mt: [4, 4, 0] }}>
                                {percent > 95 && (
                                    <Alert icon={false} severity='warning' sx={{ mb: 4 }}>
                                        <AlertTitle sx={{ fontWeight: 600, mb: theme => `${theme.spacing(1)} !important` }}>
                                            We need your attention!
                                        </AlertTitle>
                                        Your plan requires updates
                                    </Alert>
                                )}
                                <Box sx={{ display: 'flex', mb: 2, justifyContent: 'space-between' }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Days</Typography>
                                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{Math.floor(duration2.asDays())} of {duration.asDays()} Days</Typography>
                                </Box>
                                <LinearProgress value={percent} variant='determinate' sx={{ height: 10, borderRadius: '5px' }} />
                            </Grid>

                            <Grid item xs={12} sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                                <Button LinkComponent={Link} size='small' variant='contained' href='/pricing' sx={{ mr: 3, mb: [3, 0] }}>
                                    Upgrade Plan
                                </Button>
                                <Button variant='outlined' size='small' color='error' onClick={() => setSubscriptionDialogOpen(true)}>
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
