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
        px: '30px',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: '22px'
      }}
    >
      <Typography
        sx={{
          color: '#FFFFFF',
          fontSize: 48,
          fontWeight: 700,
          lineHeight: 'normal',
          whiteSpace: 'pre-line'
        }}
      >
        {t('landing_lets_sail')}
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
          '&:hover': { backgroundColor: '#f0f0f0' }
        }}
      >
        {t('landing_join_now_1')}
      </Button>
    </Grid>
  )
}

export default SailOpportunity
