import { Button, Typography, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import landingPageStyle from 'src/@core/styles/landing-page/landing-page-letssail'
import Link from 'next/link'

const SailOpportunity = () => {
  const { t } = useTranslation()

  return (
    <Grid
      container
      sx={{
        ...landingPageStyle.bannerHero,
        p: { xs: '22px 24px', md: '0px 30px' },
        borderRadius: { xs: 0, md: '20px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'center', md: 'flex-start' },
        justifyContent: { xs: 'flex-end', md: 'center' },
        gap: '22px'
      }}
    >
      <Typography
        sx={{
          color: '#FFFFFF',
          fontSize: { xs: 18, md: 48 },
          fontWeight: 700,
          lineHeight: 'normal',
          width: { xs: '100%', md: '600px' }
        }}
      >
        {t('landing_page.lets_sail.title')}
      </Typography>
      <Button
        component={Link}
        href='/register'
        variant='contained'
        size='large'
        sx={{
          backgroundColor: '#FFF',
          color: '#1F57C3',
          textTransform: 'none',
          '&:hover': { backgroundColor: '#f0f0f0' },
          width: { xs: '100%', md: 'fit-content' }
        }}
      >
        {t('landing_page.lets_sail.button')}
      </Button>
    </Grid>
  )
}

export default SailOpportunity
