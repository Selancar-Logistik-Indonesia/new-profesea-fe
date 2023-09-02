// ** MUI Imports 
import Grid from '@mui/material/Grid' 
// import Traffic from 'src/views/admin/dashboard/analytics/Traffic'
// import AnalyticsTotalRevenue from 'src/views/admin/dashboard/analytics/AnalyticsTotalRevenue'
// import CompanyGraph from 'src/views/admin/dashboard/analytics/CompanyGraph'
// import SubscriberGraph from 'src/views/admin/dashboard/analytics/SubscriberGraph'
// import CandidateGraph from 'src/views/admin/dashboard/analytics/CandidateGraph'
import TopPostCompany from 'src/views/admin/dashboard/analytics/TopPostCompany'
import TopCommunityContributor from 'src/views/admin/dashboard/analytics/TopCommunityContributor'
import TopTrainingAttendance from 'src/views/admin/dashboard/analytics/TopTrainingAttendance'
import CardStatOnship from 'src/views/admin/dashboard/CardStatOnship'
import CardStatOffship from 'src/views/admin/dashboard/CardStatOffship'
import CardStatByRole from 'src/views/admin/dashboard/CardStatUserByRole'

const Home = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12} sm={6} md={6}>
        <CardStatOnship></CardStatOnship>
        </Grid>
      <Grid item xs={12} sm={6} md={6}>
          <CardStatOffship ></CardStatOffship>
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
