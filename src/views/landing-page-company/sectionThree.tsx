import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Carousel from './carousel'
// import { useTranslation } from 'react-i18next'

const items = [
  {
    title: 'Langkah 1',
    img: '/images/cards/company-step1.png',
    description: 'Daftar dan buat akun sebagai perusahaan di Profesea.id'
  },
  {
    title: 'Langkah 2',
    img: '/images/cards/company-step2.png',
    description: 'Buat lowongan dan dapatkan exsposure di Platform kami.'
  },
  {
    title: 'Langkah 3',
    img: '/images/cards/company-step3.png',
    description: 'Temukan kandidat terbaik dan dapatkan akses ke komunitas maritim dan logistik.'
  },
  {
    title: 'Langkah 4',
    img: '/images/cards/company-step4.png',
    description: 'Kelola data kandidat untuk proses seleksi selanjutnya.'
  }
]

const CardList = (props: { title: string; img: string; description: string; isXs: any }) => {
  const { title, img, description, isXs } = props

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
          width: { md: '200px', lg: '225px' },
          aspectRatio: 1
        }}
      />
      <Typography align={'center'} fontSize={24} fontWeight={700} my={3}>
        {title}
      </Typography>
      <Typography fontSize={20} align={isXs ? 'left' : 'center'} sx={{ width: { md: 180, lg: 300 } }}>
        {description}
      </Typography>
    </Grid>
  )
}

const Background = (props: {
  img: string
  top?: number
  left?: number
  bottom?: number
  right?: number
  width?: string
  height?: string
  z?: number
}) => {
  const { top, left, bottom, right, width, height, z } = props
  const placement = {
    ...(top !== undefined && { top }),
    ...(left !== undefined && { left }),
    ...(bottom !== undefined && { bottom }),
    ...(right !== undefined && { right })
  }

  return (
    <Box
      sx={{
        zIndex: z ? z : 0,
        position: 'absolute',
        ...placement,
        width: width ? width : '100%',
        height: height ? height : '100%',
        backgroundImage: `url(${props.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat'
      }}
    />
  )
}

const SectionThree = () => {
  // const { t } = useTranslation()
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Grid item container sx={{ position: 'relative', px: 10, py: 20 }}>
      <Typography sx={{ mb: 10, width: '100%' }} color={'black'} fontSize={32} fontWeight='700' align={'center'}>
        4 Tahap Mudah untuk Bergabung!
      </Typography>
      {isXs ? (
        <Carousel items={items} timer={0} />
      ) : (
        <Grid container>
          {items.map((item, index) => (
            <CardList key={index} title={item.title} img={item.img} description={item.description} isXs={isXs} />
          ))}
        </Grid>
      )}
      <Background bottom={0} right={0} z={-1} img='/images/backgrounds/company-background-dots.png' />
      <Background
        top={0}
        left={0}
        width='30%'
        height='50%'
        z={-1}
        img='/images/backgrounds/company-background-dots2.png'
      />
      <Background
        top={0}
        left={0}
        width='60%'
        height='60%'
        z={2}
        img='/images/backgrounds/company-bg-orange-kiri2.png'
      />
      <Background
        top={0}
        right={0}
        width='60%'
        height='60%'
        z={4}
        img='/images/backgrounds/company-bg-orange-kanan2.png'
      />
    </Grid>
  )
}

export default SectionThree
