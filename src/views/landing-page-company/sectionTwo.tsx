import React from 'react'
import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Carousel from './carousel'

const items = [
  {
    title: 'Talent Pool & Management',
    img: '/images/cards/company-info1.png',
    description: 'Temukan serta kelola sumber bakat terbaik secara real-time untuk kebutuhan perusahaan Anda.'
  },
  {
    title: 'Job Posting Pekerjaan',
    img: '/images/cards/company-info2.png',
    description: 'Posting langsung lowongan pekerjaan perusahaan Anda dan langsung dilihat kandidat secara real-time.'
  },
  {
    title: 'Forum Komunitas',
    img: '/images/cards/company-info3.png',
    description: 'Berdiskusi seputar isu-isu terkini di industri maritim dan logistik.'
  },
  {
    title: 'Media Sosial',
    img: '/images/cards/company-info4.png',
    description: 'Bangun jaringan dan promosikan perusahaan Anda di lingkungan yang berfokus  pada karier.'
  }
]

const CardList = (props: { img: string; title: string; description: string; isXs: any }) => {
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
          width: '175px',
          aspectRatio: 1
        }}
      />
      <Typography align={'center'} fontSize={20} fontWeight={700} my={3}>
        {title}
      </Typography>
      <Typography fontSize={16} align={isXs ? 'left' : 'center'} sx={{ px: 4 }}>
        {description}
      </Typography>
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
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Grid
      item
      container
      justifyContent='center'
      alignItems='center'
      sx={{ position: 'relative', py: { xs: 10, md: 20 }, px: { md: 5 } }}
    >
      <Typography sx={{ mb: 10, width: '100%' }} color={'black'} fontSize={32} fontWeight='700' align={'center'}>
        Mengapa Profesea?
      </Typography>
      {isXs ? (
        <Carousel items={items} timer={0} />
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
        backgroundPosition='4% 100%'
        width='50%'
        height='50%'
        z={2}
        img='/images/backgrounds/company-bg-orange-kiri.png'
      />
      <Background
        bottom={0}
        right={0}
        backgroundPosition='96% 100%'
        width='50%'
        height='50%'
        z={4}
        img='/images/backgrounds/company-bg-orange-kanan.png'
      />
    </Grid>
  )
}

export default SectionTwo
