// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Components Imports
import AnalyticsWeeklySales from 'src/views/admin/dashboard/analytics/AnalyticsWeeklySales'
import Traffic from 'src/views/admin/dashboard/analytics/Traffic'
import AnalyticsTotalRevenue from 'src/views/admin/dashboard/analytics/AnalyticsTotalRevenue'
import CompanyGraph from 'src/views/admin/dashboard/analytics/CompanyGraph'
import SubscriberGraph from 'src/views/admin/dashboard/analytics/SubscriberGraph'
import CandidateGraph from 'src/views/admin/dashboard/analytics/CandidateGraph'
import TopPostCompany from 'src/views/admin/dashboard/analytics/TopPostCompany'
import TopCommunityContributor from 'src/views/admin/dashboard/analytics/TopCommunityContributor'
import TopTrainingAttendance from 'src/views/admin/dashboard/analytics/TopTrainingAttendance'

const Home = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12} sm={6} md={4}>
        <CandidateGraph />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CompanyGraph />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Traffic />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <SubscriberGraph />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <AnalyticsTotalRevenue />
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
