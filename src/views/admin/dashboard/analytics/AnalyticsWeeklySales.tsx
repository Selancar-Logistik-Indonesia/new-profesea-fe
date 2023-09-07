// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { Typography } from '@mui/material'

const series = [
  {
    name: 'Subscriptions',
    data: [3354000, 138500000, 123750000, 95670000]
  }
]

const AnalyticsSalesCountry = () => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        barHeight: '60%',
        distributed: true,
        startingShape: 'rounded'
      }
    },
    dataLabels: { enabled: false },
    grid: {
      strokeDashArray: 8,
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: false }
      },
      yaxis: {
        lines: { show: true }
      },
      padding: {
        top: -18,
        left: 21,
        right: 33,
        bottom: 10
      }
    },
    colors: [
      hexToRGBA(theme.palette.primary.light, 1),
      hexToRGBA(theme.palette.success.dark, 1),
      hexToRGBA(theme.palette.warning.dark, 1),
      hexToRGBA(theme.palette.info.light, 1),
      hexToRGBA(theme.palette.error.light, 1)
    ],
    legend: { show: false },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: ['BASIC', 'PRO', 'STAR', 'PPV'],
      labels: {        
        style: {
          fontWeight: 600,
          fontSize: '0.875rem',
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        align: theme.direction === 'rtl' ? 'right' : 'left',        
        formatter: val => `Rp. ${Number(val) / 1000}`,
        style: {
          fontSize: '0.875rem',
          colors: theme.palette.text.secondary
        }
      }
    }
  }

  return (
    <Card sx={{ border: 0, boxShadow: 0}}>
      <CardHeader
        title={
          <Typography variant='body2' style={{ fontSize: '18px', fontWeight: '600', color: '#32487A' }}>
            Subscription Weekly Sales
          </Typography>
        }
        subheader='Total Rp. 123445'
        subheaderTypographyProps={{ sx: { lineHeight: 1.429 } }}
        titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }}
        action={
          <OptionsMenu
            options={['Last 28 Days', 'Last Month', 'Last Year']}
            iconButtonProps={{ size: 'small', className: 'card-more-options' }}
          />
        }
      />
      <CardContent
        sx={{
          p: '0 !important',
          '& .apexcharts-canvas .apexcharts-yaxis-label': { fontSize: '0.875rem', fontWeight: 600 },
          '& .apexcharts-canvas .apexcharts-xaxis-label': { fontSize: '0.875rem', fill: theme.palette.text.disabled },
          '& .apexcharts-data-labels .apexcharts-datalabel': {
            fontWeight: 500,
            fontSize: '0.875rem',
            fill: theme.palette.common.white
          }
        }}
      >
        <ReactApexcharts type='bar' height={338} series={series} options={options} />
      </CardContent>
    </Card>
  )
}

export default AnalyticsSalesCountry
