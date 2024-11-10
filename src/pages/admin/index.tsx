// ** MUI Imports
import Grid from '@mui/material/Grid'
import TopPostCompany from 'src/views/admin/dashboard/analytics/TopPostCompany'
import TopCommunityContributor from 'src/views/admin/dashboard/analytics/TopCommunityContributor'
import TopTrainingAttendance from 'src/views/admin/dashboard/analytics/TopTrainingAttendance'
import CardUserStat from 'src/views/admin/dashboard/CardUserStat'
import CardActiveAds from 'src/views/admin/dashboard/CardActiveAds'

const Home = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid container spacing={6} item xs={12} sm={12} md={12}>
        <Grid item xs={12} sm={7} md={7}>
          <CardUserStat />
        </Grid>
        <Grid item xs={12} sm={5} md={5}>
          <CardActiveAds />
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <TopPostCompany />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TopCommunityContributor />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TopTrainingAttendance />
      </Grid>
    </Grid>
  )
}

export default Home
