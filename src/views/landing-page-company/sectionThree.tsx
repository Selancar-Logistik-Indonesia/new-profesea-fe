import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Carousel from './carousel'
// import { useTranslation } from 'react-i18next'

const items = [
  {
    img: '/images/cards/company-step1.png',
    description: 'Daftar dan buat akun sebagai perusahaan di Profesea.id'
  },
  {
    img: '/images/cards/company-step2.png',
    description: 'Buat lowongan dan dapatkan exsposure di Platform kami.'
  },
  {
    img: '/images/cards/company-step3.png',
    description: 'Temukan kandidat terbaik dan dapatkan akses ke komunitas maritim dan logistik.'
  },
  {
    img: '/images/cards/company-step4.png',
    description: 'Kelola data kandidat untuk proses seleksi selanjutnya.'
  }
]

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

const SectionThree = () => {
  // const { t } = useTranslation()
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Grid item container sx={{ position: 'relative', py: { xs: 10, md: 20 }, px: { md: 5 } }}>
      <Typography sx={{ mb: 10, width: '100%' }} color={'black'} fontSize={32} fontWeight='700' align={'center'}>
        4 Tahap Mudah untuk Bergabung!
      </Typography>
      {isXs ? (
        <Carousel items={items} timer={0} />
      ) : (
        <Grid container>
          {items.map((item, index) => (
            <CardList key={index} img={item.img} description={item.description} isXs={isXs} />
          ))}
        </Grid>
      )}
      {!isXs && (
        <>
          <Background bottom={0} right={0} z={-1} img='/images/backgrounds/company-background-dots.png' />
          <Background
            top={0}
            left={0}
            backgroundPosition='0% 0%'
            width='40%'
            height='50%'
            z={-1}
            img='/images/backgrounds/company-background-dots2.png'
          />
        </>
      )}
      <Background
        top={0}
        left={0}
        backgroundPosition='0% 0%'
        width='50%'
        height='50%'
        z={2}
        img='/images/backgrounds/company-bg-orange-kiri2.png'
      />
      <Background
        top={0}
        right={0}
        backgroundPosition='100% 0%'
        width='50%'
        height='50%'
        z={4}
        img='/images/backgrounds/company-bg-orange-kanan2.png'
      />
    </Grid>
  )
}

export default SectionThree
