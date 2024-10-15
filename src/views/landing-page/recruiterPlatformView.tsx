import { Icon } from '@iconify/react'
import { Box, Button, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const RecruiterPlatformView = () => {
  const { t } = useTranslation()

  return (
    <Grid
      container
      sx={{
        backgroundColor: '#2E50A2',
        borderRadius: { xs: 0, md: '20px' },
        overflow: 'hidden'
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundImage: 'url(/images/recruiter-platform-banner.png)',
          backgroundSize: 'cover',
          backgroundPosition: { xs: '0% 0%', md: '80% center' },
          width: '100%',
          height: { xs: '226px', md: '100%' }
        }}
      />
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: 'flex', flexDirection: 'column', padding: { xs: '24px', md: '54px 40px' } }}
      >
        <Typography
          sx={{ mb: { xs: '12px', md: '24px' }, color: 'white', fontSize: { xs: 16, md: 20 }, fontWeight: 400 }}
        >
          {t('landing_page.for_recruiter.title_1')}
        </Typography>
        <Typography
          sx={{ mb: '16px', color: 'white', fontSize: { xs: 32, md: 48 }, fontWeight: 700 }}
          dangerouslySetInnerHTML={{ __html: t('landing_page.for_recruiter.title_2') }}
        />
        <Typography
          sx={{ mb: { xs: '24px', md: '39px' }, color: 'white', fontSize: { xs: 18, md: 16 }, fontWeight: 400 }}
        >
          {t('landing_page.for_recruiter.description')}
        </Typography>
        <Grid container gap='20px' sx={{ mb: { xs: '24px', md: '39px' } }}>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <Box sx={{ flexShrink: 0, height: '24px' }}>
              <Icon icon='ph:note-pencil' color='#90C7E6' fontSize={24} />
            </Box>
            <Typography
              sx={{
                flexGrow: 1,
                color: 'white',
                fontSize: { xs: 18, md: 14 },
                fontWeight: 400,
                lineHeight: '24px'
              }}
              dangerouslySetInnerHTML={{ __html: t('landing_page.for_recruiter.benefit_1') }}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <Box sx={{ flexShrink: 0, height: '24px' }}>
              <Icon icon='ph:funnel-simple' color='#90C7E6' fontSize={24} />
            </Box>
            <Typography
              sx={{
                flexGrow: 1,
                color: 'white',
                fontSize: { xs: 18, md: 14 },
                fontWeight: 400,
                lineHeight: '24px'
              }}
              dangerouslySetInnerHTML={{ __html: t('landing_page.for_recruiter.benefit_2') }}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <Box sx={{ flexShrink: 0, height: '24px' }}>
              <Icon icon='ph:sparkle' color='#90C7E6' fontSize={24} />
            </Box>
            <Typography
              sx={{
                flexGrow: 1,
                color: 'white',
                fontSize: { xs: 18, md: 14 },
                fontWeight: 400,
                lineHeight: '24px'
              }}
              dangerouslySetInnerHTML={{ __html: t('landing_page.for_recruiter.benefit_3') }}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <Box sx={{ flexShrink: 0, height: '24px' }}>
              <Icon icon='ph:currency-circle-dollar' color='#90C7E6' fontSize={24} />
            </Box>
            <Typography
              sx={{
                flexGrow: 1,
                color: 'white',
                fontSize: { xs: 18, md: 14 },
                fontWeight: 400,
                lineHeight: '24px'
              }}
              dangerouslySetInnerHTML={{ __html: t('landing_page.for_recruiter.benefit_4') }}
            />
          </Grid>
        </Grid>
        <Button
          component={Link}
          href='/employer'
          variant='contained'
          size='large'
          sx={{
            width: 'fit-content',
            backgroundColor: '#FFF',
            color: '#1F57C3',
            textTransform: 'none',
            fontSize: { xs: 16, md: 14 },
            fontWeight: 400,
            '&:hover': { backgroundColor: '#f0f0f0' }
          }}
        >
          {t('landing_page.for_recruiter.button')}
        </Button>
      </Grid>
    </Grid>
  )
}

export default RecruiterPlatformView
