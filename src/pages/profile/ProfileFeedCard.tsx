import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

export default function ProfileFeedCard() {
  return (
    <Grid container marginTop={'10px'}>
      <Grid item xs={12}>
        <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
          <CardContent>
            <Box sx={{ mb: 7 }}>
              <Typography variant='body2' sx={{ mb: 4, color: '#262525', textTransform: 'uppercase', fontWeight: 600 }}>
                Activity
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
