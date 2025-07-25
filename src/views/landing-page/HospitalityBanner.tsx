import { Box, Button, Grid, Link, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const HospitalityBanner = () => {
  const { t } = useTranslation()

  return (
    <Grid
      container
      spacing={8}
      sx={{
        flexDirection: { sm: 'colummn-reverse', md: '' },
        position: 'relative',
        borderRadius: '24px',
        padding: '48px',
        boxShadow: { xs: null, md: '1px 1px 1px 1px rgba(0, 0, 0, 0.06)' },
        backgroundColor: { xs: null, md: '#FFFFFF' },
        overflow: 'hidden',
        mt:{xs:6}
      }}
    >
      {/* Gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: '-50px',
          left: '-50px',
          width: '200px',
          height: '160px',
          background: '#4c7ae5',
          borderRadius: '50%',
          filter: 'blur(40px)',
          opacity: 0.6,
          transform: 'rotate(-45deg)',
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '-10px',
          left: '70px',
          width: '260px',
          height: '100px',
          background: '#f4a41f',
          borderRadius: '50%',
          filter: 'blur(35px)',
          opacity: 0.5,
          transform: 'rotate(-12deg)',
          zIndex: 1
        }}
      />

      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems:{xs:'center', md:'baseline'},
          gap: 4,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography
          sx={{ fontSize: 32, fontWeight: 700, color: '#404040', textAlign:{xs:'center', md:'start'} }}
          dangerouslySetInnerHTML={{ __html: t('hospitality_landing_page.title') }}
        />
        <Typography
          sx={{ fontSize: 20, fontWeight: 400, color: '#404040', width: {xs:'100%', md:'75%'}, textAlign:{xs:'center', md:'start'} }}
          dangerouslySetInnerHTML={{ __html: t('hospitality_landing_page.description') }}
        />
        <Button
          component={Link}
          href='/register?hospitality=true'
          variant='contained'
          size='medium'
          sx={{ textTransform: 'none', width: 'fit-content', fontSize: 16 }}
        >
          {t('hospitality_landing_page.button')}
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box component={'img'} src='/images/hospitality_banner.png' alt='hospitality banner' sx={{ width:{sm:'82%', md:'100%'} , objectFit:'contain', ml:{sm:0, md:10}  }} />
      </Grid>
    </Grid>
  )
}

export default HospitalityBanner
