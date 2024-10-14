import { Box, Button, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const HeaderBannerView = () => {
  const { t } = useTranslation()

  return (
    <Grid
      container
      sx={{
        backgroundColor: '#E9F4FF',
        padding: { xs: '48px', md: '120px' },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        gap: '54px',
        flexWrap: 'nowrap',
        alignItems: 'center'
      }}
    >
      <Grid item sx={{ display: 'flex', flexDirection: 'column', width: { xs: '100%', md: '584px' } }}>
        <Typography sx={{ mb: '32px', color: 'black', fontSize: { xs: 32, md: 48 }, fontWeight: 800, width: '100%' }}>
          {t('landing_page.title')}
        </Typography>
        <Typography sx={{ mb: '32px', color: 'black', fontSize: 16, fontWeight: 400, width: '100%' }}>
          {t('landing_page.description')}
        </Typography>
        <Button
          component={Link}
          href='/register'
          variant='contained'
          size='large'
          sx={{
            width: 'fit-content',
            textTransform: 'none'
          }}
        >
          {t('landing_page.button')}
        </Button>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
      >
        <Box
          component='img'
          src='/images/landing-page-header.png'
          alt='what-is-profesea?'
          sx={{ width: { xs: '327px', md: '100%' } }}
        />
      </Grid>
    </Grid>
  )
}

export default HeaderBannerView
