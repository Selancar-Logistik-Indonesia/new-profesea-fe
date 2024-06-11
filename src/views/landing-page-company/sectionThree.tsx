import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Slider from './slider'
import { useTranslation } from 'react-i18next'

const CardList = (props: { img: string; description: string; isXs: any }) => {
  const { img, description, isXs } = props

  return (
    <Grid
      item
      xs={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${img})`,
          backgroundRepeat: `no-repeat`,
          backgroundSize: 'cover',
          width: '175px',
          aspectRatio: 1,
          mb: 4
        }}
      />
      <Typography
        align={isXs ? 'left' : 'center'}
        sx={{ px: 4, fontSize: 16 }}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </Grid>
  )
}

const Background = (props: { img: string; [key: string]: any }) => {
  const { img, ...rest } = props

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: '100% 100%',
        backgroundRepeat: 'no-repeat',
        ...rest
      }}
    />
  )
}

const SectionThree = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('md'))

  const items = [
    {
      img: '/images/cards/company-step1.png',
      description: t('landing_company_step_description_1')
    },
    {
      img: '/images/cards/company-step2.png',
      description: t('landing_company_step_description_2')
    },
    {
      img: '/images/cards/company-step3.png',
      description: t('landing_company_step_description_3')
    },
    {
      img: '/images/cards/company-step4.png',
      description: t('landing_company_step_description_4')
    }
  ]

  return (
    <Grid item container sx={{ position: 'relative', py: { xs: 10, md: 20 }, px: { md: 5 } }}>
      <Typography
        sx={{ mb: { xs: 5, md: 10 }, width: '100%' }}
        color={'black'}
        fontSize={32}
        fontWeight='700'
        align={'center'}
      >
        {t('landing_company_step_title')}
      </Typography>
      {isXs ? (
        <Slider items={items} />
      ) : (
        <Grid container>
          {items.map((item, index) => (
            <CardList key={index} img={item.img} description={item.description} isXs={isXs} />
          ))}
        </Grid>
      )}
      <Background
        top={0}
        left={0}
        backgroundPosition='0% 0%'
        width={{ xs: '200px', md: '300px' }}
        height={{ xs: '200px', md: '300px' }}
        zIndex={-3}
        img='/images/backgrounds/company-background-dots.png'
      />
      <Background
        bottom={0}
        right={0}
        width={{ xs: '200px', md: '300px' }}
        height={{ xs: '200px', md: '300px' }}
        zIndex={-3}
        img='/images/backgrounds/company-background-dots3.png'
      />
      <Background
        top={0}
        left={0}
        backgroundPosition='0% 0%'
        width={{ xs: '200px', md: '300px' }}
        height={{ xs: '200px', md: '300px' }}
        zIndex={-1}
        img='/images/backgrounds/company-bg-orange-kiri2.png'
      />
      <Background
        top={0}
        right={0}
        backgroundPosition='100% 0%'
        width={{ xs: '200px', md: '300px' }}
        height={{ xs: '200px', md: '300px' }}
        zIndex={-1}
        img='/images/backgrounds/company-bg-orange-kanan2.png'
      />
    </Grid>
  )
}

export default SectionThree
