// ** MUI Imports 
import Grid from '@mui/material/Grid' 

// ** Components Imports
// import AnalyticsWeeklySales from 'src/views/admin/dashboard/analytics/AnalyticsWeeklySales'
import CardStatisticsCharacter from 'src/@core/components/card-statistics/card-stats-with-image'
import Traffic from 'src/views/admin/dashboard/analytics/Traffic'
// import AnalyticsTotalRevenue from 'src/views/admin/dashboard/analytics/AnalyticsTotalRevenue'
// import CompanyGraph from 'src/views/admin/dashboard/analytics/CompanyGraph'
import SubscriberGraph from 'src/views/admin/dashboard/analytics/SubscriberGraph'
// import CandidateGraph from 'src/views/admin/dashboard/analytics/CandidateGraph'
import TopPostCompany from 'src/views/admin/dashboard/analytics/TopPostCompany'
import TopCommunityContributor from 'src/views/admin/dashboard/analytics/TopCommunityContributor'
import TopTrainingAttendance from 'src/views/admin/dashboard/analytics/TopTrainingAttendance'
import CardTotal from 'src/views/admin/dashboard/analytics/CardTotal'

const Home = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12} sm={6} md={6}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={6}>
            <CardStatisticsCharacter
              data={{
                stats: '8.14k',
                title: 'Candidate',
                chipColor: 'primary',
                trendNumber: '',
                chipText: 'On-Ship',
                src: '/images/cards/card-stats-img-1.png'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CardStatisticsCharacter
              data={{
                stats: '12.2k',
                title: 'Candidate',
                chipColor: 'primary',
                trendNumber: '',
                chipText: 'On-Ship',
                src: '/images/cards/card-stats-img-2.png'
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={6}>
            <CardStatisticsCharacter
              data={{
                stats: '8.14k',
                title: 'Candidate',
                chipColor: 'success',
                trendNumber: '',
                chipText: 'Off-Ship',
                src: '/images/cards/card-stats-img-1.png'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CardStatisticsCharacter
              data={{
                stats: '12.2k',
                title: 'Candidate',
                chipColor: 'success',
                trendNumber: '',
                chipText: 'Off-Ship',
                src: '/images/cards/card-stats-img-2.png'
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Traffic />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <SubscriberGraph />
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <CardTotal
          data={{
            stats: '8.14k',
            title: 'Candidate',
            src: '/images/sailor.png'
          }}
        />
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <CardTotal
          data={{
            stats: '8.14k',
            title: 'Total Company',
            src: '/images/company.png'
          }}
        />
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <CardTotal
          data={{
            stats: '8.14k',
            title: 'Total Trainer',
            src: '/images/traine.png'
          }}
        />
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
