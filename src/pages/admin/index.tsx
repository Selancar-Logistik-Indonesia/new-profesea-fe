// ** MUI Imports 
import Grid from '@mui/material/Grid' 
import TopPostCompany from 'src/views/admin/dashboard/analytics/TopPostCompany'
import TopCommunityContributor from 'src/views/admin/dashboard/analytics/TopCommunityContributor'
import TopTrainingAttendance from 'src/views/admin/dashboard/analytics/TopTrainingAttendance'
import CardStatOnship from 'src/views/admin/dashboard/CardStatOnship'
import CardStatOffship from 'src/views/admin/dashboard/CardStatOffship'
import CardStatByRole from 'src/views/admin/dashboard/CardStatUserByRole'
import AnalyticsWeeklySales from 'src/views/admin/dashboard/analytics/AnalyticsWeeklySales'
import AnalyticsSalesCountry from '../../views/admin/dashboard/analytics/AnalyticsSalesCountry'

const Home = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12} sm={6} md={6}>
        <CardStatOnship></CardStatOnship>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
          <CardStatOffship ></CardStatOffship>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
          <AnalyticsSalesCountry></AnalyticsSalesCountry>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
          <AnalyticsWeeklySales ></AnalyticsWeeklySales>
      </Grid>
      {/* <Grid item xs={12} sm={6} md={4}>
        <Traffic />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <SubscriberGraph />
      </Grid> */}
      <CardStatByRole></CardStatByRole>
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
