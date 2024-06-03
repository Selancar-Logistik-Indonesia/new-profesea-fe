import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
// import { useTranslation } from 'react-i18next'

const CardList = (props: { title: string; img: string; description: string }) => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('md'))
  const { title, img, description } = props

  return (
    <Grid
      item
      xs={6}
      md={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: { xs: 'flex-start', md: 'center' }
      }}
    >
      <Typography align={'center'} fontSize={24} fontWeight={700} mb={2}>
        {title}
      </Typography>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row', md: 'column' },
          justifyContent: { xs: 'center', md: 'center' },
          alignItems: { xs: 'flex-start', md: 'center' }
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${img})`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: 'cover',
            width: { xs: '150px', md: '200px', lg: '250px' },
            aspectRatio: 1
          }}
        />
        <Typography
          fontSize={20}
          align={isXs ? 'left' : 'center'}
          sx={{ width: { xs: '100%', md: 200 }, mt: { xs: 2, md: 0 } }}
        >
          {description}
        </Typography>
      </Grid>
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

const sectionThree = () => {
  // const { t } = useTranslation()

  return (
    <Grid item container sx={{ position: 'relative', px: 10, py: 20 }}>
      <Typography sx={{ mb: 10, width: '100%' }} color={'black'} fontSize={32} fontWeight='700' align={'center'}>
        4 Tahap Mudah untuk Bergabung!
      </Typography>
      <Grid container spacing={4}>
        <CardList
          title='Langkah 1'
          img='/images/cards/company-step1.png'
          description='Daftar dan buat akun sebagai perusahaan di Profesea.id'
        />
        <CardList
          title='Langkah 2'
          img='/images/cards/company-step2.png'
          description='Buat lowongan dan dapatkan exsposure di Platform kami.'
        />
        <CardList
          title='Langkah 3'
          img='/images/cards/company-step3.png'
          description='Temukan kandidat terbaik dan dapatkan akses ke komunitas maritim dan logistik.'
        />
        <CardList
          title='Langkah 4'
          img='/images/cards/company-step4.png'
          description='Kelola data kandidat untuk proses seleksi selanjutnya.'
        />
      </Grid>
      <Background bottom={0} right={0} img='/images/backgrounds/company-background-dots.png' />
      <Background
        top={0}
        left={0}
        width='60%'
        height='60%'
        z={2}
        img='/images/backgrounds/company-gelombang-biru2.png'
      />
      <Background
        top={0}
        right={0}
        width='60%'
        height='60%'
        z={4}
        img='/images/backgrounds/company-gelombang-orange2.png'
      />
    </Grid>
  )
}

export default sectionThree
