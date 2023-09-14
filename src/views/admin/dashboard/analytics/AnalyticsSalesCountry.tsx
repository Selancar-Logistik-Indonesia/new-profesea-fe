// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
// import OptionsMenu from 'src/@core/components/option-menu'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { Box, CircularProgress, Typography } from '@mui/material'
import DashboardContext, { DashboardProvider } from 'src/context/DashboardContext'
import { useEffect } from 'react'
import { useDashboard } from 'src/hooks/useDashboard'

const AnalyticsSalesCountry = () => {
  return (
      <DashboardProvider>
          <AnalyticsSalesCountryApp />
      </DashboardProvider>
  )
}

const AnalyticsSalesCountryApp = () => {
  // ** Hook
  const theme = useTheme()
  const { chartSubscriptions, dataChartSubs } = useDashboard();
  // console.log(dataChartSubs?.series[0].data)
  
  useEffect(() => {
    chartSubscriptions({data_type:'by-qty'});
  }, []);

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        barHeight: '60%',
        horizontal: true,
        distributed: true,
        startingShape: 'rounded'
      }
    },
    dataLabels: {
      offsetY: 8,
      style: {
        fontWeight: 500,
        fontSize: '0.875rem'
      }
    },
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
      categories: (dataChartSubs) ? dataChartSubs?.categories : [],
      labels: {
        formatter: val => `${Number(val) / 1000}k`,
        style: {
          fontSize: '0.875rem',
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        align: theme.direction === 'rtl' ? 'right' : 'left',
        style: {
          fontWeight: 600,
          fontSize: '0.875rem',
          colors: theme.palette.text.secondary
        }
      }
    }
  }

  return (
    <DashboardContext.Consumer>
        {({ dataChartSubs, onLoading }) => {
          // console.log(dataChartSubs);
            if (onLoading) {
                  return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <CircularProgress sx={{ mt: 20 }} />
                    </Box>
                );
            }

            return (
              <Card sx={{ border: 0, boxShadow: 0}}>
                <CardHeader
                  title={
                    <Typography variant='body2' style={{ fontSize: '18px', fontWeight: '600', color: '#32487A' }}>
                      Subscription Country
                    </Typography>
                  }
                  subheader={`Total ${(dataChartSubs?.series)?
                                    dataChartSubs?.series[0].data.reduce((a :any , b :any) => a + b, 0) : 0 } 
                            Subscriptions`}
                  subheaderTypographyProps={{ sx: { lineHeight: 1.429 } }}
                  titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }}
                 
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
                  <ReactApexcharts type='bar' height={332} series={(dataChartSubs) ? dataChartSubs?.series : []} options={options} />
                </CardContent>
              </Card>
            )

          }}
          </DashboardContext.Consumer>
        
          );
    }


export default AnalyticsSalesCountry
