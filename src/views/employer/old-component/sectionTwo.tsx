import React from 'react'
import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Slider from './slider'
import { useTranslation } from 'react-i18next'

const CardList = (props: { img: string; title: any; description: any; isXs: any }) => {
  const { img, title, description, isXs } = props

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
          width: '200px',
          aspectRatio: 1
        }}
      />
      <Typography align={'center'} sx={{ fontSize: 20, fontWeight: 700, my: 3 }}>
        {title}
      </Typography>
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

const SectionTwo = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('md'))

  const items = [
    {
      title: t('landing_company_info_title_1'),
      img: '/images/cards/company-info1.png',
      description: t('landing_company_info_description_1')
    },
    {
      title: t('landing_company_info_title_2'),
      img: '/images/cards/company-info2.png',
      description: t('landing_company_info_description_2')
    },
    {
      title: t('landing_company_info_title_3'),
      img: '/images/cards/company-info3.png',
      description: t('landing_company_info_description_3')
    },
    {
      title: t('landing_company_info_title_4'),
      img: '/images/cards/company-info4.png',
      description: t('landing_company_info_description_4')
    }
  ]

  return (
    <Grid
      item
      container
      justifyContent='center'
      alignItems='center'
      sx={{ position: 'relative', py: { xs: 10, md: 20 }, px: { md: 5 } }}
    >
      <Typography
        sx={{ mb: { xs: 5, md: 10 }, width: '100%' }}
        color={'black'}
        fontSize={32}
        fontWeight='700'
        align={'center'}
      >
        {t('landing_company_info_title')}
      </Typography>
      {isXs ? (
        <Slider items={items} />
      ) : (
        <Grid container justifyContent='center'>
          {items.map((item, index) => (
            <CardList key={index} title={item.title} img={item.img} description={item.description} isXs={isXs} />
          ))}
        </Grid>
      )}
      <Background
        bottom={0}
        left={0}
        backgroundPosition='0% 100%'
        width={{ xs: '200px', md: '300px' }}
        height={{ xs: '200px', md: '300px' }}
        zIndex={-3}
        img='/images/backgrounds/company-background-dots4.png'
      />
      <Background
        bottom={0}
        left={0}
        backgroundPosition='0% 100%'
        width={{ xs: '200px', md: '300px' }}
        height={{ xs: '200px', md: '300px' }}
        z={-1}
        img='/images/backgrounds/company-bg-orange-kiri.png'
      />
      <Background
        bottom={0}
        right={0}
        backgroundPosition='100% 100%'
        width={{ xs: '200px', md: '300px' }}
        height={{ xs: '200px', md: '300px' }}
        z={-1}
        img='/images/backgrounds/company-bg-orange-kanan.png'
      />
    </Grid>
  )
}

export default SectionTwo
