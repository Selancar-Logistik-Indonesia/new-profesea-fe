import { Box, Grid, Typography } from '@mui/material'
import { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'

const benefitData = (t: TFunction) => [
  {
    img: '/images/our-benefit1.png',
    title: t('landing_page.our_benefit.benefit_title_1'),
    description: t('landing_page.our_benefit.benefit_1')
  },
  {
    img: '/images/our-benefit2.png',
    title: t('landing_page.our_benefit.benefit_title_2'),
    description: t('landing_page.our_benefit.benefit_2')
  },
  {
    img: '/images/our-benefit3.png',
    title: t('landing_page.our_benefit.benefit_title_3'),
    description: t('landing_page.our_benefit.benefit_3')
  },
  {
    img: '/images/our-benefit4.png',
    title: t('landing_page.our_benefit.benefit_title_4'),
    description: t('landing_page.our_benefit.benefit_4')
  },
  {
    img: '/images/our-benefit5.png',
    title: t('landing_page.our_benefit.benefit_title_5'),
    description: t('landing_page.our_benefit.benefit_5')
  }
]

const BenefitCard = ({ item }: { item: any }) => {
  return (
    <Grid
      item
      xs={12}
      md={4}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'row', md: 'column' },
        alignItems: 'center',
        gap: '12px',
        maxWidth: '379'
      }}
    >
      <Box component='img' src={item.img ?? '/images/no-image.jpg'} sx={{ width: '140px', aspectRatio: 1 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '8px', md: '16px' } }}>
        <Typography
          sx={{
            color: '#2D3436',
            fontSize: 18,
            fontWeight: 700,
            maxWidth: '379px',
            textAlign: { xs: 'left', md: 'center' }
          }}
        >
          {item.title}
        </Typography>
        <Typography
          sx={{
            color: '#868686',
            fontSize: 16,
            fontWeight: 400,
            maxWidth: '379px',
            textAlign: { xs: 'left', md: 'center' }
          }}
        >
          {item.description}
        </Typography>
      </Box>
    </Grid>
  )
}

const OurBenefitView = () => {
  const { t } = useTranslation()

  return (
    <Grid container sx={{ px: { xs: '24px', md: 0 }, display: 'flex', flexDirection: 'column', gap: '44px' }}>
      <Typography sx={{ color: '#2D3436', fontSize: { xs: 18, md: 32 }, fontWeight: 700 }} align='center'>
        {t('landing_page.our_benefit.title')}
      </Typography>
      <Grid item container sx={{ display: 'flex', justifyContent: 'center' }} spacing={8}>
        {benefitData(t).map((item, i) => (
          <BenefitCard key={i} item={item} />
        ))}
      </Grid>
    </Grid>
  )
}

export default OurBenefitView
